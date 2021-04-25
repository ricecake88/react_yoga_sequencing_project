import { BACKEND_URL } from '.';
import { getToken } from './auth';

export const deletePoseFromSeq = (id) => {
    console.log("deletePoseFromSeq")
    debugger
    let config = {
        method: 'DELETE',
        headers: {
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