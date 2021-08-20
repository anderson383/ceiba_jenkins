import { EstadoProducto } from './EstadoProducto';
import {EstadoProductoVet} from './EstadoProductoVet';

export interface EstadoGeneral {
  productos: EstadoProducto;
  productosVet: EstadoProductoVet
}
