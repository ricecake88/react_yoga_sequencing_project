export default function poseReducer(state = 
    { 
        poses: [], 
        requesting: false
    }, action) {
    //console.log(">>> poseReducer");
    //console.log(state);
    //console.log(action);
    switch(action.type) {
        case 'START_GET_POSES':
            return {
                ...state,
                poses: state.poses,
                requesting: true
            }
        case 'GET_POSES':
            return {
                ...state,
                poses: action.poses,
                requesting: false
            }
        default:
            return state;
    }
}