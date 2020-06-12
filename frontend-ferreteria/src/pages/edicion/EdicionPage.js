import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import ProductoForm from '../../components/forms/EditarProducto/EditarProducto';

import { ListarCategorias } from '../../components/service/CategoriaService';
import { ListarProductoCodigo } from '../../components/service/ProductoService';

const EdicionPage = () => {

    let { id } = useParams();
    const [form, setForm] = useState({ loading: true, error: false, cats: [], producto: {} });
    
    useEffect(() => {
        async function LoadData(){
            try{
                const lCategorias = await ListarCategorias();
                const lProducto = await ListarProductoCodigo(id);
                if(typeof lProducto === "object" && lProducto.length > 0){
                    setForm({ loading: false, error: false, cats: lCategorias, producto: lProducto[0] });
                }else{
                    setForm({ loading: false, error: true, cats: [], producto: {} });
                }
            }catch(ex){
                setForm({ loading: false, error: true, cats: [], codigo: "" });
            }
        }
        LoadData();
    }, [id]);

    return (
        form.loading ? (
            <div>Cargando</div>
        ) :  ( form.error ? (
            <div>Ocurrió un error al cargar el formulario</div>
        ) : <ProductoForm cats={form.cats} producto={form.producto}/> )
    );
};

export default EdicionPage;