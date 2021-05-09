import { BACKEND_URL } from '.';
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
                    console.log(json)
                    if (json.status === 200)
                        dispatch({ type: 'GET_CATEGORIES', categories: json.categories})
                    else
                        dispatch({ type: 'GET_CATEGEORIES_ERR'})
                })
            } else {
                return response.json().then(errors => {
                    dispatch({ type: 'GET_CATEGEORIES_ERR'})
                    return Promise.reject(errors)
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
                return response.json().then(json => {
                        if (json.status === 200)
                            dispatch({ type: 'ADD_CATEGORY', category: json.category})
                        else
                            dispatch({ type: 'ADD_CATEGORY_ERROR', errors: json.errors})
                    }
                )
            } else {
                return response.json().then((errors) => {
                    // NEED to write an action to handle errors
                    //dispatch({type: NOT_AUTHENTICATED});
                    return Promise.reject(errors);
                });
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
                    if (json.status === 200)
                        dispatch({type: 'DELETE_CATEGORY', category: json.category})
                    else
                        dispatch({type: 'DELETE_CATEGORY_ERR'})
                })
            } else {
                return response.json().then((errors) => {
                    return Promise.reject(errors);
                })
            }
        })
    }
}