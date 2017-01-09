'use strict';

exports.__esModule = true;
exports.hasToken = exports.isSet = exports.addHydratedState = exports.setHydratedState = exports.getHydratedState = exports.removeToken = exports.setToken = exports.getToken = exports.remove = exports.set = exports.get = exports.getPrefix = undefined;

var _fetchum = require('fetchum');

/**
 * LocalStorage Wrapper
 */

/**
 * Return the storage prefix
 *
 */
var getPrefix = exports.getPrefix = function getPrefix() {
  return _fetchum.LocalStorage.getPrefix();
};

/**
 * Gets an item from Storage
 * @param  {Function} dispatch
 * @param  {String}   id
 *
 */
var get = exports.get = function get(dispatch, id) {
  var value = _fetchum.LocalStorage.get(id);
  dispatch({
    payload: { id: id, value: value },
    type: 'GET_FROM_STORAGE'
  });
  return value;
};

/**
 * Sets an item in Storage
 * @param  {String} id
 * @param  {Any}    value
 *
 */
var set = exports.set = function set(dispatch, id, value) {
  var res = _fetchum.LocalStorage.set(id, value);
  dispatch({
    payload: { id: id, value: value, res: res },
    type: 'SET_IN_STORAGE'
  });
  return res;
};

/**
 * Remove item from Storage
 * @param  {String} id
 *
 */
var remove = exports.remove = function remove(dispatch, id) {
  var res = _fetchum.LocalStorage.remove(id);
  dispatch({
    payload: { id: id, res: res },
    type: 'REMOVE_FROM_STORAGE'
  });
  return res;
};

/**
 * Gets an token from Storage
 *
 */
var getToken = exports.getToken = function getToken(dispatch) {
  var token = _fetchum.LocalStorage.getToken();
  dispatch({
    payload: { token: token },
    type: 'GET_TOKEN_FROM_STORAGE'
  });
  return token;
};

/**
 * Sets the token in Storage
 * @param  {Any} value
 *
 */
var setToken = exports.setToken = function setToken(value) {
  return set('token', value);
};

/**
 * Remove item from Storage
 * @param  {String} id
 *
 */
var removeToken = exports.removeToken = function removeToken() {
  return remove('token');
};

/**
 * Return state to rehydrate store
 * @return {Object}
 *
 */
var getHydratedState = exports.getHydratedState = function getHydratedState() {
  var state = get('state');
  return state || {};
};

/**
 * Sets the hydrated state
 * @param  {Object} state
 *
 */
var setHydratedState = exports.setHydratedState = function setHydratedState(state) {
  return set('state', state);
};

/**
 * Adds a key to hydrated state
 * @param  {String} id
 * @param  {Any}  value
 */
var addHydratedState = exports.addHydratedState = function addHydratedState(id, value) {
  return set('state', Object.assign({}, getHydratedState(), { id: value }));
};

/**
 * Checks if an item exists
 * @param  {string} id
 *
 */
var isSet = exports.isSet = function isSet(id) {
  return get(id) !== null;
};

/**
 * Checks if has token
 * @param  {Any} value
 *
 */
var hasToken = exports.hasToken = function hasToken() {
  return isSet('token');
};