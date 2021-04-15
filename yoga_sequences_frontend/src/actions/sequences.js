import { BACKEND_URL } from '.';
import { getToken } from './auth';

export const getSequences = () => {
    let config = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': getToken()
        }
    };
    return (dispatch) => {
        dispatch({type: 'START_GET_SEQ'});
        fetch(`${BACKEND_URL}/sequences?user_id${this.state.auth.currentUser.id}`, config)
        .then(response => {
            if (response.ok) {
                return response.json().then(json => {
                    console.log(json);
                    dispatch({type: 'GET_YOGA_SEQS', sequences: json.sequences})
                })
            } else {
                return response.json().then(errors => {
                    return Promise.reject(errors)
                })
            }
        })
    }
}

export const addSequence = (sequence) => {
    console.log("action addSequence")
    console.log(sequence);
    let config = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': getToken()
        },
        body: JSON.stringify({
            name: sequence.name,
            category_id: parseInt(sequence.category_id),
            user_id: sequence.user_id,
            pose_in_seqs_attributes: sequence.poses_in_seq
        })
    };

    console.log(config)
    return (dispatch) => {
        dispatch({type: 'START_ADD_SEQ'});
        fetch(`${BACKEND_URL}/sequences`, config)
        .then(response => {
            if (response.ok) {
                return response.json().then(json => {
                    console.log(json);
                    dispatch({type: 'ADD_SEQ', sequence: json.sequence})
                })
            } else {
                return response.json().then(errors => {
                    Promise.reject(errors)
                })
            }
        })
    }

}
