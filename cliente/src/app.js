import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import './app.css';
import ProductForm from "./components/product-form";
import ProductsList from "./components/products-list";
import { history } from "./store";

const App = () => {
    return <ConnectedRouter history={history}>
        <main className="container">
            <Switch>
                <Route path="/agregar">
                    <ProductForm />
                </Route>
                <Route path="/editar/:codigo">
                    <ProductForm />
                </Route>
                <Route path="/" exact>
                    <div>
                        <Link to="/agregar">Agregar</Link>
                        <ProductsList />
                    </div>
                </Route>
            </Switch>
        </main>
    </ConnectedRouter>
}

export default App;