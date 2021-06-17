import { API_ROOT } from '.';
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
        return fetch(`${API_ROOT}/poses`, config)
        .then(response => {
            if (response.ok) {
                return response.json().then(json => {
                    console.log(json);
                    dispatch({type: 'GET_POSES', poses: json.poses})
                })
            } else {
                return handleServerError(response, dispatch)
            }
        })

    }
}
