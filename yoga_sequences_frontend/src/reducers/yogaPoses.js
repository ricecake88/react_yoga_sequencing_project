export default function yogaPoseReducer(state = 
    { 
        poses: [], 
        requesting: false
    }, action) {
    console.log(state);
    console.log(action);
    switch(action.type) {
        case 'START_GET_YOGA_POSES':
            return {
                ...state,
                poses: state.poses,
                requesting: true
            }
        case 'GET_YOGA_POSES':
            return {
                ...state,
                poses: action.yoga_poses,
                requesting: false
            }
        default:
            return state;
    }
}