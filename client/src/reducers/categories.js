export default function categoryReducer(state={categories: [], requesting: false}, action) {
    switch(action.type) {
        case 'START_GET_CATEGORIES':
            return {
                ...state,
                categories: state.categories,
                requesting: true
            }
        case 'GET_CATEGORIES':
            return {
                ...state,
                categories: action.categories,
                requesting: false
            }
        case 'START_ADD_CATEGORY':
            return {
                ...state,
                categories: state.categories,
                requesting: true
            }
        case 'ADD_CATEGORY':
            return {
                ...state,
                categories: [...state.categories, action.category],
                requesting: false
            }
        case 'START_DELETE_CATEGORY':
            return {
                ...state,
                requesting: true
            }
        case 'DELETE_CATEGORY':
            return {
                ...state,
                categories: state.categories.filter(category => category.id !== action.category.id),
                requesting: false
            }
        case 'CLEAR_STORE':
            return {
                ...state,
                categories: [],
                requesting: false
            }
        default:
            return state;
    }
}