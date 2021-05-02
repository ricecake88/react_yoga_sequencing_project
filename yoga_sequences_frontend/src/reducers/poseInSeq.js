export default function poseInSeqReducer(
    state = {
        pose_in_seqs: [],
        requesting: false
    }, action) {
        //console.log(">>> poseInSeqReducer");
        //console.log(state);
        //console.log(action);
    switch(action.type) {
        case 'START_ADD_POSE_IN_SEQ':
            return {
                pose_in_seqs: state.pose_in_seqs,
                requesting: false
            }
        case 'ADD_POSE_IN_SEQ':
            return {
                pose_in_seqs: [...state.pose_in_seqs, action.pose_in_seq],
                requesting: true
            }
        default:
            return state
    }
}