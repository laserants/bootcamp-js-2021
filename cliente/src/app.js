import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import './app.css';
import { history } from "./store"
import ProductForm from "./components/product-form";
import ProductsList from "./components/products-list";

const App = () => {
    return <main className="container">
        <ConnectedRouter history={history}>
            <Switch>
                <Route path="/nuevo">
                    <ProductForm />
                </Route>
                <Route path="/editar/:codigo">
                    <ProductForm />
                </Route>
                <Route path="/">
                    <Link to="/nuevo">Agregar</Link>
                    <ProductsList />
                </Route>
            </Switch>
        </ConnectedRouter>
    </main>
}

export default App;