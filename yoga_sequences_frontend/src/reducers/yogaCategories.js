export default function yogaCategoryReducer(state={categories: [], requesting: false}, action) {
    console.log("\t >>>in yogaCategoryReducer")
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
            debugger
            return {
                ...state,
                categories: [...state.categories, action.category],
                requesting: false
            }
        default:
            return state;
    }
}