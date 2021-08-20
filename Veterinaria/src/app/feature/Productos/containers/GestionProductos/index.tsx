import * as Material from '@material-ui/core';
import * as PropTypes from 'prop-types';
import * as React from 'react';

import { AntTab, AntTabs, TabPanel, useStyles } from './styles';
import BreadCrump, {RutasBreadCrump} from '../../../../shared/components/BreadCrump';
import {FormGestionProductos} from '../../components/FormGestionProductos';
import {INITIAL_STATE_PRODUCTO} from '../../models/StateInitial';
import { PrevGestionProductos } from '../../components/PrevGestionProductos';
import {Productos} from '../../models/Producto';
import {getDetalleProducto} from '../../services/ProductosService';
import { useParams } from 'react-router-dom';


interface GestionProductosProps {
    producto: Productos
    EditarProducto: (producto:Productos) => void
}

interface ValidParams {
    id: string
}

export const GestionProductos:React.FC<GestionProductosProps> = ({EditarProducto, producto}) => {
    
    const classes = useStyles();

    const [value, setValue] = React.useState(0);

    const [loading, setLoading] = React.useState(true);

    const [routes, setRoutes] = React.useState<Array<RutasBreadCrump>>([
        { nombre: 'Home', path: '/', icon: 'fas fa-home' },
        { nombre: 'Productos', path: '/productos', icon: '' }
    ]);

    const { id } = useParams<ValidParams>();

    React.useEffect(() => {
        EditarProducto(INITIAL_STATE_PRODUCTO);
        let mounted = true;
        if(mounted) {
            if (id === 'añadir') {
                setRoutes(last => ([...last, { nombre: 'Nuevo producto', path: '/productos/añadir', icon: '' }]));
                setLoading(false);
            } else {
                setRoutes(last => ([...last, { nombre: 'Editar producto', path: '/productos/añadir', icon: '' }]));
                getDetalleProducto(id).then(response => {
                    EditarProducto(response.data);
                    setLoading(false);
                });
            }
        }
        return () => {
            mounted = false;
        };
    }, [id, EditarProducto]);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    return (
        <>
            <BreadCrump nombrePage={id === 'añadir' ? 'Nuevo producto' : 'Editar producto'} rutas={routes} />
            <Material.Card className={classes.cardContenedor}>
                <AntTabs value={value} onChange={handleChange}  aria-label="ant example">
                    <AntTab label="Configuración" />
                    <AntTab label="Vista previa" />
                </AntTabs>
                <Material.CardContent>
                    <TabPanel value={value} index={0}>
                        {
                            loading ? <>Cargando...</> : <FormGestionProductos changeTab={setValue} producto={producto} onSubmitPreview={EditarProducto}  />
                        }
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <PrevGestionProductos changeTab={setValue} producto={producto} />
                    </TabPanel>
                </Material.CardContent>
            </Material.Card>
        </>
    );
};

GestionProductos.propTypes = {
    producto: PropTypes.any.isRequired,
    EditarProducto: PropTypes.func.isRequired
};