import NotificationActionTypes from './notification.types';

export const addNotification = (toast) => ({
    type: NotificationActionTypes.ADD_NOT,
    payload: toast
});