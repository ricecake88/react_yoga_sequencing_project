export default function sequenceReducer(
    state = {
        sequences: [],
        errors: [],
        requesting: false
    }, action) {
        //console.log(">>> sequenceReducer");
        //console.log(state);
        //console.log(action);
    switch(action.type) {
        case 'START_GET_ALL_SEQ':
            return {
                ...state,
                sequences: state.sequences,
                requesting: true
            }
        case 'GET_ALL_SEQ':
            return {
                ...state,
                sequences: action.sequences,
                errors: [],
                requesting: false
            }
        case 'GET_ALL_SEQ_ERROR':
        case 'ADD_SEQ_ERROR':
        case 'ADD_CATEGORY_ERROR':
            return {
                ...state,
                errors: [...state.errors, action.errors],
                requesting: false
            }
        case 'START_ADD_SEQ':
            return {
                ...state,
                sequences: state.sequences,
                requesting: true
            }
        case 'ADD_SEQ':
            return {
                ...state,
                sequences: [...state.sequences, action.sequence],
                errors: [],
                requesting: false
            }
        case 'START_EDIT_SEQ':
            return {
                ...state,
                sequences: state.sequences,
                requesting: true
            }
        case 'EDIT_SEQ':
            const sequence = state.sequences[state.sequences.findIndex(sequence => sequence.id === action.sequence.id)]
            console.log(sequence);
            return {
                ...state,
                sequences: state.sequences,
                errors: [],
                requesting: false
            }
        case 'START_DELETE_SEQ':
            return {
                ...state,
                sequences: state.sequences,
                requesting: true
            }
        case 'DELETE_SEQ':
            return {
                ...state,
                sequences: state.sequences.filter(sequence => sequence.id !== action.sequence.id),
                errors: [],
                requesting: false
            }
        default:
            return state
    }
}