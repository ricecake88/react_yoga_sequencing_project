/* this reducer is partially used as the poseInSeq
 state is determined within a sequence
 and handled within the component itself 
 only add pose in sequence is used, within the edit page
 */
export default function poseInSeqReducer(
    state = {
        pose_in_seqs: [],
        requesting: false
    }, action) {
    switch(action.type) {
        case 'START_ADD_POSE_IN_SEQ':
            return {
                ...state,
                pose_in_seqs: state.pose_in_seqs,
                requesting: true
            }
        case 'ADD_POSE_IN_SEQ':
            return {
                ...state,
                pose_in_seqs: [...state.pose_in_seqs, action.pose_in_seq],
                requesting: false
            }
        case 'START_DELETE_POSE_IN_SEQ':
            return {
                ...state,
                requesting: true
            }
        case 'DELETE_POSE_IN_SEQ':
            return {
                ...state,
                requesting: false
            }
        case 'CLEAR_STORE':
            return {
                ...state,
                pose_in_seqs: [],
                requesting: false
            }
        default:
            return state
    }
}