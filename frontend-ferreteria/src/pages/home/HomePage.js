import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import DynamicTable from '../../components/dynamictable/DynamicTable';
import ModalEliminar from '../../components/modaleliminar/ModalEliminar';
import { ListarProducto } from '../../components/service/ProductoService';

import { oDataDefault, oColumns } from './FormProps';
import { Routes } from '../../app/Routes';

const HomePage = () => {
    
    const history = useHistory();
    const [producto, setProducto] = useState(oDataDefault);
    const [productoEliminar, setProductoEliminar] = useState({ show: false, producto: {} });

    const oHeader = {
        title: "Ferretería Rodrigo",
        buttonText: "Nuevo Producto",
        actions: [
            { name: "Editar producto", action: (item) => {
                history.push(Routes.Edicion + item.codigo);
            }},
            { name: "Eliminar producto", action: (item) => {
                setProductoEliminar({ show: true, producto: item});
            }}
        ],
        reloadEvent: () => {
            history.push(Routes.Producto);
        },
        search: () => {
            history.push(Routes.Buscar);
        }
    };

    useEffect(() => {
        async function fetching (){
            try{
                const oData = await ListarProducto();
                setProducto({ loading: false, error: false, data: oData });
            }catch(ex){
                setProducto({ loading: false, error: true, data: [] });
            }
        }
        fetching();
    }, [])

    const reload = async () => {
        try{
            const oData = await ListarProducto();
            setProducto({ loading: false, error: false, data: oData });
        }catch(ex){
            setProducto({ loading: false, error: true, data: [] });
        }
    }

    return (
        <div>
            <DynamicTable 
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