import * as PropTypes from 'prop-types';
import * as React from 'react';
import * as StylesBread from './styles';
import {Breadcrumbs} from '@material-ui/core';
import { Link } from 'app/shared/components/Link';

export interface RutasBreadCrump {
    nombre: string
    icon: string
    path: string
}

interface BreadCrumpProps {
    nombrePage: string
    rutas: Array<RutasBreadCrump>
}

const BreadCrump: React.FC<BreadCrumpProps> = ({nombrePage, rutas}) => {
    const classes = StylesBread.useStyles();
    return (
        <>
            <div className={classes.row}>
                <StylesBread.TitlePage>{nombrePage} | </StylesBread.TitlePage>
                {/* <titlePage>Productos  |</titlePage> */}
                <Breadcrumbs aria-label="breadcrumb" className={classes.breadcrumb}>
                    {
                        rutas.map((ruta, inde) => (
                            <Link to={ruta.path} key={inde}>
                                <i className={ruta.icon}>{ruta.nombre}</i>
                            </Link>
                        ))
                    }
                </Breadcrumbs>
            </div>
            
        </>
    );
};

BreadCrump.propTypes = {
    nombrePage: PropTypes.string.isRequired,
    rutas: PropTypes.array.isRequired,
};

export default BreadCrump;