import * as ProductoTiposAcciones   from '../../acciones/productos/ProductosTiposAcciones';
import {EstadoProductoVet} from '../../modelo/EstadoProductoVet';
import {INITIAL_STATE_PRODUCTO} from '../../../../feature/Productos/models/StateInitial';

export default function ( state = INITIAL_STATE_PRODUCTO, action: ProductoTiposAcciones.TiposAccionesProducto): EstadoProductoVet {
    const cases:any = {
        [ProductoTiposAcciones.EDITAR_PRODUCTO]: () => {
            const producto = action.payload;
            return { ...producto };
        }
    };
    return cases[action.type] ? cases[action.type]() : state;
}