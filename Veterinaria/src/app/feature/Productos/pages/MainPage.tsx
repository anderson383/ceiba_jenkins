import * as React from 'react';
import { Layout } from 'app/shared/components/Layout';
import {ProveedorListadoProductos} from '../hoc/ProveedorListadoProductos';
import { RouteComponentProps } from 'react-router-dom';

const MainPage: React.FC<RouteComponentProps> = () => {
    return (
        <Layout title="Productos" description="Listado de productos a configurar" >
            <ProveedorListadoProductos />
        </Layout>
    );
};
    
MainPage.displayName = 'ProductosMainPage';

export default MainPage;
