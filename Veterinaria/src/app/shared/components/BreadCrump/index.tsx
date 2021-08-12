import * as React from 'react';
import { Link } from 'app/shared/components/Link';
import {Breadcrumbs, Link as LinkMaterial} from "@material-ui/core";

export interface RutasBreadCrump {
    nombre: string
    icon: string
    path: string
}


 interface BreadCrumpProps {
    nombrePage: string
    rutas: RutasBreadCrump[]
}

const BreadCrump: React.FC<BreadCrumpProps> = ({nombrePage, rutas}) => {
    return (
        <>
            <Breadcrumbs aria-label="breadcrumb">
                {
                    rutas.map((ruta, inde) => (
                        <Link to={ruta.path}>
                            <i className={ruta.icon}>{ruta.nombre}</i>
                        </Link>
                    ))
                }
            </Breadcrumbs>
        </>
    )
}

export default BreadCrump