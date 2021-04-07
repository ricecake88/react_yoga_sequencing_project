import { BACKEND_URL } from '../actions';
import { getToken } from '../actions/auth';

export const getYogaCategories = () => {
    console.log("in getYogaCategories");
    let config = {
        headers: {
            'Accept': "application/json",
            'Content-Type': 'application/json',
            'Authorization': getToken()
        }
    }
    return (dispatch) => {
        dispatch({ type: 'START_GET_CATEGORIES'});
        fetch(`${BACKEND_URL}/yoga_categories`, config)
        .then(response => response.json())
        .then(json => dispatch({ type: 'GET_CATEGORIES', json}));
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