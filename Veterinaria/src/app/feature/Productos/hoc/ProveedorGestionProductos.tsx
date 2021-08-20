import {EditarProducto} from '../../../core/redux/acciones/productos/ProductosAcciones';
import {EstadoGeneral} from '../../../core/redux/modelo/EstadoGeneral';
import {GestionProductos} from '../containers/GestionProductos';
import {connect} from 'react-redux';


const mapStateToProps = (state: EstadoGeneral) => {
    return {
        producto: state.productosVet
    };
};

export const ProveedorGestionProductos = connect(
    mapStateToProps,
    {
        EditarProducto
    }
)(GestionProductos);