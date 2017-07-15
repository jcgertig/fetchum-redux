import { generateRequest as genFetchum, request as reqFetchum, apiRequest as apiFetchum } from 'fetchum';
import assign from 'lodash.assign';

/**
 * Fetchum Redux - Redux action wrapper for fetchum
 */
require('es6-promise').polyfill();

var defaultNewRequest = 'NEW_FETCH_REQUEST';
var defaultSuccessRequest = 'FETCH_REQUEST_SUCCESS';
var defaultFailureRequest = 'FETCH_REQUEST_FAILURE';

/**
 * Generate a api request
 * @param  {Object} options - {method, token, route, external, form, headers}
 *
 */
export var generateRequest = function generateRequest(options) {
  var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'FETCH';

  return function (params, body, headers, customToken, tokenType) {
    return function (dispatch) {
      return new Promise(function (accept, reject) {
        dispatch({ payload: assign({}, options, { params: params, body: body, customHeaders: headers, customToken: customToken, tokenType: tokenType }), type: defaultNewRequest.replace('_FETCH', '_' + name.toUpperCase()) });
        genFetchum(options)(params, body, headers, customToken, tokenType).then(function (res) {
          dispatch({ payload: assign({}, options, { res: res, params: params, body: body, customHeaders: headers, customToken: customToken, tokenType: tokenType }), type: defaultSuccessRequest.replace('FETCH_', name.toUpperCase() + '_') });
          accept(res);
        })['catch'](function (res) {
          dispatch({ payload: assign({}, options, { res: res, params: params, body: body, customHeaders: headers, customToken: customToken, tokenType: tokenType }), type: defaultFailureRequest.replace('FETCH_', name.toUpperCase() + '_') });
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
export var generateCRUDRequests = function generateCRUDRequests() {
  var baseUrl = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var idVar = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'id';
  var token = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var name = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'FETCH';
  return {
    fetchAll: generateRequest({
      token: token,
      method: 'GET',
      route: baseUrl
    }, 'FETCH_ALL_' + name.toUpperCase()),
    create: generateRequest({
      token: token,
      method: 'POST',
      route: baseUrl
    }, 'CREATE_' + name.toUpperCase()),
    fetchOne: generateRequest({
      token: token,
      method: 'GET',
      route: baseUrl + '/:' + idVar
    }, 'FETCH_ONE_' + name.toUpperCase()),
    update: generateRequest({
      token: token,
      method: 'PUT',
      route: baseUrl + '/:' + idVar
    }, 'UPDATE_' + name.toUpperCase()),
    'delete': generateRequest({
      token: token,
      method: 'DELETE',
      route: baseUrl + '/:' + idVar
    }, 'DELETE_' + name.toUpperCase())
  };
};

export var request = function request(isFormData, method, url, body, headers, others) {
  var name = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 'FETCH';

  return function (dispatch) {
    return new Promise(function (accept, reject) {
      dispatch({ payload: { isFormData: isFormData, method: method, url: url, body: body, headers: headers, others: others }, type: defaultNewRequest.replace('_FETCH', '_' + name.toUpperCase()) });
      reqFetchum(isFormData, method, url, body, headers, others).then(function (res) {
        dispatch({ payload: { isFormData: isFormData, method: method, url: url, body: body, headers: headers, others: others, res: res }, type: defaultSuccessRequest.replace('FETCH_', name.toUpperCase() + '_') });
        accept(res);
      })['catch'](function (res) {
        dispatch({ payload: { isFormData: isFormData, method: method, url: url, body: body, headers: headers, others: others, res: res }, type: defaultFailureRequest.replace('FETCH_', name.toUpperCase() + '_') });
        reject(res);
      });
    });
  };
};

export var getReq = request.bind(null, false, 'get');
export var putReq = request.bind(null, false, 'put');
export var postReq = request.bind(null, false, 'post');
export var patchReq = request.bind(null, false, 'patch');
export var deleteReq = request.bind(null, false, 'delete');

export var putFormReq = request.bind(null, true, 'put');
export var postFormReq = request.bind(null, true, 'post');

export var apiRequest = function apiRequest(isFormData, method, route, body, headers, others) {
  var name = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 'FETCH';

  return function (dispatch) {
    return new Promise(function (accept, reject) {
      dispatch({ payload: { isFormData: isFormData, method: method, route: route, body: body, headers: headers, others: others }, type: defaultNewRequest.replace('_FETCH', '_' + name.toUpperCase()) });
      apiFetchum(isFormData, method, route, body, headers, others).then(function (res) {
        dispatch({ payload: { isFormData: isFormData, method: method, route: route, body: body, headers: headers, others: others, res: res }, type: defaultSuccessRequest.replace('FETCH_', name.toUpperCase() + '_') });
        accept(res);
      })['catch'](function (res) {
        dispatch({ payload: { isFormData: isFormData, method: method, route: route, body: body, headers: headers, others: others, res: res }, type: defaultFailureRequest.replace('FETCH_', name.toUpperCase() + '_') });
        reject(res);
      });
    });
  };
};

export var apiGetReq = apiRequest.bind(null, false, 'get');
export var apiPutReq = apiRequest.bind(null, false, 'put');
export var apiPostReq = apiRequest.bind(null, false, 'post');
export var apiPatchReq = apiRequest.bind(null, false, 'patch');
export var apiDeleteReq = apiRequest.bind(null, false, 'delete');

export var apiPutFormReq = apiRequest.bind(null, true, 'put');
export var apiPostFormReq = apiRequest.bind(null, true, 'post');