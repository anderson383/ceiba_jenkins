import * as React from 'react';
import { Layout } from 'app/shared/components/Layout';
import {ProveedorGestionProductos} from '../hoc/ProveedorGestionProductos';
import { RouteComponentProps } from 'react-router-dom';

const GestionPage: React.FC<RouteComponentProps> = () => {
    return (
        <Layout title="Gestion producto" description="Gestion de productos" >
            <ProveedorGestionProductos />
        </Layout>
    );
};
    
GestionPage.displayName = 'ProductosGestionPage';

export default GestionPage;
