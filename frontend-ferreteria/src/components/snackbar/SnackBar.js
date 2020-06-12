import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectToast } from '../../redux/notification/notification.selectors';
import { addNotification } from '../../redux/notification/notification.actions';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

const SnackBarView = ({ toast, addNotification }) => {

    const classes = useStyles();
    const [open, setOpen] = useState(true);
    
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') return;
        setOpen(false);
        addNotification(null);
    };

    useEffect(() => {
        setOpen(toast !== null)
    }, [toast]);

    return (
        <div className={classes.root}>
            {toast !== null ? (
                <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity={toast.error ? 'warning' : 'success'}>
                        {toast.message}
                    </Alert>
                </Snackbar>
            ) : null}
        </div>
    );
};

const mapStateToProps =  createStructuredSelector({
    toast: selectToast
});

const mapDispatchToProps = dispatch => ({
    addNotification: toast =>  dispatch(addNotification(toast))
});

export default connect(mapStateToProps, mapDispatchToProps)(SnackBarView);