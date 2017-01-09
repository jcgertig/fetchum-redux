'use strict';

exports.__esModule = true;
exports.apiPostFormReq = exports.apiPutFormReq = exports.apiDeleteReq = exports.apiPatchReq = exports.apiPostReq = exports.apiPutReq = exports.apiGetReq = exports.apiRequest = exports.postFormReq = exports.putFormReq = exports.deleteReq = exports.patchReq = exports.postReq = exports.putReq = exports.getReq = exports.request = exports.generateCRUDRequests = exports.generateRequest = undefined;

var _fetchum = require('fetchum');

var _lodash = require('lodash.assign');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/**
 * Fetchum Redux - Redux action wrapper for fetchum
 */
require('es6-promise').polyfill();

/**
 * Generate a api request
 * @param  {Object} options - {method, token, route, external, form, headers}
 *
 */
var generateRequest = exports.generateRequest = function generateRequest(options) {
  return function (params, body, headers, customToken, tokenType) {
    return function (dispatch) {
      return new Promise(function (accept, reject) {
        dispatch({ payload: options, type: 'NEW_FETCH_REQUEST' });
        (0, _fetchum.generateRequest)(options)(params, body, headers, customToken, tokenType).then(function (res) {
          dispatch({ payload: (0, _lodash2['default'])({}, options, { res: res }), type: 'FETCH_REQUEST_SUCCESS' });
          accept(res);
        })['catch'](function (res) {
          dispatch({ payload: (0, _lodash2['default'])({}, options, { res: res }), type: 'FETCH_REQUEST_FAILURE' });
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
  return {
    fetchAll: generateRequest({
      token: token,
      method: 'GET',
      route: baseUrl
    }),
    create: generateRequest({
      token: token,
      method: 'POST',
      route: baseUrl
    }),
    fetchOne: generateRequest({
      token: token,
      method: 'GET',
      route: baseUrl + '/:' + idVar
    }),
    update: generateRequest({
      token: token,
      method: 'PUT',
      route: baseUrl + '/:' + idVar
    }),
    'delete': generateRequest({
      token: token,
      method: 'DELETE',
      route: baseUrl + '/:' + idVar
    })
  };
};

var request = exports.request = function request(isFormData, method, url, body, headers, others) {
  return function (dispatch) {
    return new Promise(function (accept, reject) {
      dispatch({ payload: { isFormData: isFormData, method: method, url: url, body: body, headers: headers, others: others }, type: 'NEW_FETCH_REQUEST' });
      (0, _fetchum.request)(isFormData, method, url, body, headers, others).then(function (res) {
        dispatch({ payload: { isFormData: isFormData, method: method, url: url, body: body, headers: headers, others: others, res: res }, type: 'FETCH_REQUEST_SUCCESS' });
        accept(res);
      })['catch'](function (res) {
        dispatch({ payload: { isFormData: isFormData, method: method, url: url, body: body, headers: headers, others: others, res: res }, type: 'FETCH_REQUEST_FAILURE' });
        reject(res);
      });
    });
  };
};

var getReq = exports.getReq = request.bind(null, false, 'get');
var putReq = exports.putReq = request.bind(null, false, 'put');
var postReq = exports.postReq = request.bind(null, false, 'post');
var patchReq = exports.patchReq = request.bind(null, false, 'patch');
var deleteReq = exports.deleteReq = request.bind(null, false, 'delete');

var putFormReq = exports.putFormReq = request.bind(null, true, 'put');
var postFormReq = exports.postFormReq = request.bind(null, true, 'post');

var apiRequest = exports.apiRequest = function apiRequest(isFormData, method, route, body, headers, others) {
  return function (dispatch) {
    return new Promise(function (accept, reject) {
      dispatch({ payload: { isFormData: isFormData, method: method, route: route, body: body, headers: headers, others: others }, type: 'NEW_FETCH_REQUEST' });
      (0, _fetchum.apiRequest)(isFormData, method, route, body, headers, others).then(function (res) {
        dispatch({ payload: { isFormData: isFormData, method: method, route: route, body: body, headers: headers, others: others, res: res }, type: 'FETCH_REQUEST_SUCCESS' });
        accept(res);
      })['catch'](function (res) {
        dispatch({ payload: { isFormData: isFormData, method: method, route: route, body: body, headers: headers, others: others, res: res }, type: 'FETCH_REQUEST_FAILURE' });
        reject(res);
      });
    });
  };
};

var apiGetReq = exports.apiGetReq = apiRequest.bind(null, false, 'get');
var apiPutReq = exports.apiPutReq = apiRequest.bind(null, false, 'put');
var apiPostReq = exports.apiPostReq = apiRequest.bind(null, false, 'post');
var apiPatchReq = exports.apiPatchReq = apiRequest.bind(null, false, 'patch');
var apiDeleteReq = exports.apiDeleteReq = apiRequest.bind(null, false, 'delete');

var apiPutFormReq = exports.apiPutFormReq = apiRequest.bind(null, true, 'put');
var apiPostFormReq = exports.apiPostFormReq = apiRequest.bind(null, true, 'post');