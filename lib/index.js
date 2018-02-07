(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'fetchum', 'lodash.assign'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('fetchum'), require('lodash.assign'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.fetchum, global.lodash);
    global.index = mod.exports;
  }
})(this, function (exports, _fetchum, _lodash) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.apiRequests = exports.requests = exports.apiRequest = exports.request = exports.generateCRUDReducer = exports.generatePagedReducer = exports.generatePagedCalls = exports.generateCRUDRequests = exports.generateRequest = undefined;

  var _fetchum2 = _interopRequireDefault(_fetchum);

  var _lodash2 = _interopRequireDefault(_lodash);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  /**
   * Fetchum Redux - Redux action wrapper for fetchum
   */

  var defaultNewRequest = 'NEW_FETCH_REQUEST';
  var defaultSuccessRequest = 'FETCH_REQUEST_SUCCESS';
  var defaultFailureRequest = 'FETCH_REQUEST_FAILURE';
  var fetchAllPre = 'FETCH_ALL_';
  var createPre = 'CREATE_';
  var fetchOnePre = 'FETCH_ONE_';
  var updatePre = 'UPDATE_';
  var deletePre = 'DELETE_';
  var pagePre = 'FETCH_PAGE_';

  var getActionType = function getActionType(type, name) {
    var before = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    return type.replace((before ? '_' : '') + 'FETCH' + (!before ? '_' : ''), '' + (before ? '_' : '') + name.toUpperCase() + (!before ? '_' : ''));
  };

  /**
   * Generate a api request
   * @param  {Object} options - {method, token, route, external, form, headers}
   *
   */
  var generateRequest = exports.generateRequest = function generateRequest(options) {
    var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'FETCH';
    var fetchumOveride = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _fetchum2.default;
    return function (params, body, headers, customToken, tokenType) {
      return function (dispatch) {
        return new Promise(function (accept, reject) {
          dispatch({
            payload: (0, _lodash2.default)({}, options, { params: params, body: body, customHeaders: headers, customToken: customToken, tokenType: tokenType }),
            type: getActionType(defaultNewRequest, name, true)
          });
          fetchumOveride.generateRequest(options)(params, body, headers, customToken, tokenType).then(function (res) {
            dispatch({
              payload: (0, _lodash2.default)({}, options, { res: res, params: params, body: body, customHeaders: headers, customToken: customToken, tokenType: tokenType }),
              type: getActionType(defaultSuccessRequest, name)
            });
            accept(res);
          }).catch(function (res) {
            dispatch({
              payload: (0, _lodash2.default)({}, options, { res: res, params: params, body: body, customHeaders: headers, customToken: customToken, tokenType: tokenType }),
              type: getActionType(defaultFailureRequest, name)
            });
            reject(res);
          });
        });
      };
    };
  };

  /**
   * Generate a crud api requests
   * @param  {Object} baseUrl
   * @param  {Object} idVar
   * @param  {Object} useToken
   *
   */
  var generateCRUDRequests = exports.generateCRUDRequests = function generateCRUDRequests() {
    var baseUrl = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var idVar = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'id';
    var token = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var name = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'FETCH';
    var fetchumOveride = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : _fetchum2.default;
    return {
      fetchAll: generateRequest({
        token: token,
        method: 'GET',
        route: baseUrl
      }, '' + fetchAllPre + name, fetchumOveride),
      create: generateRequest({
        token: token,
        method: 'POST',
        route: baseUrl
      }, '' + createPre + name, fetchumOveride),
      fetchOne: generateRequest({
        token: token,
        method: 'GET',
        route: baseUrl + '/:' + idVar
      }, '' + fetchOnePre + name, fetchumOveride),
      update: generateRequest({
        token: token,
        method: 'PUT',
        route: baseUrl + '/:' + idVar
      }, '' + updatePre + name, fetchumOveride),
      patch: generateRequest({
        token: token,
        method: 'PATCH',
        route: baseUrl + '/:' + idVar
      }, '' + updatePre + name, fetchumOveride),
      delete: generateRequest({
        token: token,
        method: 'DELETE',
        route: baseUrl + '/:' + idVar
      }, '' + deletePre + name, fetchumOveride)
    };
  };

  var generatePagedCalls = exports.generatePagedCalls = function generatePagedCalls() {
    var baseUrl = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var idVar = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'id';
    var token = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var name = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'FETCH';
    var storeName = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 'fetch';
    var fetchumOveride = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : _fetchum2.default;
    return {
      getPage: function getPage(page, params, body, headers, customToken, tokenType) {
        return function (dispatch) {
          var nextPage = page;
          if (nextPage === 0) {
            nextPage = 1;
          }
          return dispatch(generateRequest({
            token: token,
            method: 'GET',
            route: baseUrl
          }, '' + pagePre + name, fetchumOveride)(params, _extends({}, body, { page: nextPage }), headers, customToken, tokenType));
        };
      },
      reGetNextPage: function reGetNextPage(params, body, headers, customToken, tokenType) {
        return function (dispatch, getState) {
          var last = getState()[storeName].paged.last;

          var nextPage = last + 1;
          if (nextPage === 0) {
            nextPage = 1;
          }
          return dispatch(generateRequest({
            token: token,
            method: 'GET',
            route: baseUrl
          }, '' + pagePre + name, fetchumOveride)(params, _extends({}, body, { page: nextPage }), headers, customToken, tokenType));
        };
      },
      getNextPage: function getNextPage(params, body, headers, customToken, tokenType) {
        return function (dispatch, getState) {
          var _getState$storeName$p = getState()[storeName].paged,
              full = _getState$storeName$p.full,
              last = _getState$storeName$p.last;

          var nextPage = last + 1;
          if (nextPage === 0) {
            nextPage = 1;
          }
          if (!full) {
            return dispatch(generateRequest({
              token: token,
              method: 'GET',
              route: baseUrl
            }, '' + pagePre + name, fetchumOveride)(params, _extends({}, body, { page: nextPage }), headers, customToken, tokenType));
          }
          return new Promise(function (accept) {
            return accept('full');
          });
        };
      }
    };
  };

  var defaultPagedState = { loading: false, error: null, full: false, count: 0, current: 1, last: -1, value: {} };

  var generatePagedReducer = exports.generatePagedReducer = function generatePagedReducer(_ref) {
    var _ref$name = _ref.name,
        name = _ref$name === undefined ? 'fetch' : _ref$name,
        _ref$storeKey = _ref.storeKey,
        storeKey = _ref$storeKey === undefined ? 'paged' : _ref$storeKey,
        _ref$defaultState = _ref.defaultState,
        defaultState = _ref$defaultState === undefined ? {} : _ref$defaultState,
        _ref$modifyErrorPaylo = _ref.modifyErrorPayload,
        modifyErrorPayload = _ref$modifyErrorPaylo === undefined ? function (i) {
      return i;
    } : _ref$modifyErrorPaylo,
        _ref$modifyPagedPaylo = _ref.modifyPagedPayload,
        modifyPagedPayload = _ref$modifyPagedPaylo === undefined ? function (i) {
      return i;
    } : _ref$modifyPagedPaylo,
        _ref$extendReducer = _ref.extendReducer,
        extendReducer = _ref$extendReducer === undefined ? function (state) {
      return state;
    } : _ref$extendReducer;

    var _default = (0, _lodash2.default)(_defineProperty({}, storeKey, defaultPagedState), defaultState);
    return function () {
      var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _default;
      var _ref2 = arguments[1];
      var type = _ref2.type,
          payload = _ref2.payload;

      var withPre = function withPre(pre) {
        return '' + pre + name;
      };
      var cases = [getActionType(defaultNewRequest, withPre(pagePre), true), getActionType(defaultSuccessRequest, withPre(pagePre)), getActionType(defaultFailureRequest, withPre(pagePre))];
      switch (type) {
        case cases[0]:
          return _extends({}, state, _defineProperty({}, storeKey, _extends({}, state[storeKey], { loading: true, error: null })));
        case cases[1]:
          {
            var pages = (0, _lodash2.default)({}, state[storeKey].value);
            var data = modifyPagedPayload(payload.res.data);
            pages[data.page] = data.items;
            return _extends({}, state, _defineProperty({}, storeKey, _extends({}, state[storeKey], {
              loading: false,
              value: pages,
              full: data.full,
              count: data.count,
              last: data.page
            })));
          }
        case cases[2]:
          return _extends({}, state, _defineProperty({}, storeKey, _extends({}, state[storeKey], { loading: false, error: modifyErrorPayload(payload.res) })));
        default:
          var newState = _extends({}, state);
          if (!newState.hasOwnProperty(storeKey)) {
            newState[storeKey] = defaultPagedState;
          }
          if (typeof extendReducer !== 'undefined') {
            return extendReducer(newState, { type: type, payload: payload });
          }
          return newState;
      }
    };
  };

  var generateCRUDReducer = exports.generateCRUDReducer = function generateCRUDReducer(_ref3) {
    var _ref3$name = _ref3.name,
        name = _ref3$name === undefined ? 'fetch' : _ref3$name,
        _ref3$defaultState = _ref3.defaultState,
        defaultState = _ref3$defaultState === undefined ? {} : _ref3$defaultState,
        _ref3$pagedReducer = _ref3.pagedReducer,
        pagedReducer = _ref3$pagedReducer === undefined ? false : _ref3$pagedReducer,
        _ref3$modifyPayload = _ref3.modifyPayload,
        modifyPayload = _ref3$modifyPayload === undefined ? function (i) {
      return i;
    } : _ref3$modifyPayload,
        _ref3$modifyErrorPayl = _ref3.modifyErrorPayload,
        modifyErrorPayload = _ref3$modifyErrorPayl === undefined ? function (i) {
      return i;
    } : _ref3$modifyErrorPayl,
        _ref3$modifyPagedPayl = _ref3.modifyPagedPayload,
        modifyPagedPayload = _ref3$modifyPagedPayl === undefined ? function (i) {
      return i;
    } : _ref3$modifyPagedPayl,
        _ref3$extendReducer = _ref3.extendReducer,
        extendReducer = _ref3$extendReducer === undefined ? function (state) {
      return state;
    } : _ref3$extendReducer;

    var _default = (0, _lodash2.default)(pagedReducer ? { paged: defaultPagedState } : {}, {
      fetchAll: { loading: false, error: null, value: [] },
      create: { loading: false, error: null, value: {} },
      update: { loading: false, error: null, value: {} },
      delete: { loading: false, error: null, value: {} },
      fetchOne: { loading: false, error: null, value: {} }
    }, defaultState);
    return function () {
      var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _default;
      var _ref4 = arguments[1];
      var type = _ref4.type,
          payload = _ref4.payload;

      var withPre = function withPre(pre) {
        return '' + pre + name;
      };
      var cases = [getActionType(defaultNewRequest, withPre(fetchAllPre), true), getActionType(defaultSuccessRequest, withPre(fetchAllPre)), getActionType(defaultFailureRequest, withPre(fetchAllPre)), getActionType(defaultNewRequest, withPre(fetchOnePre), true), getActionType(defaultSuccessRequest, withPre(fetchOnePre)), getActionType(defaultFailureRequest, withPre(fetchOnePre)), getActionType(defaultNewRequest, withPre(createPre), true), getActionType(defaultSuccessRequest, withPre(createPre)), getActionType(defaultFailureRequest, withPre(createPre)), getActionType(defaultNewRequest, withPre(updatePre), true), getActionType(defaultSuccessRequest, withPre(updatePre)), getActionType(defaultFailureRequest, withPre(updatePre)), getActionType(defaultNewRequest, withPre(deletePre), true), getActionType(defaultSuccessRequest, withPre(deletePre)), getActionType(defaultFailureRequest, withPre(deletePre)), getActionType(defaultNewRequest, withPre(pagePre), true), getActionType(defaultSuccessRequest, withPre(pagePre)), getActionType(defaultFailureRequest, withPre(pagePre))];
      switch (type) {
        case cases[0]:
          return _extends({}, state, { fetchAll: _extends({}, state.fetchAll, { loading: true, error: null }) });
        case cases[1]:
          return _extends({}, state, {
            fetchAll: _extends({}, state.fetchAll, { loading: false, value: modifyPayload(payload.res.data) })
          });
        case cases[2]:
          return _extends({}, state, {
            fetchAll: _extends({}, state.fetchAll, { loading: false, error: modifyErrorPayload(payload.res) })
          });
        case cases[3]:
          return _extends({}, state, { fetchOne: _extends({}, state.fetchOne, { loading: true, error: null }) });
        case cases[4]:
          return _extends({}, state, {
            fetchOne: _extends({}, state.fetchOne, { loading: false, value: modifyPayload(payload.res.data) })
          });
        case cases[5]:
          return _extends({}, state, {
            fetchOne: _extends({}, state.fetchOne, { loading: false, error: modifyErrorPayload(payload.res) })
          });
        case cases[6]:
          return _extends({}, state, { create: _extends({}, state.create, { loading: true, error: null }) });
        case cases[7]:
          return _extends({}, state, {
            create: _extends({}, state.create, { loading: false, value: modifyPayload(payload.res.data) })
          });
        case cases[8]:
          return _extends({}, state, {
            create: _extends({}, state.create, { loading: false, error: modifyErrorPayload(payload.res) })
          });
        case cases[9]:
          return _extends({}, state, { update: _extends({}, state.update, { loading: true, error: null }) });
        case cases[10]:
          return _extends({}, state, {
            update: _extends({}, state.update, { loading: false, value: modifyPayload(payload.res.data) })
          });
        case cases[11]:
          return _extends({}, state, {
            update: _extends({}, state.update, { loading: false, error: modifyErrorPayload(payload.res) })
          });
        case cases[12]:
          return _extends({}, state, { delete: _extends({}, state.delete, { loading: true, error: null }) });
        case cases[13]:
          return _extends({}, state, {
            delete: _extends({}, state.delete, { loading: false, value: modifyPayload(payload.res.data) })
          });
        case cases[14]:
          return _extends({}, state, {
            delete: _extends({}, state.delete, { loading: false, error: modifyErrorPayload(payload.res) })
          });
        case cases[15]:
          if (!pagedReducer) {
            return state;
          }
          return _extends({}, state, { paged: _extends({}, state.paged, { loading: true, error: null }) });
        case cases[16]:
          {
            if (!pagedReducer) {
              return state;
            }
            var pages = (0, _lodash2.default)({}, state.paged.value);
            var data = modifyPagedPayload(payload.res.data);
            pages[data.page] = data.items;
            return _extends({}, state, {
              paged: _extends({}, state.paged, {
                loading: false,
                value: pages,
                full: data.full,
                count: data.count,
                last: data.page
              })
            });
          }
        case cases[17]:
          if (!pagedReducer) {
            return state;
          }
          return _extends({}, state, {
            paged: _extends({}, state.paged, { loading: false, error: modifyErrorPayload(payload.res) })
          });
        default:
          if (typeof extendReducer !== 'undefined') {
            return extendReducer(state, { type: type, payload: payload });
          }
          return state;
      }
    };
  };

  var request = exports.request = function request(isFormData, method, url, body, headers, others) {
    var name = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 'FETCH';
    var fetchumOveride = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : _fetchum2.default;
    return function (dispatch) {
      return new Promise(function (accept, reject) {
        dispatch({
          payload: { isFormData: isFormData, method: method, url: url, body: body, headers: headers, others: others },
          type: getActionType(defaultNewRequest, name, true)
        });
        fetchumOveride.request(isFormData, method, url, body, headers, others).then(function (res) {
          dispatch({
            payload: { isFormData: isFormData, method: method, url: url, body: body, headers: headers, others: others, res: res },
            type: getActionType(defaultSuccessRequest, name)
          });
          accept(res);
        }).catch(function (res) {
          dispatch({
            payload: { isFormData: isFormData, method: method, url: url, body: body, headers: headers, others: others, res: res },
            type: getActionType(defaultFailureRequest, name)
          });
          reject(res);
        });
      });
    };
  };

  var apiRequest = exports.apiRequest = function apiRequest(isFormData, method, route, body, headers, others) {
    var name = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 'FETCH';
    var fetchumOveride = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : _fetchum2.default;
    return function (dispatch) {
      return new Promise(function (accept, reject) {
        dispatch({
          payload: { isFormData: isFormData, method: method, route: route, body: body, headers: headers, others: others },
          type: getActionType(defaultNewRequest, name, true)
        });
        fetchumOveride.apiRequest(isFormData, method, route, body, headers, others).then(function (res) {
          dispatch({
            payload: { isFormData: isFormData, method: method, route: route, body: body, headers: headers, others: others, res: res },
            type: getActionType(defaultSuccessRequest, name)
          });
          accept(res);
        }).catch(function (res) {
          dispatch({
            payload: { isFormData: isFormData, method: method, route: route, body: body, headers: headers, others: others, res: res },
            type: getActionType(defaultFailureRequest, name)
          });
          reject(res);
        });
      });
    };
  };

  var buildReqs = function buildReqs(reqMethod) {
    return ['get', 'put', 'post', 'patch', 'delete', 'postForm', 'putForm'].reduce(function (methods, method) {
      methods[method] = reqMethod.bind(null, method.indexOf('Form') > -1, method); // eslint-disable-line
      return methods;
    }, {});
  };

  var requests = exports.requests = buildReqs(request);
  var apiRequests = exports.apiRequests = buildReqs(apiRequest);
});