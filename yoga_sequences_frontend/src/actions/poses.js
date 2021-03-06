import { BACKEND_URL } from '.';
import { handleServerError } from './errors';

export const getPoses = () => {
    let config = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }
    return (dispatch) => {
        dispatch({type: 'START_GET_POSES'});
        return fetch(`${BACKEND_URL}/poses`, config)
        .then(response => {
            if (response.ok) {
                return response.json().then(json => {
                    dispatch({type: 'GET_POSES', poses: json.poses})
                })
            } else {
                return handleServerError(response, dispatch)
            }
        })

    }
}
