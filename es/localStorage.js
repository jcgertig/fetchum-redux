import { LocalStorage } from 'fetchum';
/**
 * LocalStorage Wrapper
 */

/**
 * Return the storage prefix
 *
 */
export var getPrefix = function getPrefix() {
  return LocalStorage.getPrefix();
};

/**
 * Gets an item from Storage
 * @param  {Function} dispatch
 * @param  {String}   id
 *
 */
export var get = function get(dispatch, id) {
  var value = LocalStorage.get(id);
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
export var set = function set(dispatch, id, value) {
  var res = LocalStorage.set(id, value);
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
export var remove = function remove(dispatch, id) {
  var res = LocalStorage.remove(id);
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
export var getToken = function getToken(dispatch) {
  var token = LocalStorage.getToken();
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
export var setToken = function setToken(value) {
  return set('token', value);
};

/**
 * Remove item from Storage
 * @param  {String} id
 *
 */
export var removeToken = function removeToken() {
  return remove('token');
};

/**
 * Return state to rehydrate store
 * @return {Object}
 *
 */
export var getHydratedState = function getHydratedState() {
  var state = get('state');
  return state || {};
};

/**
 * Sets the hydrated state
 * @param  {Object} state
 *
 */
export var setHydratedState = function setHydratedState(state) {
  return set('state', state);
};

/**
 * Adds a key to hydrated state
 * @param  {String} id
 * @param  {Any}  value
 */
export var addHydratedState = function addHydratedState(id, value) {
  return set('state', Object.assign({}, getHydratedState(), { id: value }));
};

/**
 * Checks if an item exists
 * @param  {string} id
 *
 */
export var isSet = function isSet(id) {
  return get(id) !== null;
};

/**
 * Checks if has token
 * @param  {Any} value
 *
 */
export var hasToken = function hasToken() {
  return isSet('token');
};