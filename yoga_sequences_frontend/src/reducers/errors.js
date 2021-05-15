export default function errorReducer (state = {error: null}, action) {

    const { error } = action
    if (error) {
        return { 
            error: error 
        }
    } else if (action.type === 'CLEAR_ERROR' || action.type === 'CLEAR_STORE') {
        return {
            error: null
        }
    }

    return state;
}