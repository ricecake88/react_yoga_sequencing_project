import {  NOT_AUTHENTICATED } from '.';

export const clearErrorMessage =() => {
    return (dispatch) => dispatch({type: 'CLEAR_ERROR'})
}

export const handleServerError = (response, dispatch) => {
    return response.json().then(json => {
        dispatch({type: 'ERROR', error: json.error})
        if (response.status == 401)
            Promise.reject(dispatch({type: NOT_AUTHENTICATED})).catch(err => console.log("Caught Promise!"))
        else 
            //return Promise.reject(json)
            Promise.reject(dispatch({type: 'ERROR', error: json.error})).catch(err => console.log("Caught Promise!"))
        })

}