import * as React from 'react';
import { Link } from 'app/shared/components/Link';

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
            <div className="header bg-primary mb-3">
                <div className="container-fluid">
                    <div className="header-body">
                        <div className="row align-items-center py-3">
                            <div className="col-lg-6 col-7">
                                <h6 className="h2 text-white d-inline-block mb-0">{nombrePage}</h6>
                                <nav aria-label="breadcrumb" className="d-none d-md-inline-block ml-md-4">
                                    <ol className="breadcrumb breadcrumb-links breadcrumb-dark m-0">
                                        {
                                            rutas.map((ruta, inde) => (
                                                <li className="breadcrumb-item" key={inde} >
                                                    <Link to={ruta.path}>
                                                        <i className={ruta.icon}>{ruta.nombre}</i>
                                                    </Link>
                                                </li>
                                            ))
                                        }
                                    </ol>
                                </nav>
                            </div>
                            <div className="col-lg-6 col-5 text-right">
                                <a href="#" className="btn btn-sm btn-neutral">New</a>
                                <a href="#" className="btn btn-sm btn-neutral">Filters</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BreadCrump