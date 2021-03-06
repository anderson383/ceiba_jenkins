import { Producto } from 'app/feature/Producto/models/Producto';
import {Productos} from '../../../../feature/Productos/models/Producto';

export const LISTAR_PRODUCTOS = 'LISTAR_PRODUCTOS';
export const AGREGAR_PRODUCTO = 'AGREGAR_PRODUCTO';
export const ELIMINAR_PRODUCTO = 'ELIMINAR_PRODUCTO';
export const EDITAR_PRODUCTO = 'EDITAR_PRODUCTO';

interface AccionListarProductos {
  type: typeof LISTAR_PRODUCTOS;
  payload: Producto[];
  cantidadTotalProducto: number;
}

interface AccionAgregarProducto {
  type: typeof AGREGAR_PRODUCTO;
  payload: Producto;
}

interface AccionEliminarProducto {
  type: typeof ELIMINAR_PRODUCTO;
  payload: Producto;
}

export interface  AccionEditarProducto {
  type: typeof EDITAR_PRODUCTO,
  payload: Productos
}


export type TiposAccionesProducto =
  | AccionListarProductos
  | AccionAgregarProducto
  | AccionEliminarProducto
  | AccionEditarProducto;