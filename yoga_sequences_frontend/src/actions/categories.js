import {  NOT_AUTHENTICATED, BACKEND_URL } from '.';
import { getToken } from './auth';

export const getCategories = (user) => {
    //console.log(">>> in actions/sequences -> getCategories");
    console.log(user);
    let config = {
        headers: {
            'Accept': "application/json",
            'Content-Type': 'application/json',
            'Authorization': getToken()
        },
    }
    return (dispatch) => {
        dispatch({ type: 'START_GET_CATEGORIES'});
        fetch(`${BACKEND_URL}/categories/?user_id=${user.id}`, config)
        .then(response =>  {
            if (response.ok) {
                return response.json().then(json => {
                    console.log(json);
                    dispatch({ type: 'GET_CATEGORIES', categories: json.categories})
                })
            } else {
                return response.json().then(json => {
                    console.log(json)
                    dispatch({ type: 'ERROR', error: json.errors})
                    //return Promise.reject(error)
                })
            }
        })

    };
}



export const addCategory = (category) => {
    //console.log("\tAction >> add Category");
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
        fetch(`${BACKEND_URL}/categories`, config)
        .then(response => {
            if (response.ok) {
                return response.json().then(json =>
                     dispatch({ type: 'ADD_CATEGORY', category: json.category})
                )
            } else {
                if (response.status === 401) {
                    // send to unauthorization
                    dispatch({ type: NOT_AUTHENTICATED });
                } else {
                    return response.json().then((json) => {
                        dispatch({ type: 'ERROR', error: json.errors})
                        //return Promise.reject(errors);
                    });
                }
            }
        })
    }
}

export const deleteCategory = (id) => {
    //console.log("\t>>>categories Action -> deleteCategory");
    //console.log(id);
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
        fetch(`${BACKEND_URL}/categories/${id}`, config)
        .then(response => {
            if (response.ok) {
                return response.json().then(json => {
                   dispatch({type: 'DELETE_CATEGORY', category: json.category})
                })
            } else {
                if (response.status === 401)
                    dispatch({type: NOT_AUTHENTICATED})
                else {
                    return response.json().then((json) => {
                        dispatch({type: 'ERROR', errors: json.errors})
                        //return Promise.reject(errors);
                    })
                }
            }
        })
    }
}