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

import useStyles from './NuevoProducto.Style';

import { RegistrarProducto, ListarProductoCodigo } from '../../service/ProductoService';

import { addNotification } from '../../../redux/notification/notification.actions';

const ProductoForm = ({ cats, codigo, addNotification }) => {

    const oDefaultState = { nIdCategoria: 0, sNombre: '', sCodigo: codigo, nPrecio: 0, nStock: 0 };
    const history = useHistory();
    const classes = useStyles();
    const [dataForm, setDataForm] = useState(oDefaultState);
    
    const handleChangeForm = (a) => (e) => setDataForm({ ...dataForm, [a]: e.target.value });
    const validateForm = () => {
        if(dataForm.sCodigo === ""){
            addNotification({ message: "Ingrese un código", error: true });
            return false;
        }
        if(dataForm.sNombre === ""){
            addNotification({ message: "Ingrese un nombre", error: true });
            return false;
        }
        if(dataForm.nIdCategoria === ""){
            addNotification({ message: "Seleccione una categoría", error: true });
            return false;
        }
        if(dataForm.nPrecio === "" || isNaN(parseFloat(dataForm.nPrecio))){
            addNotification({ message: "Ingrese un precio válido para el producto", error: true });
            return false;
        }
        if(dataForm.nStock === "" || isNaN(parseInt(dataForm.nStock))){
            addNotification({ message: "Ingrese el stock del producto", error: true });
            return false;
        }
        return true;
    }
    const handleSubmit = async () => {
        try{
            if(!validateForm()) return;
            const oValidate = await ListarProductoCodigo(dataForm.sCodigo);
            if(oValidate !== null && typeof oValidate === "object" && oValidate.length > 0){
                addNotification({ message: "El código ya se encuentra registrado", error: true });
                return;
            }
            const oRequest = {
                idCategoria: dataForm.nIdCategoria,
                codigo: dataForm.sCodigo,
                nombre: dataForm.sNombre,
                precio: parseFloat(dataForm.nPrecio),
                stock: parseInt(dataForm.nStock),
            };
            await RegistrarProducto(oRequest);
            addNotification({ message: "Se registró el producto!", error: false });
            history.push(Routes.Home);
        }catch(ex){ 
            addNotification({ message: ex.message, error: true });
        }
    }

    return (
        <div>
            <RouteBar routes={[
                { name: "Inicio", url: "/", icon: "home" },
                { name: "Nuevo Producto", icon: "portrait" }
            ]}/>
            <Card className={classes.paper}>
                <form className={classes.root} noValidate autoComplete="off">
                    <Grid container spacing={1}>
                        <Grid lg={12} md={12} xs={12} item>
                            <h2 id="transition-modal-title">Nuevo Producto</h2>
                        </Grid>
                        <Grid lg={4} md={12} xs={12} item>
                            <FormControl fullWidth className={classes.margin} variant="outlined">
                                <InputLabel htmlFor="input-etiqueta">Codigo</InputLabel>
                                <OutlinedInput
                                    id="input-etiqueta"
                                    value={dataForm.sCodigo}
                                    onChange={handleChangeForm('sCodigo')}
                                    labelWidth={60}
                                />
                            </FormControl>
                        </Grid>
                        <Grid lg={4} md={12} xs={12} item>
                            <FormControl fullWidth className={classes.margin} variant="outlined">
                                <InputLabel htmlFor="input-nombre">Nombre</InputLabel>
                                <OutlinedInput
                                    id="input-nombre"
                                    value={dataForm.sNombre}
                                    onChange={handleChangeForm('sNombre')}
                                    labelWidth={60}
                                />
                            </FormControl>
                        </Grid>
                        <Grid lg={4} md={12} xs={12} item>
                            <FormControl fullWidth className={classes.margin}>
                                <InputLabel id="select-valor-label">Categoría</InputLabel>
                                <Select id="select-valor" value={dataForm.nIdCategoria} onChange={handleChangeForm('nIdCategoria')}>
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
                                    value={dataForm.nPrecio}
                                    onChange={handleChangeForm('nPrecio')}
                                    labelWidth={60}
                                />
                            </FormControl>
                        </Grid>
                        <Grid lg={6} md={12} xs={12} item>
                            <FormControl fullWidth className={classes.margin} variant="outlined">
                                <InputLabel htmlFor="input-diccionario">Stock</InputLabel>
                                <OutlinedInput
                                    id="input-diccionario"
                                    value={dataForm.nStock}
                                    onChange={handleChangeForm('nStock')}
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
                            Registrar Producto
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