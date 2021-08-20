import {
  AGREGAR_PRODUCTO, EDITAR_PRODUCTO,
  ELIMINAR_PRODUCTO,
  LISTAR_PRODUCTOS,
  TiposAccionesProducto,
} from './ProductosTiposAcciones';
import { Producto } from 'app/feature/Producto/models/Producto';
import { ProductoRepositorio } from 'app/core/api/productos.repositorio';
import {Productos} from '../../../../feature/Productos/models/Producto';

export function listarProductos(
  productos: Array<Producto>,
  cantidadTotalProducto: number
): TiposAccionesProducto {
  return {
    type: LISTAR_PRODUCTOS,
    payload: productos,
    cantidadTotalProducto,
  };
}

export function agregarNuevoProducto(
  producto: Producto
): TiposAccionesProducto {
  return {
    type: AGREGAR_PRODUCTO,
    payload: producto,
  };
}

export function eliminarProducto(producto: Producto): TiposAccionesProducto {
  return {
    type: ELIMINAR_PRODUCTO,
    payload: producto,
  };
}

export function listarProductosAsync(numeroPagina: number) {
  return function (dispacth: any) {
    ProductoRepositorio.consultarPorPagina(
      numeroPagina
    ).then((respuesta: any) =>
      dispacth(
        listarProductos(respuesta.data.articles, respuesta.data.articlesCount)
      )
    );
  };
}

export function EditarProducto (producto: Productos) {
  return {
    type: EDITAR_PRODUCTO,
    payload: producto,
  };
}
