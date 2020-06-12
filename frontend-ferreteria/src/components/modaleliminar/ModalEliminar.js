import React from 'react';
import { connect } from 'react-redux';
import Modal from '@material-ui/core/Modal';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';

import useStyles from './ModalEliminar.Style';
import { EliminarProducto } from '../service/ProductoService';

import { addNotification } from '../../redux/notification/notification.actions';

const ModalEliminar = ({ reload, setModal, modal, addNotification }) => {
    
    const classes = useStyles();
    const handleClose = () => setModal({ show: false, producto: {} });
    const handleSubmit = async () => {        
        try{
            const oResponse = await EliminarProducto(modal.producto);
            if(oResponse === "Ok"){
            }else{
                
            }
            setModal({ show: false, producto: {} });
            addNotification({ message: "Se eliminó el producto!", error: false });
            reload();
        }catch(ex){
            addNotification({ message: ex.message, error: true });
        }
    }

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal} open={modal.show} onClose={handleClose}
            BackdropComponent={Backdrop} closeAfterTransition 
            BackdropProps={{ timeout: 500 }}
        >
            <Fade in={modal.show}>
            <Card className={classes.paper}>
                <form className={classes.root} noValidate autoComplete="off">
                    <Grid container spacing={1}>
                        <Grid lg={12} md={12} xs={12} item>
                            <h2 id="transition-modal-title">¿Está seguro de eliminar el producto?</h2>
                        </Grid>
                        <Grid lg={12} md={12} xs={12} item>
                            <Button
                                variant="contained"
                                color="primary"
                                size="large"
                                className={classes.button}
                                starticon={<SaveIcon />}
                                onClick={handleSubmit}
                            >
                            Eliminar
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Card>
            </Fade>
        </Modal>
    );
};

const mapDispatchToProps = dispatch => ({
    addNotification: toast =>  dispatch(addNotification(toast))
});

export default connect(null, mapDispatchToProps)(ModalEliminar);