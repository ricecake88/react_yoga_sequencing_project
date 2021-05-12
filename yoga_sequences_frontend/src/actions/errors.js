import {  NOT_AUTHENTICATED, BACKEND_URL } from '.';
import { checkAuth } from './auth';

export const clearErrorMessage =() => {
    return (dispatch) => dispatch({type: 'CLEAR_ERROR'})
}

export const handleServerError = (response, dispatch) => {
        if (response.status === 401) {
            return Promise.reject(dispatch({type: NOT_AUTHENTICATED}))
        } else {
            return response.json().then(json => {
                dispatch({type: 'ERROR', error: json.errors})
                return Promise.reject(json)
            })
        }

}