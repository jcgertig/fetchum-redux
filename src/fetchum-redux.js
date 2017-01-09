import { generateRequest as genFetchum, request as reqFetchum, apiRequest as apiFetchum } from 'fetchum'
import assign from 'lodash.assign'

/**
 * Fetchum Redux - Redux action wrapper for fetchum
 */
require('es6-promise').polyfill()

/**
 * Generate a api request
 * @param  {Object} options - {method, token, route, external, form, headers}
 *
 */
export const generateRequest = (options) => {
  return (params, body, headers, customToken, tokenType) => {
    return (dispatch) => {
      return new Promise((accept, reject) => {
        dispatch({ payload: options, type: 'NEW_FETCH_REQUEST' })
        genFetchum(options)(params, body, headers, customToken, tokenType)
          .then(res => {
            dispatch({ payload: assign({}, options, { res }), type: 'FETCH_REQUEST_SUCCESS' })
            accept(res)
          })
          .catch(res => {
            dispatch({ payload: assign({}, options, { res }), type: 'FETCH_REQUEST_FAILURE' })
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
export const generateCRUDRequests = (baseUrl = '', idVar = 'id', token = false) => (
  {
    fetchAll: generateRequest({
      token,
      method: 'GET',
      route: baseUrl
    }),
    create: generateRequest({
      token,
      method: 'POST',
      route: baseUrl
    }),
    fetchOne: generateRequest({
      token,
      method: 'GET',
      route: `${baseUrl}/:${idVar}`
    }),
    update: generateRequest({
      token,
      method: 'PUT',
      route: `${baseUrl}/:${idVar}`
    }),
    delete: generateRequest({
      token,
      method: 'DELETE',
      route: `${baseUrl}/:${idVar}`
    })
  }
)


export const request = (isFormData, method, url, body, headers, others) => {
  return (dispatch) => {
    return new Promise((accept, reject) => {
      dispatch({ payload: { isFormData, method, url, body, headers, others }, type: 'NEW_FETCH_REQUEST' })
      reqFetchum(isFormData, method, url, body, headers, others)
        .then(res => {
          dispatch({ payload: { isFormData, method, url, body, headers, others, res }, type: 'FETCH_REQUEST_SUCCESS' })
          accept(res)
        })
        .catch(res => {
          dispatch({ payload: { isFormData, method, url, body, headers, others, res }, type: 'FETCH_REQUEST_FAILURE' })
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

export const apiRequest = (isFormData, method, route, body, headers, others) => {
  return (dispatch) => {
    return new Promise((accept, reject) => {
      dispatch({ payload: { isFormData, method, route, body, headers, others }, type: 'NEW_FETCH_REQUEST' })
      apiFetchum(isFormData, method, route, body, headers, others)
        .then(res => {
          dispatch({ payload: { isFormData, method, route, body, headers, others, res }, type: 'FETCH_REQUEST_SUCCESS' })
          accept(res)
        })
        .catch(res => {
          dispatch({ payload: { isFormData, method, route, body, headers, others, res }, type: 'FETCH_REQUEST_FAILURE' })
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
