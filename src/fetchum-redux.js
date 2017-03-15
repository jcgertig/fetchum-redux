import { generateRequest as genFetchum, request as reqFetchum, apiRequest as apiFetchum } from 'fetchum'
import assign from 'lodash.assign'

/**
 * Fetchum Redux - Redux action wrapper for fetchum
 */
require('es6-promise').polyfill()

const defaultNewRequest = 'NEW_FETCH_REQUEST'
const defaultSuccessRequest = 'FETCH_REQUEST_SUCCESS'
const defaultFailureRequest = 'FETCH_REQUEST_FAILURE'

/**
 * Generate a api request
 * @param  {Object} options - {method, token, route, external, form, headers}
 *
 */
export const generateRequest = (options, name = 'FETCH') => {
  return (params, body, headers, customToken, tokenType) => {
    return (dispatch) => {
      return new Promise((accept, reject) => {
        dispatch({ payload: options, type: defaultNewRequest.replace('_FETCH', `_${name.toUpperCase()}`) })
        genFetchum(options)(params, body, headers, customToken, tokenType)
          .then(res => {
            dispatch({ payload: assign({}, options, { res }), type: defaultSuccessRequest.replace('FETCH_', `${name.toUpperCase()}_`) })
            accept(res)
          })
          .catch(res => {
            dispatch({ payload: assign({}, options, { res }), type: defaultFailureRequest.replace('FETCH_', `${name.toUpperCase()}_`) })
            reject(res)
          })
      })
    }
  }
}

/**
 * Generate a crud api requests
 * @param  {Object} baseUrl
 * @param  {Object} idVar
 * @param  {Object} useToken
 *
 */
export const generateCRUDRequests = (baseUrl = '', idVar = 'id', token = false, name = 'FETCH') => (
  {
    fetchAll: generateRequest({
      token,
      method: 'GET',
      route: baseUrl
    }, `FETCH_ALL_${name.toUpperCase()}`),
    create: generateRequest({
      token,
      method: 'POST',
      route: baseUrl
    }, `CREATE_${name.toUpperCase()}`),
    fetchOne: generateRequest({
      token,
      method: 'GET',
      route: `${baseUrl}/:${idVar}`
    }, `FETCH_ONE_${name.toUpperCase()}`),
    update: generateRequest({
      token,
      method: 'PUT',
      route: `${baseUrl}/:${idVar}`
    }, `UPDATE_${name.toUpperCase()}`),
    delete: generateRequest({
      token,
      method: 'DELETE',
      route: `${baseUrl}/:${idVar}`
    }, `DELETE_${name.toUpperCase()}`)
  }
)


export const request = (isFormData, method, url, body, headers, others, name = 'FETCH') => {
  return (dispatch) => {
    return new Promise((accept, reject) => {
      dispatch({ payload: { isFormData, method, url, body, headers, others }, type: defaultNewRequest.replace('_FETCH', `_${name.toUpperCase()}`) })
      reqFetchum(isFormData, method, url, body, headers, others)
        .then(res => {
          dispatch({ payload: { isFormData, method, url, body, headers, others, res }, type: defaultSuccessRequest.replace('FETCH_', `${name.toUpperCase()}_`) })
          accept(res)
        })
        .catch(res => {
          dispatch({ payload: { isFormData, method, url, body, headers, others, res }, type: defaultFailureRequest.replace('FETCH_', `${name.toUpperCase()}_`) })
          reject(res)
        })
    })
  }
}

export const getReq = request.bind(null, false, 'get')
export const putReq = request.bind(null, false, 'put')
export const postReq = request.bind(null, false, 'post')
export const patchReq = request.bind(null, false, 'patch')
export const deleteReq = request.bind(null, false, 'delete')

export const putFormReq = request.bind(null, true, 'put')
export const postFormReq = request.bind(null, true, 'post')

export const apiRequest = (isFormData, method, route, body, headers, others, name = 'FETCH') => {
  return (dispatch) => {
    return new Promise((accept, reject) => {
      dispatch({ payload: { isFormData, method, route, body, headers, others }, type: defaultNewRequest.replace('_FETCH', `_${name.toUpperCase()}`) })
      apiFetchum(isFormData, method, route, body, headers, others)
        .then(res => {
          dispatch({ payload: { isFormData, method, route, body, headers, others, res }, type: defaultSuccessRequest.replace('FETCH_', `${name.toUpperCase()}_`) })
          accept(res)
        })
        .catch(res => {
          dispatch({ payload: { isFormData, method, route, body, headers, others, res }, type: defaultFailureRequest.replace('FETCH_', `${name.toUpperCase()}_`) })
          reject(res)
        })
    })
  }
}

export const apiGetReq = apiRequest.bind(null, false, 'get')
export const apiPutReq = apiRequest.bind(null, false, 'put')
export const apiPostReq = apiRequest.bind(null, false, 'post')
export const apiPatchReq = apiRequest.bind(null, false, 'patch')
export const apiDeleteReq = apiRequest.bind(null, false, 'delete')

export const apiPutFormReq = apiRequest.bind(null, true, 'put')
export const apiPostFormReq = apiRequest.bind(null, true, 'post')
