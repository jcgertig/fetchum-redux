import fetchum from 'fetchum';
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
export const generateRequest = (options, name = 'FETCH', fetchumOveride = fetchum) => (params, body, headers, customToken, tokenType) => dispatch => new Promise((accept, reject) => {
  dispatch({
    payload: assign({}, options, { params, body, customHeaders: headers, customToken, tokenType }),
    type: getActionType(defaultNewRequest, name, true),
  });
  fetchumOveride.generateRequest(options)(params, body, headers, customToken, tokenType)
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
export const generateCRUDRequests = (baseUrl = '', idVar = 'id', token = false, name = 'FETCH', fetchumOveride = fetchum) => (
  {
    fetchAll: generateRequest({
      token,
      method: 'GET',
      route: baseUrl,
    }, `${fetchAllPre}${name}`, fetchumOveride),
    create: generateRequest({
      token,
      method: 'POST',
      route: baseUrl,
    }, `${createPre}${name}`, fetchumOveride),
    fetchOne: generateRequest({
      token,
      method: 'GET',
      route: `${baseUrl}/:${idVar}`,
    }, `${fetchOnePre}${name}`, fetchumOveride),
    update: generateRequest({
      token,
      method: 'PUT',
      route: `${baseUrl}/:${idVar}`,
    }, `${updatePre}${name}`, fetchumOveride),
    patch: generateRequest({
      token,
      method: 'PATCH',
      route: `${baseUrl}/:${idVar}`,
    }, `${updatePre}${name}`, fetchumOveride),
    delete: generateRequest({
      token,
      method: 'DELETE',
      route: `${baseUrl}/:${idVar}`,
    }, `${deletePre}${name}`, fetchumOveride),
  }
);

export const generatePagedCalls = (baseUrl = '', idVar = 'id', token = false, name = 'FETCH', storeName = 'fetch', fetchumOveride = fetchum) => (
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
          fetchumOveride,
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
          fetchumOveride,
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
            fetchumOveride,
          )(params, { ...body, page: nextPage }, headers, customToken, tokenType));
      }
      return new Promise(accept => accept('full'));
    },
  }
);

export const generatePagedReducer = ({
  name = 'fetch',
  defaultState = {},
  modifyErrorPayload = i => i,
  modifyPagedPayload = i => i,
  extendReducer = (state) => state,
}) => {
  const _default = assign({
    paged: { loading: false, error: null, full: false, count: 0, current: 1, last: -1, value: {} },
  }, defaultState);
  return (state = _default, { type, payload }) => {
    const withPre = pre => `${pre}${name}`;
    const cases = [
      getActionType(defaultNewRequest, withPre(pagePre), true),
      getActionType(defaultSuccessRequest, withPre(pagePre)),
      getActionType(defaultFailureRequest, withPre(pagePre)),
    ];
    switch (type) {
      case cases[0]:
        return { ...state, paged: { ...state.paged, loading: true, error: null } };
      case cases[1]: {
        const pages = assign({}, state.paged.value);
        const data = modifyPagedPayload(payload.res.data);
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
      case cases[2]:
        return {
          ...state,
          paged: { ...state.paged, loading: false, error: modifyErrorPayload(payload.res) },
        };
      default:
        if (typeof extendReducer !== 'undefined') {
          return extendReducer(state, { type, payload });
        }
        return state;
    }
  };
};

export const generateCRUDReducer = ({
  name = 'fetch',
  defaultState = {},
  pagedReducer = false,
  modifyPayload = i => i,
  modifyErrorPayload = i => i,
  modifyPagedPayload = i => i,
  extendReducer = (state) => state,
}) => {
  const _default = assign(pagedReducer ? {
    paged: { loading: false, error: null, full: false, count: 0, current: 1, last: -1, value: {} },
  } : {},
  {
    fetchAll: { loading: false, error: null, value: [] },
    create: { loading: false, error: null, value: {} },
    update: { loading: false, error: null, value: {} },
    delete: { loading: false, error: null, value: {} },
    fetchOne: { loading: false, error: null, value: {} },
  }, defaultState);
  return (state = _default, { type, payload }) => {
    const withPre = pre => `${pre}${name}`;
    const cases = [
      getActionType(defaultNewRequest, withPre(fetchAllPre), true),
      getActionType(defaultSuccessRequest, withPre(fetchAllPre)),
      getActionType(defaultFailureRequest, withPre(fetchAllPre)),
      getActionType(defaultNewRequest, withPre(fetchOnePre), true),
      getActionType(defaultSuccessRequest, withPre(fetchOnePre)),
      getActionType(defaultFailureRequest, withPre(fetchOnePre)),
      getActionType(defaultNewRequest, withPre(createPre), true),
      getActionType(defaultSuccessRequest, withPre(createPre)),
      getActionType(defaultFailureRequest, withPre(createPre)),
      getActionType(defaultNewRequest, withPre(updatePre), true),
      getActionType(defaultSuccessRequest, withPre(updatePre)),
      getActionType(defaultFailureRequest, withPre(updatePre)),
      getActionType(defaultNewRequest, withPre(deletePre), true),
      getActionType(defaultSuccessRequest, withPre(deletePre)),
      getActionType(defaultFailureRequest, withPre(deletePre)),
      getActionType(defaultNewRequest, withPre(pagePre), true),
      getActionType(defaultSuccessRequest, withPre(pagePre)),
      getActionType(defaultFailureRequest, withPre(pagePre)),
    ];
    switch (type) {
      case cases[0]:
        return { ...state, fetchAll: { ...state.fetchAll, loading: true, error: null } };
      case cases[1]:
        return {
          ...state,
          fetchAll: { ...state.fetchAll, loading: false, value: modifyPayload(payload.res.data) },
        };
      case cases[2]:
        return {
          ...state,
          fetchAll: { ...state.fetchAll, loading: false, error: modifyErrorPayload(payload.res) },
        };
      case cases[3]:
        return { ...state, fetchOne: { ...state.fetchOne, loading: true, error: null } };
      case cases[4]:
        return {
          ...state,
          fetchOne: { ...state.fetchOne, loading: false, value: modifyPayload(payload.res.data) },
        };
      case cases[5]:
        return {
          ...state,
          fetchOne: { ...state.fetchOne, loading: false, error: modifyErrorPayload(payload.res) },
        };
      case cases[6]:
        return { ...state, create: { ...state.create, loading: true, error: null } };
      case cases[7]:
        return {
          ...state,
          create: { ...state.create, loading: false, value: modifyPayload(payload.res.data) },
        };
      case cases[8]:
        return {
          ...state,
          create: { ...state.create, loading: false, error: modifyErrorPayload(payload.res) },
        };
      case cases[9]:
        return { ...state, update: { ...state.update, loading: true, error: null } };
      case cases[10]:
        return {
          ...state,
          update: { ...state.update, loading: false, value: modifyPayload(payload.res.data) },
        };
      case cases[11]:
        return {
          ...state,
          update: { ...state.update, loading: false, error: modifyErrorPayload(payload.res) },
        };
      case cases[12]:
        return { ...state, delete: { ...state.delete, loading: true, error: null } };
      case cases[13]:
        return {
          ...state,
          delete: { ...state.delete, loading: false, value: modifyPayload(payload.res.data) },
        };
      case cases[14]:
        return {
          ...state,
          delete: { ...state.delete, loading: false, error: modifyErrorPayload(payload.res) },
        };
      case cases[15]:
        if (!pagedReducer) { return state; }
        return { ...state, paged: { ...state.paged, loading: true, error: null } };
      case cases[16]: {
        if (!pagedReducer) { return state; }
        const pages = assign({}, state.paged.value);
        const data = modifyPagedPayload(payload.res.data);
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
      case cases[17]:
        if (!pagedReducer) { return state; }
        return {
          ...state,
          paged: { ...state.paged, loading: false, error: modifyErrorPayload(payload.res) },
        };
      default:
        if (typeof extendReducer !== 'undefined') {
          return extendReducer(state, { type, payload });
        }
        return state;
    }
  };
};


export const request = (isFormData, method, url, body, headers, others, name = 'FETCH', fetchumOveride = fetchum) => dispatch => new Promise((accept, reject) => {
  dispatch({
    payload: { isFormData, method, url, body, headers, others },
    type: getActionType(defaultNewRequest, name, true),
  });
  fetchumOveride.request(isFormData, method, url, body, headers, others)
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

export const apiRequest = (isFormData, method, route, body, headers, others, name = 'FETCH', fetchumOveride = fetchum) => dispatch => new Promise((accept, reject) => {
  dispatch({
    payload: { isFormData, method, route, body, headers, others },
    type: getActionType(defaultNewRequest, name, true),
  });
  fetchumOveride.apiRequest(isFormData, method, route, body, headers, others)
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

const buildReqs = reqMethod => ['get', 'put', 'post', 'patch', 'delete', 'postForm', 'putForm'].reduce(
    (methods, method) => {
      methods[method] = reqMethod.bind(null, method.indexOf('Form') > -1, method); // eslint-disable-line
      return methods;
    },
    {},
  );

export const requests = buildReqs(request);
export const apiRequests = buildReqs(apiRequest);
