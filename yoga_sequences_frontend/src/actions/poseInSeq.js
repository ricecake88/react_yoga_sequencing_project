import { BACKEND_URL } from '.';
import { getToken } from './auth';

export const deletePoseFromSeq = (id) => {
    console.log("deletePoseFromSeq")
    let config = {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': getToken()
        }
    }
    return(dispatch) => {
        dispatch({type: 'START_DELETE_POSEINSEQ'})
        fetch(`${BACKEND_URL}/pose_in_seqs/${id}`, config)
        .then(response => {
            if (response.ok) {
                return response.json().then(json => {
                    console.log(json)
                    dispatch({type: 'DELETE_POSEINSEQ'}, json.poseInSeq)
                })
            } else {
                return response.json().then(errors => {
                    Promise.reject(errors)
                })
            }
        })
    }
}

export const addPoseToSeq = (id, pose_in_seq) => {
    console.log("addPoseToSeq");
    console.log(id);
    console.log(pose_in_seq);
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
        fetch(`${BACKEND_URL}/pose_in_seqs`, config)
        .then(response => {
            if (response.ok) {
                return response.json().then(json => {
                    console.log(json);
                    debugger
                    dispatch({type: 'ADD_POSE_TO_SEQ'}, config)
                }) 
            } else {
                return response.json().then(errors => {
                    Promise.reject(errors)
                })                
            }
        })
    }
}