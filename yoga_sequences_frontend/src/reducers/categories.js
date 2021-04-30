export default function categoryReducer(state={categories: [], errors: [], requesting: false}, action) {
    //console.log("\t >>>in categoryReducer")
    //console.log(state)
    //console.log(action)
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
                errors: [],
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
                errors: [],
                requesting: false
            }
        case 'ADD_CATEGORY_ERROR':
            return {
                ...state,
                errors: action.errors,
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
                errors: [],
                requesting: false
            }
        default:
            return state;
    }
}