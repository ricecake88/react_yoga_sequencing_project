import {  NOT_AUTHENTICATED } from '.';

export const clearErrorMessage =() => {
    return (dispatch) => dispatch({type: 'CLEAR_ERROR'})
}

export const setError = (msg) => {
    return (dispatch) => dispatch({type: 'ERROR', error: msg})
}

export const handleServerError = (response, dispatch) => {
    return response.json().then(json => {
        dispatch({type: 'ERROR', error: json.error})
        if (response.status === 401)
            return Promise.reject(dispatch({type: NOT_AUTHENTICATED}))
        else
            return Promise.reject(dispatch({type: 'ERROR', error: json.error}))
        })

}