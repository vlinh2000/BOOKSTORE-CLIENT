import React from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router';
import { useSelector } from 'react-redux';

import NotFound from 'components/NotFound';
import CheckoutPage from './pages/CheckoutPage';
import CartPage from './pages/CartPage';



function Cart(props) {

    const { isAuth } = useSelector(state => state.user.currentUser);
    const match = useRouteMatch();

    return (
        <Switch>
            <Route exact path={`${match.url}`} component={CartPage} />
            <Route path={`${match.url}/checkout`}
                render={() => {
                    if (!isAuth) return <Redirect to="/cart" />
                    return <CheckoutPage />
                }} />
            <Route component={NotFound} />
        </Switch>
    );
}

export default Cart;