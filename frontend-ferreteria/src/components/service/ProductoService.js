import { BaseUrl, GetRequest, PostRequest, PutRequest, DeleteRequest } from "../request/Request";

const ListarProducto = async () => {
    return await GetRequest(`${BaseUrl}producto`, {});
}

const ListarCodigo = async () => {
    return await GetRequest(`${BaseUrl}codigoproducto`, {});
}

const ListarProductoCodigo = async (codigo) => {
    return await GetRequest(`${BaseUrl}producto/codigo?codigo=${codigo}`, {});
}

const ListarProductoNombre = async (nombre) => {
    return await GetRequest(`${BaseUrl}producto/nombre?nombre=${nombre}`, {});
}

const RegistrarProducto = async (producto) => {
    return await PostRequest(`${BaseUrl}producto`, producto);
}

const EditarProducto = async (producto) => {
    return await PutRequest(`${BaseUrl}producto`, producto);
}

const EliminarProducto = async (producto) => {
    return await DeleteRequest(`${BaseUrl}producto`, producto);
}

export {
    ListarProducto,
    ListarCodigo,
    ListarProductoCodigo,
    ListarProductoNombre,
    RegistrarProducto,
    EditarProducto,
    EliminarProducto,
};