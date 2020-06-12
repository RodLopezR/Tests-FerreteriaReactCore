import React, { useEffect, useState } from 'react';
import ProductoForm from '../../components/forms/NuevoProducto/NuevoProducto';

import { ListarCategorias } from '../../components/service/CategoriaService';
import { ListarCodigo } from '../../components/service/ProductoService';

const ProductoPage = () => {

    const [form, setForm] = useState({ loading: true, error: false, cats: [], codigo: "" });
    
    useEffect(() => {
        async function LoadData(){
            try{
                const lCategorias = await ListarCategorias();
                const sCodigo = await ListarCodigo();
    
                setForm({ loading: false, error: false, cats: lCategorias, codigo: sCodigo });
            }catch(ex){
                setForm({ loading: false, error: true, cats: [], codigo: "" });
            }
        }
        LoadData();
    }, []);

    return (
        form.loading ? (
            <div>Cargando</div>
        ) :  ( form.error ? (
            <div>Ocurrió un error al cargar el formulario</div>
        ) : <ProductoForm cats={form.cats} codigo={form.codigo}/> )
    );
};

export default ProductoPage;