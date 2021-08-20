import * as ProductoTiposAcciones   from '../../acciones/productos/ProductosTiposAcciones';
import {EstadoProductoVet} from '../../modelo/EstadoProductoVet';
import {INITIAL_STATE_PRODUCTO} from '../../../../feature/Productos/models/StateInitial';

export default function ( state = INITIAL_STATE_PRODUCTO, action: ProductoTiposAcciones.TiposAccionesProducto): EstadoProductoVet {
    switch (action.type) {
        case ProductoTiposAcciones.EDITAR_PRODUCTO: {
            const producto = action.payload;
            return {
                ...producto
            };
        }
        default: {
            return state;
        }
    }
}