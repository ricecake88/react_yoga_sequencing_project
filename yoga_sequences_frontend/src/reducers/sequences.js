export default function sequenceReducer(
    state = {
        sequences: [],
        requesting: false
    }, action) {
        console.log(">>> sequenceReducer");
        console.log(state);
        console.log(action);
    switch(action.type) {
        case 'START_ADD_SEQ':
            return {
                ...state,
                sequences: state.sequences,
                requesting: true
            }
        case 'ADD_SEQ':
            return {
                ...state,
                sequences: [state.sequences, action.sequence],
                requesting: false
            }
        default:
            return state
    }
}