
import {Productos} from '../models/Producto';
import {axiosIntance} from '../../../core/config/AxiosConfig';

export const getCategorias = async () => {
    return await axiosIntance.get('/categorias/');
};

export const getDetalleProducto = async (id: string) => {
    return await axiosIntance.get(`/productos/${id}/`);
};

export const createDetalleProducto = async (payload: Productos) => {
    return await  axiosIntance.post('/productos/', payload);
};

export const updateDetalleProducto = async (id:string, payload: Productos) => {
    return await  axiosIntance.put(`/productos/${id}/`, payload);
};

export const deleteDetalleProducto = async (id:string) => {
    return await  axiosIntance.delete(`/productos/${id}/`);
};