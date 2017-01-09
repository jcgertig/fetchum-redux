import { LocalStorage } from 'fetchum'
/**
 * LocalStorage Wrapper
 */


/**
 * Return the storage prefix
 *
 */
export const getPrefix = () => {
  return LocalStorage.getPrefix()
}

/**
 * Gets an item from Storage
 * @param  {Function} dispatch
 * @param  {String}   id
 *
 */
export const get = (dispatch, id) => {
  const value = LocalStorage.get(id)
  dispatch({
    payload: { id, value },
    type: 'GET_FROM_STORAGE'
  })
  return value
}

/**
 * Sets an item in Storage
 * @param  {String} id
 * @param  {Any}    value
 *
 */
export const set = (dispatch, id, value) => {
  const res = LocalStorage.set(id, value)
  dispatch({
    payload: { id, value, res },
    type: 'SET_IN_STORAGE'
  })
  return res
}

/**
 * Remove item from Storage
 * @param  {String} id
 *
 */
export const remove = (dispatch, id) => {
  const res = LocalStorage.remove(id)
  dispatch({
    payload: { id, res },
    type: 'REMOVE_FROM_STORAGE'
  })
  return res
}

/**
 * Gets an token from Storage
 *
 */
export const getToken = (dispatch) => {
  const token = LocalStorage.getToken()
  dispatch({
    payload: { token },
    type: 'GET_TOKEN_FROM_STORAGE'
  })
  return token
}

/**
 * Sets the token in Storage
 * @param  {Any} value
 *
 */
export const setToken = value => (set('token', value))

/**
 * Remove item from Storage
 * @param  {String} id
 *
 */
export const removeToken = () => (remove('token'))

/**
 * Return state to rehydrate store
 * @return {Object}
 *
 */
export const getHydratedState = () => {
  const state = get('state')
  return state || {}
}

/**
 * Sets the hydrated state
 * @param  {Object} state
 *
 */
export const setHydratedState = state => (set('state', state))

/**
 * Adds a key to hydrated state
 * @param  {String} id
 * @param  {Any}  value
 */
export const addHydratedState = (id, value) => {
  return set('state', Object.assign({}, getHydratedState(), { id: value }))
}

/**
 * Checks if an item exists
 * @param  {string} id
 *
 */
export const isSet = id => (get(id) !== null)

/**
 * Checks if has token
 * @param  {Any} value
 *
 */
export const hasToken = () => isSet('token')
