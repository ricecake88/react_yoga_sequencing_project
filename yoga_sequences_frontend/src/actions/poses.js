import { BACKEND_URL } from '.';
import { getToken } from './auth';

export const getPoses = () => {
    let config = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': getToken()
        }
    }
    console.log(config)
    return (dispatch) => {
        dispatch({type: 'START_GET_POSES'});
        fetch(`${BACKEND_URL}/poses`, config)
        .then(response => {
            if (response.ok) {
                return response.json().then(json => {
                    console.log(json);
                    dispatch({type: 'GET_POSES', poses: json.poses})
                })
            } else {
                return response.json().then((errors) => {
                    return Promise.reject(errors);
                })   
            }
        })

    }
}