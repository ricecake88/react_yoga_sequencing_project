import { API_ROOT } from '.';
import { getToken } from './auth';
import { handleServerError } from './errors';

export const getCategories = (user) => {
    let config = {
        headers: {
            'Accept': "application/json",
            'Content-Type': 'application/json',
            'Authorization': getToken()
        },
    }
    return (dispatch) => {
        dispatch({ type: 'START_GET_CATEGORIES'});
        return fetch(`${API_ROOT}/categories/?user_id=${user.id}`, config)
        .then(response =>  {
            if (response.ok) {
                return response.json().then(json => {
                    //console.log(json);
                    dispatch({ type: 'GET_CATEGORIES', categories: json.categories})
                })
            } else {
                return handleServerError(response, dispatch)
            }
        })

    };
}



export const addCategory = (category) => {
    let config = {
        method: 'POST',
        headers: {
            'Accept': "application/json",
            'Content-Type': 'application/json',
            'Authorization': getToken()
        },
        body: JSON.stringify({
            name: category
        })
    }
    return (dispatch) => {
        dispatch({type: 'START_ADD_CATEGORY'});
        return fetch(`${API_ROOT}/categories`, config)
        .then(response => {
            if (response.ok) {
                return response.json().then(json =>
                     dispatch({ type: 'ADD_CATEGORY', category: json.category})
                )
            } else {
                return handleServerError(response, dispatch)
            }
        })
    }
}

export const deleteCategory = (id) => {
    let config = {
        method: 'DELETE',
        headers: {
            'Accept': "application/json",
            'Content-Type': 'application/json',
            'Authorization': getToken()
        }
    }
    return (dispatch) => {
        dispatch({type: 'START_DELETE_CATEGORY'});
        return fetch(`${API_ROOT}/categories/${id}`, config)
        .then(response => {
            if (response.ok) {
                return response.json().then(json => {
                   dispatch({type: 'DELETE_CATEGORY', category: json.category})
                })
            } else {
                return handleServerError(response, dispatch)
            }
        })
    }
}