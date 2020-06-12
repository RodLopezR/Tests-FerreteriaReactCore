import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import SearchTable from '../../components/searchtable/SearchTable';
import ModalEliminar from '../../components/modaleliminar/ModalEliminar';
import { ListarProductoCodigo, ListarProductoNombre } from '../../components/service/ProductoService';

import { oDataDefault, oColumns } from './FormProps';
import { Routes } from '../../app/Routes';

import RouteBar from '../../components/routebar/RouteBar';

const HomePage = () => {
    
    const history = useHistory();
    const [producto, setProducto] = useState(oDataDefault);
    const [productoEliminar, setProductoEliminar] = useState({ show: false, producto: {} });

    const oHeader = {
        title: "Buscar productos",
        actions: [
            { name: "Editar producto", action: (item) => {
                history.push(Routes.Edicion + item.codigo);
            }},
            { name: "Eliminar producto", action: (item) => {
                setProductoEliminar({ show: true, producto: item});
            }}
        ],
        reloadEvent: (nTipoBusqueda, sBusqueda) => {
            reload(nTipoBusqueda, sBusqueda);
        }
    };

    const reload = async (nTipoBusqueda, sBusqueda) => {
        setProducto({ loading: true, error: false, data: [] });
        try{
            if(nTipoBusqueda === 1){
                const oData = await ListarProductoCodigo(sBusqueda);
                setProducto({ loading: false, error: false, data: oData });
            }else if (nTipoBusqueda === 2){
                const oData = await ListarProductoNombre(sBusqueda);
                setProducto({ loading: false, error: false, data: oData });
            }
        }catch(ex){
            setProducto({ loading: false, error: true, data: [] });
        }
    }

    return (
        <div>
            <RouteBar routes={[
                { name: "Inicio", url: "/", icon: "home" },
                { name: "Buscador", icon: "portrait" }
            ]}/>
            <SearchTable 
                data={producto.data}
                columns={oColumns}
                header={oHeader}
                loading={producto.loading}
            />
            {productoEliminar.show ? (
                <ModalEliminar 
                    setModal={setProductoEliminar} 
                    modal={productoEliminar}
                    reload={reload}/>
            ) : null}
        </div>
    );
};

export default HomePage;