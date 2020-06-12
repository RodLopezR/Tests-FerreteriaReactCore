import { BaseUrl, GetRequest, PostRequest } from "../request/Request";

const ListarCategorias = async () => {
    return await GetRequest(`${BaseUrl}categoria`, {});
}
 
const Registrar = async (categoria) => {
    return await PostRequest(`${BaseUrl}categoria`, categoria);
}

export {
    ListarCategorias,
    Registrar,
};