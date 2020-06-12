import React from 'react';
import { Switch, Router, Redirect } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/styles';
import { createBrowserHistory } from 'history';

import { Routes } from './app/Routes';
import theme from './theme';

import RouteLayout from './components/routelayout/RouteLayout';
import AppLayout from './components/layout/Main';

import HomePage from './pages/home/HomePage';
import ProductoPage from './pages/producto/ProductoPage';
import EdicionPage from './pages/edicion/EdicionPage';
import BuscarPage from './pages/buscar/BuscarPage';
import NotFoundPage from './pages/notfound/NotFoundPage';

import SnackView from './components/snackbar/SnackBar';

const App = () => (
    <ThemeProvider theme={theme}>
        <Router history={createBrowserHistory()}>
            <Switch>
                <RouteLayout component={HomePage} exact layout={AppLayout} path={Routes.Home} />
                <RouteLayout component={ProductoPage} exact layout={AppLayout} path={Routes.Producto} />
                <RouteLayout component={EdicionPage} exact layout={AppLayout} path={Routes.Edicion + ":id"} />
                <RouteLayout component={BuscarPage} exact layout={AppLayout} path={Routes.Buscar} />
                <RouteLayout component={NotFoundPage} exact layout={AppLayout} path={Routes.NotFound} />
                <Redirect to={Routes.NotFound} /> 
            </Switch>
            <SnackView/>
        </Router>
    </ThemeProvider>
);

export default App;
