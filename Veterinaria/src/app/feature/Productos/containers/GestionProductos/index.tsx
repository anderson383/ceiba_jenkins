import * as React from 'react';
import BreadCrump, {RutasBreadCrump} from '../../../../shared/components/BreadCrump'
import DataTable, {DataTableColumn} from "../../../../shared/components/DataTable";
export const GestionProductos = () => {
    let routes:Array<RutasBreadCrump> = [
        { nombre: "", path: "/", icon: "fas fa-home" },
        { nombre: "Productos", path: "/productos", icon: "" }
    ]
    let columns:Array<DataTableColumn> = [
        { nombre: 'Imagen', code: '' },
        { nombre: 'Nombre', code: 'nombre' },
        { nombre: 'Precio', code: '' },
        { nombre: 'Descuento', code: '' },
        { nombre: 'Precio total', code: '' },
        { nombre: 'Opciones', code: '' }
    ]
    return (
        <>
            <BreadCrump nombrePage="PRODUCTOS" rutas={routes} />
            <DataTable
                name="Listado de tus productos"
                endpoint="/productos/"
                columns={columns}
            />
        </>
    )
}