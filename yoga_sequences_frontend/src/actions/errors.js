import { BACKEND_URL } from '.';

export const clearErrorMessage =() => {
    return (dispatch) => dispatch({type: 'CLEAR_ERROR'})
}