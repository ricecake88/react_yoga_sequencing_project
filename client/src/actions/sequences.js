import { API_ROOT } from '.';
import { getToken } from './auth';
import { handleServerError } from './errors';

export const getSequences = (user) => {
    let config = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': getToken()
        }
    };
    return (dispatch) => {
        dispatch({type: 'START_GET_ALL_SEQ'});
        return fetch(`${API_ROOT}/sequences?user_id=${user.id}`, config)
        .then(response => {
            if (response.ok) {
                return response.json().then(json => {
                    dispatch({type: 'GET_ALL_SEQ', sequences: json.sequences})
                })
            } else {
                return handleServerError(response, dispatch)
            }
        })
    }
}


export const getSequence = (id) => {
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
        return fetch(`${API_ROOT}/sequences/${id}`, config)
        .then(response => {
            if (response.ok) {
                return response.json().then(json => {
                    dispatch({type: 'GET_SEQ', sequence: json.sequence})
                })
            } else {
                return handleServerError(response, dispatch)
            }
        })
    }
}


export const addSequence = (sequence) => {
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
            pose_in_seqs_attributes: sequence.pose_in_seqs
        })
    };

    return (dispatch) => {
        dispatch({type: 'START_ADD_SEQ'});
        return fetch(`${API_ROOT}/sequences`, config)
        .then(response => {
            if (response.ok) {
                return response.json().then(json => {
                    dispatch({type: 'ADD_SEQ', sequence: json.sequence})
                })
            } else {
                return handleServerError(response, dispatch)
            }
        })
    }

}

export const deleteSequence = (id) => {
    let config = {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': getToken()
        }
     };

    return (dispatch) => {
        dispatch({type: 'START_DELETE_SEQ'});
        return fetch(`${API_ROOT}/sequences/${id}`, config)
        .then(response => {
            if (response.ok) {
                return response.json().then(json => {
                    dispatch({type: 'DELETE_SEQ', sequence: json.sequence})
                })
            } else {
                return handleServerError(response, dispatch)
            }
        })
    }
}

export const editSequence = (sequence) => {
    let config = {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': getToken()
        },
        body: JSON.stringify({
            name: sequence.name,
            category_id: parseInt(sequence.category_id),
            user_id: sequence.user_id,
            pose_in_seqs_attributes: sequence.pose_in_seqs
        })
    };
    return (dispatch) => {
        dispatch({type: 'START_EDIT_SEQ'});
        return fetch(`${API_ROOT}/sequences/${sequence.id}`, config)
        .then(response => {
            if (response.ok) {
                return response.json().then(json => {
                    dispatch({type: 'EDIT_SEQ', sequence: json.sequence})
                })
            } else {
                return handleServerError(response, dispatch)
            }
        })
    }
}