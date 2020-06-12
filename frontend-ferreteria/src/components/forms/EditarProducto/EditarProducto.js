import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import RouteBar from '../../routebar/RouteBar';
import { Routes } from '../../../app/Routes';

import useStyles from './EditarProducto.Style';

import { EditarProducto, ListarProductoCodigo } from '../../service/ProductoService';

import { addNotification } from '../../../redux/notification/notification.actions';

const ProductoForm = ({ cats, producto, addNotification }) => {

    const history = useHistory();
    const classes = useStyles();
    const [dataForm, setDataForm] = useState(producto);
    
    const handleChangeForm = (a) => (e) => setDataForm({ ...dataForm, [a]: e.target.value });
    const validateForm = () => {
        if(dataForm.codigo === ""){
            addNotification({ message: "Ingrese un código", error: true });
            return false;
        }
        if(dataForm.nombre === ""){
            addNotification({ message: "Ingrese un nombre", error: true });
            return false;
        }
        if(dataForm.idCategoria === ""){
            addNotification({ message: "Seleccione una categoría", error: true });
            return false;
        }
        if(dataForm.precio === "" || isNaN(parseFloat(dataForm.precio))){
            addNotification({ message: "Ingrese un precio válido para el producto", error: true });
            return false;
        }
        if(dataForm.stock === "" || isNaN(parseInt(dataForm.stock))){
            addNotification({ message: "Ingrese el stock del producto", error: true });
            return false;
        }
        return true;
    }
    const handleSubmit = async () => {        
        try{
            if(!validateForm()) return;
            const oValidate = await ListarProductoCodigo(dataForm.codigo);
            if(oValidate !== null && typeof oValidate === "object" && oValidate.length > 0){
                if(oValidate[0].id !== dataForm.id){
                    addNotification({ message: "El código ya se encuentra registrado con otro producto", error: true });
                    return;
                }
            }
            dataForm.stock = parseInt(dataForm.stock);
            dataForm.precio = parseFloat(dataForm.precio);
            await EditarProducto(dataForm);
            addNotification({ message: "Se actualizó el producto!", error: false });
            history.push(Routes.Home);
        }catch(ex){ 
            addNotification({ message: ex.message, error: true });
        }
    }

    return (
        <div>
            <RouteBar routes={[
                { name: "Inicio", url: "/", icon: "home" },
                { name: "Editar Producto", icon: "portrait" }
            ]}/>
            <Card className={classes.paper}>
                <form className={classes.root} noValidate autoComplete="off">
                    <Grid container spacing={1}>
                        <Grid lg={12} md={12} xs={12} item>
                            <h2 id="transition-modal-title">Editar - {producto.nombre}</h2>
                        </Grid>
                        <Grid lg={4} md={12} xs={12} item>
                            <FormControl fullWidth className={classes.margin} variant="outlined">
                                <InputLabel htmlFor="input-etiqueta">Codigo</InputLabel>
                                <OutlinedInput
                                    id="input-etiqueta"
                                    value={dataForm.codigo}
                                    onChange={handleChangeForm('codigo')}
                                    labelWidth={60}
                                />
                            </FormControl>
                        </Grid>
                        <Grid lg={4} md={12} xs={12} item>
                            <FormControl fullWidth className={classes.margin} variant="outlined">
                                <InputLabel htmlFor="input-nombre">Nombre</InputLabel>
                                <OutlinedInput
                                    id="input-nombre"
                                    value={dataForm.nombre}
                                    onChange={handleChangeForm('nombre')}
                                    labelWidth={60}
                                />
                            </FormControl>
                        </Grid>
                        <Grid lg={4} md={12} xs={12} item>
                            <FormControl fullWidth className={classes.margin}>
                                <InputLabel id="select-valor-label">Categoría</InputLabel>
                                <Select id="select-valor" value={dataForm.idCategoria} onChange={handleChangeForm('idCategoria')}>
                                    <MenuItem key={-1} value=""><em>---</em></MenuItem>
                                    {cats.map((item, index) => (
                                        <MenuItem key={index} value={item.id}>{item.nombre}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid lg={6} md={12} xs={12} item>
                            <FormControl fullWidth className={classes.margin} variant="outlined">
                                <InputLabel htmlFor="input-diccionario">Precio</InputLabel>
                                <OutlinedInput
                                    id="input-diccionario"
                                    value={dataForm.precio}
                                    onChange={handleChangeForm('precio')}
                                    labelWidth={60}
                                />
                            </FormControl>
                        </Grid>
                        <Grid lg={6} md={12} xs={12} item>
                            <FormControl fullWidth className={classes.margin} variant="outlined">
                                <InputLabel htmlFor="input-diccionario">Stock</InputLabel>
                                <OutlinedInput
                                    id="input-diccionario"
                                    value={dataForm.stock}
                                    onChange={handleChangeForm('stock')}
                                    labelWidth={60}
                                />
                            </FormControl>
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
                            Editar Producto
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Card>
        </div>
    );
};

const mapDispatchToProps = dispatch => ({
    addNotification: toast =>  dispatch(addNotification(toast))
});

export default connect(null, mapDispatchToProps)(ProductoForm);