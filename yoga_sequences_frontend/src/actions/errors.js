import {  NOT_AUTHENTICATED } from '.';

export const clearErrorMessage =() => {
    return (dispatch) => dispatch({type: 'CLEAR_ERROR'})
}

export const handleServerError = (response, dispatch) => {
    return response.json().then(json => {
        console.log("in handleServerError")
        console.log(response)
        dispatch({type: 'ERROR', error: json.error})
        if (response.status === 401)
            return Promise.reject(dispatch({type: NOT_AUTHENTICATED}))
        else 
            //Promise.reject(dispatch({type: 'ERROR', error: json.error})).catch(err => console.log("Caught Promise!"))           
            return Promise.reject(dispatch({type: 'ERROR', error: json.error}))
        })

}