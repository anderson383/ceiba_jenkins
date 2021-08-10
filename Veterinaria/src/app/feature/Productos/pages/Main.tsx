import * as React from 'react';
import { Layout } from 'app/shared/components/Layout';
import { RouteComponentProps } from 'react-router-dom';
import {ProveedorGestionProductos} from "../hoc/ProveedorGestionProductos";

const MainPage: React.FC<RouteComponentProps> = () => {
    return (
        <Layout title="Productos" description="Listado de productos a configurar" >
            <ProveedorGestionProductos />
        </Layout>
    )
}

MainPage.displayName = 'ProductosMainPage';

export default MainPage