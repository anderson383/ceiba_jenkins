
import {Productos} from './Producto';

export const INITIAL_STATE_PRODUCTO: Productos = {
    id: 0,
    nombre: '',
    imagen: '',
    descripcion: '',
    precio: 0,
    descuento: false,
    descuento_porcenaje: 0,
    envio_gratis: false,
    valor_envio: 0,
    fecha_inicio_descuento: null,
    fecha_final_descuento: null,
    categoria: '',
    categorias: {
        id: '',
        nombre: ''
    }
};