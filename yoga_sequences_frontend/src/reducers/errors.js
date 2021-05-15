export default function errorReducer (state = {error: null}, action) {

    // const { error } = action
    // if (error) {
    //     console.log(error)
    //     return { 
    //         error: error 
    //     }
    // } else if (action.type === 'CLEAR_ERROR') {
    //     console.log("Clearing Error")
    //     return {
    //         error: null
    //     }
    // }
    switch (action.type) {
        case 'CLEAR_ERROR':
            return {
                ...state,
                error: null
            }
        case 'ERROR':
            return {
                ...state,
                error: action
            }
        case 'CLEAR_STORE':
            return {
                ...state,
                error: null
            }
    }

    return state;
}