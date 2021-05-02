export default function sequenceReducer(
    state = {
        sequences: [],
        errors: [],
        selSequence: {},
        requesting: false
    }, action) {
        console.log(">>> sequenceReducer");
        //console.log(state);
        console.log(action);
    switch(action.type) {
        case 'START_GET_ALL_SEQ':
            return {
                ...state,
                sequences: state.sequences,
                selSequence: {},
                requesting: true
            }
        case 'GET_ALL_SEQ':
            return {
                ...state,
                sequences: action.sequences,
                errors: [],
                selSequence: {},
                requesting: false
            }
        case 'GET_ALL_SEQ_ERROR':
        case 'ADD_SEQ_ERROR':
        case 'ADD_CATEGORY_ERROR':
        case 'EDIT_SEQ_ERROR':
            return {
                ...state,
                errors: [action.errors],
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
                selSequence: {},
                requesting: true
            }
        case 'EDIT_SEQ':
            const seqIdx = state.sequences.findIndex(seq => seq.id === action.sequence.id);
            const stateNew = {
                ...state,
                sequences: [...state.sequences.slice(0, seqIdx), action.sequence, ...state.sequences.slice(seqIdx+1)],
                errors: [],
                requesting: false
            }
            console.log("IN EDIT SEQUENCE REDUCER ***************");
            console.log(stateNew);
            return stateNew

        case 'START_DELETE_SEQ':
            return {
                ...state,
                sequences: state.sequences,
                selSequence: {},
                requesting: true
            }
        case 'DELETE_SEQ':
            return {
                ...state,
                sequences: state.sequences.filter(sequence => sequence.id !== action.sequence.id),
                selSequence: {},
                errors: [],
                requesting: false
            }
        default:
            return state
    }
}