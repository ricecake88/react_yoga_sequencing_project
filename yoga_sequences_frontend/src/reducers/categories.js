export default function categoryReducer(state={categories: [], requesting: false}, action) {
    console.log("\t >>>in categoryReducer")
    console.log(state) 
    console.log(action)
    switch(action.type) {
        case 'START_GET_CATEGORIES':
            return {
                ...state,
                categories: [...state.categories],
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
                categories: [...state.categories],
                requesting: true
            }
        case 'ADD_CATEGORY':
            return {
                ...state,
                categories: [...state.categories, action.category],
                requesting: false
            }
        case 'START_DELETE_CATEGORY':
            return state;
        case 'DELETE_CATEGORY':
            console.log(action);
            return {
                ...state,
                categories: state.categories.filter(category => category.id !== action.category.id),
                requesting: false
            }
        default:
            return state;
    }
}