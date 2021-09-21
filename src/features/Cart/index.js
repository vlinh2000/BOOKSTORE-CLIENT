import React from 'react';
import { Empty, message, Tabs } from 'antd';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router';
import NotFound from 'components/NotFound';
import CheckoutPage from './pages/CheckoutPage';
import CartPage from './pages/CartPage';



function Cart(props) {

    const { cartItem } = useSelector(state => state.cart);

    const { isAuth } = useSelector(state => state.user.currentUser);

    const { screenDefault } = useSelector(state => state.cart);

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