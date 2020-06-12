import { createSelector } from 'reselect';

const selectNotification = state => state.notification;

export const selectToast = createSelector(
    [selectNotification],
    notification => {
        if(notification != null && notification.toast != null) return notification.toast;
        return null;
    }
);