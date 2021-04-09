import { BACKEND_URL } from '.';
import { getToken } from './auth';

export const getYogaPoses = () => {
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
        dispatch({type: 'START_GET_YOGA_POSES'});
        fetch(`${BACKEND_URL}/yoga_poses`, config)
        .then(response => {
            if (response.ok) {
                return response.json().then(json => {
                    console.log(json);
                    dispatch({type: 'GET_YOGA_POSES', yoga_poses: json.yoga_poses})
                })
            } else {
                return response.json().then((errors) => {
                    return Promise.reject(errors);
                })   
            }
        })

    }
}