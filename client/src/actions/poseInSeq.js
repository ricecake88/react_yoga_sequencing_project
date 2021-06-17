import { API_ROOT } from '.';
import { getToken } from './auth';
import { handleServerError } from './errors';

export const deletePoseFromSeq = (id) => {
    let config = {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': getToken()
        }
    }
    return(dispatch) => {
        dispatch({type: 'START_DELETE_POSE_IN_SEQ'})
        fetch(`${API_ROOT}/pose_in_seqs/${id}`, config)
        .then(response => {
            if (response.ok) {
                return response.json().then(json => {
                    dispatch({type: 'DELETE_POSE_IN_SEQ'}, json.poseInSeq)
                })
            } else {
                return handleServerError(response, dispatch)
            }
        })
    }
}

/* currently this is not being used */
export const addPoseToSeq = (id, pose_in_seq) => {
    let config = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': getToken()
        },
        body: JSON.stringify({
            sequence_id: id,
            pose_id: pose_in_seq.pose_id,
            num_breaths: pose_in_seq.num_breaths,
            pose_order: pose_in_seq.pose_order
        })
    }

    return (dispatch) => {
        dispatch({type: 'START_ADD_POSE_TO_SEQ'})
        return fetch(`${API_ROOT}/pose_in_seqs`, config)
        .then(response => {
            if (response.ok) {
                return response.json().then(json => {
                    dispatch({type: 'ADD_POSE_TO_SEQ'}, config)
                }) 
            } else {
                return handleServerError(response, dispatch)             
            }
        })
    }
}