export default function errorReducer (state = {error: null}, action) {

    const { error } = action
    if (error) {
        console.log(error)
        return { 
            error: error 
        }
    } else if (action.type === 'CLEAR_ERROR') {
        return {
            error: null
        }
    }

    return state;
}