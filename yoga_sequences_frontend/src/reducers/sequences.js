export default function sequenceReducer(
    state = {
        sequences: [],
        requesting: false
    }, action) {
        console.log(">>> sequenceReducer");
        console.log(state);
        console.log(action);
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
                requesting: false
            }
        default:
            return state
    }
}