import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { LazyFallback } from 'app/shared/components/LazyFallback';

const MainPage = React.lazy(() => import('./pages/MainPage'));
const GestionPage = React.lazy(() => import('./pages/GestionPage'));

export const ProductosRouter = () => {
    return <React.Suspense fallback={<LazyFallback />} >
        <Switch>
            <Route path="/productos/:id" exact  component={GestionPage} />
            <Route path="/productos"  exact component={MainPage} />
        </Switch>
    </React.Suspense>;
};