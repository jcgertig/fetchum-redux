import { generateRequest as genFetchum, request as reqFetchum, apiRequest as apiFetchum } from 'fetchum';
import assign from 'lodash.assign';

/**
 * Fetchum Redux - Redux action wrapper for fetchum
 */

const defaultNewRequest = 'NEW_FETCH_REQUEST';
const defaultSuccessRequest = 'FETCH_REQUEST_SUCCESS';
const defaultFailureRequest = 'FETCH_REQUEST_FAILURE';
const fetchAllPre = 'FETCH_ALL_';
const createPre = 'CREATE_';
const fetchOnePre = 'FETCH_ONE_';
const updatePre = 'UPDATE_';
const deletePre = 'DELETE_';
const pagePre = 'FETCH_PAGE_';

const getActionType = (type, name, before = false) => type.replace(`${before ? '_' : ''}FETCH${!before ? '_' : ''}`, `${before ? '_' : ''}${name.toUpperCase()}${!before ? '_' : ''}`);

/**
 * Generate a api request
 * @param  {Object} options - {method, token, route, external, form, headers}
 *
 */
const generateRequest = (options, name = 'FETCH') => (params, body, headers, customToken, tokenType) => dispatch => new Promise((accept, reject) => {
  dispatch({
    payload: assign({}, options, { params, body, customHeaders: headers, customToken, tokenType }),
    type: getActionType(defaultNewRequest, name, true),
  });
  genFetchum(options)(params, body, headers, customToken, tokenType)
  .then((res) => {
    dispatch({
      payload: assign(
        {},
        options,
        { res, params, body, customHeaders: headers, customToken, tokenType },
      ),
      type: getActionType(defaultSuccessRequest, name),
    });
    accept(res);
  })
  .catch((res) => {
    dispatch({
      payload: assign(
        {},
        options,
        { res, params, body, customHeaders: headers, customToken, tokenType },
      ),
      type: getActionType(defaultFailureRequest, name),
    });
    reject(res);
  });
});

/**
 * Generate a crud api requests
 * @param  {Object} baseUrl
 * @param  {Object} idVar
 * @param  {Object} useToken
 *
 */
const generateCRUDRequests = (baseUrl = '', idVar = 'id', token = false, name = 'FETCH') => (
  {
    fetchAll: generateRequest({
      token,
      method: 'GET',
      route: baseUrl,
    }, `${fetchAllPre}${name}`),
    create: generateRequest({
      token,
      method: 'POST',
      route: baseUrl,
    }, `${createPre}${name}`),
    fetchOne: generateRequest({
      token,
      method: 'GET',
      route: `${baseUrl}/:${idVar}`,
    }, `${fetchOnePre}${name}`),
    update: generateRequest({
      token,
      method: 'PUT',
      route: `${baseUrl}/:${idVar}`,
    }, `${updatePre}${name}`),
    delete: generateRequest({
      token,
      method: 'DELETE',
      route: `${baseUrl}/:${idVar}`,
    }, `${deletePre}${name}`),
  }
);

const generatePagedCalls = (baseUrl = '', idVar = 'id', token = false, name = 'FETCH', storeName = 'fetch') => (
  {
    getPage: (page, params, body, headers, customToken, tokenType) => (dispatch) => {
      let nextPage = page;
      if (nextPage === 0) { nextPage = 1; }
      return dispatch(generateRequest(
        {
          token,
          method: 'GET',
          route: baseUrl,
        },
          `${pagePre}${name}`,
        )(params, { ...body, page: nextPage }, headers, customToken, tokenType));
    },
    reGetNextPage: (params, body, headers, customToken, tokenType) => (dispatch, getState) => {
      const { last } = getState()[storeName].paged;
      let nextPage = last + 1;
      if (nextPage === 0) { nextPage = 1; }
      return dispatch(generateRequest(
        {
          token,
          method: 'GET',
          route: baseUrl,
        },
          `${pagePre}${name}`,
        )(params, { ...body, page: nextPage }, headers, customToken, tokenType));
    },
    getNextPage: (params, body, headers, customToken, tokenType) => (dispatch, getState) => {
      const { full, last } = getState()[storeName].paged;
      let nextPage = last + 1;
      if (nextPage === 0) { nextPage = 1; }
      if (!full) {
        return dispatch(generateRequest(
          {
            token,
            method: 'GET',
            route: baseUrl,
          },
            `${pagePre}${name}`,
          )(params, { ...body, page: nextPage }, headers, customToken, tokenType));
      }
      return new Promise(accept => accept('full'));
    },
  }
);

const generateCRUDReducer = ({
  name = 'fetch',
  defaultState = {},
  modifyPayload = i => i,
  modifyErrorPayload = i => i,
  modifyPagedPayload = i => i,
}) => {
  const _default = assign({
    paged: { loading: false, error: null, full: false, count: 0, current: 1, last: -1, value: {} },
    fetchAll: { loading: false, error: null, value: [] },
    create: { loading: false, error: null, value: {} },
    update: { loading: false, error: null, value: {} },
    delete: { loading: false, error: null, value: {} },
    fetchOne: { loading: false, error: null, value: {} },
  }, defaultState);
  return (state = _default, { type, payload }) => {
    const withPre = pre => `${pre}${name}`;
    switch (type) {
      case getActionType(defaultNewRequest, withPre(fetchAllPre), true):
        return { ...state, fetchAll: { ...state.fetchAll, loading: true, error: null } };
      case getActionType(defaultSuccessRequest, withPre(fetchAllPre)):
        return {
          ...state,
          fetchAll: { ...state.fetchAll, loading: false, value: modifyPayload(payload.data) },
        };
      case getActionType(defaultFailureRequest, withPre(fetchAllPre)):
        return {
          ...state,
          fetchAll: { ...state.fetchAll, loading: false, error: modifyErrorPayload(payload) },
        };
      case getActionType(defaultNewRequest, withPre(fetchOnePre), true):
        return { ...state, fetchOne: { ...state.fetchOne, loading: true, error: null } };
      case getActionType(defaultSuccessRequest, withPre(fetchOnePre)):
        return {
          ...state,
          fetchOne: { ...state.fetchOne, loading: false, value: modifyPayload(payload.data) },
        };
      case getActionType(defaultFailureRequest, withPre(fetchOnePre)):
        return {
          ...state,
          fetchOne: { ...state.fetchOne, loading: false, error: modifyErrorPayload(payload) },
        };
      case getActionType(defaultNewRequest, withPre(createPre), true):
        return { ...state, create: { ...state.create, loading: true, error: null } };
      case getActionType(defaultSuccessRequest, withPre(createPre)):
        return {
          ...state,
          create: { ...state.create, loading: false, value: modifyPayload(payload.data) },
        };
      case getActionType(defaultFailureRequest, withPre(createPre)):
        return {
          ...state,
          create: { ...state.create, loading: false, error: modifyErrorPayload(payload) },
        };
      case getActionType(defaultNewRequest, withPre(updatePre), true):
        return { ...state, update: { ...state.update, loading: true, error: null } };
      case getActionType(defaultSuccessRequest, withPre(updatePre)):
        return {
          ...state,
          update: { ...state.update, loading: false, value: modifyPayload(payload.data) },
        };
      case getActionType(defaultFailureRequest, withPre(updatePre)):
        return {
          ...state,
          update: { ...state.update, loading: false, error: modifyErrorPayload(payload) },
        };
      case getActionType(defaultNewRequest, withPre(deletePre), true):
        return { ...state, delete: { ...state.delete, loading: true, error: null } };
      case getActionType(defaultSuccessRequest, withPre(deletePre)):
        return {
          ...state,
          delete: { ...state.delete, loading: false, value: modifyPayload(payload.data) },
        };
      case getActionType(defaultFailureRequest, withPre(deletePre)):
        return {
          ...state,
          delete: { ...state.delete, loading: false, error: modifyErrorPayload(payload) },
        };
      case getActionType(defaultNewRequest, withPre(pagePre), true):
        return { ...state, paged: { ...state.paged, loading: true, error: null } };
      case getActionType(defaultSuccessRequest, withPre(pagePre)): {
        const pages = assign({}, state.paged.value);
        const data = modifyPagedPayload(payload.data);
        pages[data.page] = data.items;
        return {
          ...state,
          paged: {
            ...state.paged,
            loading: false,
            value: pages,
            full: data.full,
            count: data.count,
            last: data.page,
          },
        };
      }
      case getActionType(defaultFailureRequest, withPre(pagePre)):
        return {
          ...state,
          paged: { ...state.paged, loading: false, error: modifyErrorPayload(payload) },
        };
      default:
        return state;
    }
  };
};


const request = (isFormData, method, url, body, headers, others, name = 'FETCH') => dispatch => new Promise((accept, reject) => {
  dispatch({
    payload: { isFormData, method, url, body, headers, others },
    type: getActionType(defaultNewRequest, name, true),
  });
  reqFetchum(isFormData, method, url, body, headers, others)
  .then((res) => {
    dispatch({
      payload: { isFormData, method, url, body, headers, others, res },
      type: getActionType(defaultSuccessRequest, name),
    });
    accept(res);
  })
  .catch((res) => {
    dispatch({
      payload: { isFormData, method, url, body, headers, others, res },
      type: getActionType(defaultFailureRequest, name),
    });
    reject(res);
  });
});

const apiRequest = (isFormData, method, route, body, headers, others, name = 'FETCH') => dispatch => new Promise((accept, reject) => {
  dispatch({
    payload: { isFormData, method, route, body, headers, others },
    type: getActionType(defaultNewRequest, name, true),
  });
  apiFetchum(isFormData, method, route, body, headers, others)
  .then((res) => {
    dispatch({
      payload: { isFormData, method, route, body, headers, others, res },
      type: getActionType(defaultSuccessRequest, name),
    });
    accept(res);
  })
  .catch((res) => {
    dispatch({
      payload: { isFormData, method, route, body, headers, others, res },
      type: getActionType(defaultFailureRequest, name),
    });
    reject(res);
  });
});

const methods = {
  generateRequest,
  generateCRUDRequests,
  generatePagedCalls,
  generateCRUDReducer,
  request,
  apiRequest,
};

const buildReqs = (reqMethod, mid = '', form = false) => {
  ['get', 'put', 'post', 'patch', 'delete'].forEach((method) => {
    methods[`${method}${mid}Request`] = reqMethod.bind(null, form, method);
  });
};

buildReqs(request);
buildReqs(request, 'Form', true);
buildReqs(apiRequest, 'Api');
buildReqs(apiRequest, 'ApiForm', true);

export default methods;
