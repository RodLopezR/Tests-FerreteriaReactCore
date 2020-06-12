import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist'; 
import storage from 'redux-persist/lib/storage';

import NotificationReducer from './notification/notification.reducer';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: [ 'notification' ]
}

const rootReducer =  combineReducers({
    notification: NotificationReducer
});

export default persistReducer(persistConfig, rootReducer);