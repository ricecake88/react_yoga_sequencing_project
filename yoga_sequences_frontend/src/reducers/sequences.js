export default function sequenceReducer(
    state = {
        sequences: [],
        selSequence: {},
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
                //selSequence: {},
                requesting: true
            }
        case 'GET_ALL_SEQ':
            return {
                ...state,
                sequences: action.sequences,
                //selSequence: {},
                requesting: false
            }
        case 'START_GET_SEQ':
            return {
                ...state,
                sequences: state.sequences,
                selSequence: {},
                requesting: true
            }
        case 'GET_SEQ':
            return {
                ...state,
                sequences: state.sequences,
                selSequence: action.sequence,
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
                selSequence: action.sequence,
                requesting: false
            }
            return stateNew;
        case 'START_DELETE_SEQ':
            return {
                ...state,
                sequences: state.sequences,
                //selSequence: {},
                requesting: true
            }
        case 'DELETE_SEQ':
            return {
                ...state,
                sequences: state.sequences.filter(sequence => sequence.id !== action.sequence.id),
                //selSequence: {},
                requesting: false
            }
        case 'CLEAR_STORE':
            return {
                ...state,
                sequences: [],
                selSequence: {},
                requesting: false
            }
        default:
            return state
    }
}