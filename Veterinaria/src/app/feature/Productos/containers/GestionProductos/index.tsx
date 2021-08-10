import * as React from 'react';
import BreadCrump, {RutasBreadCrump} from '../../../../shared/components/BreadCrump'
import DataTable from "../../../../shared/components/DataTable";
export const GestionProductos = () => {
    let routes:Array<RutasBreadCrump> = [
        { nombre: "", path: "/", icon: "fas fa-home" },
        { nombre: "Productos", path: "/productos", icon: "" }
    ]
    return (
        <>
            <BreadCrump nombrePage="PRODUCTOS" rutas={routes} />
            <DataTable
                name="Listado de tus productos"
                endpoint="/productos/"
            />
        </>
    )
}