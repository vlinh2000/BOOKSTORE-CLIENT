import React from 'react';
import { BrowserRouter, Switch, Route, useRouteMatch } from 'react-router-dom';
import MainPage from './pages/MainPage';
import NotFound from 'components/NotFound';
import ProductDetailPage from './pages/ProductDetailPage';


function ProductFeature(props) {
    const match = useRouteMatch();
    return (
        <div>
            <BrowserRouter>
                <Switch>
                    <Route exact path={match.url} component={MainPage} />

                    <Route path={`${match.url}/:bookId`} component={ProductDetailPage} />
                    <Route component={NotFound} />
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default ProductFeature;