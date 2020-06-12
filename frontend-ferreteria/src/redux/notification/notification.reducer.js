import NotificationActionTypes from './notification.types';

const INITIAL_STATE = {
    toast: null
};

const NotificationReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case NotificationActionTypes.ADD_NOT:
            return {
                ...state,
                toast: action.payload
            };
        default:
            return state;
    }
}

export default NotificationReducer;