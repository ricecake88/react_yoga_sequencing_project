import { BACKEND_URL } from '.';
import { getToken } from './auth';

export const getYogaCategories = (user) => {
    console.log(">>> in actions/yogaSeq -> getYogaCategories");
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
        fetch(`${BACKEND_URL}/yoga_categories/?user_id=${user.id}`, config)
        .then(response => response.json())
        .then(json => {
            console.log(json);
            dispatch({ type: 'GET_CATEGORIES', categories: json.categories})
        });
    };
}

export const addYogaCategory = (category) => {
    console.log("\tAction >> add Yoga Category");
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
        fetch(`${BACKEND_URL}/yoga_categories`, config)
        .then(response => {
            if (response.ok) {
                return response.json().then(json => 
                    dispatch({ type: 'ADD_CATEGORY', category: json.category})
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
    console.log("\t>>>yogaCategories Action -> deleteCategory");
    console.log(id);
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
        fetch(`${BACKEND_URL}/yoga_categories/${id}`, config)
        .then(response => {
            if (response.ok) {
                return response.json().then(json => {
                    console.log(json);
                    dispatch({type: 'DELETE_CATEGORY', category: json.category})
                })
            } else {
                return response.json().then((errors) => {
                    return Promise.reject(errors);
                })
            }
        })
    }
}