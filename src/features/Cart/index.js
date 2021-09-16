import React from 'react';
import { Empty, message, Tabs } from 'antd';
import ShoppingCart from './Components/ShoppingCart';
import Checkout from './Components/Checkout';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router';
import NotFound from 'components/NotFound';


const Wrapper = styled.div`
    margin:2rem 0;
    min-height:35vh;
`;


const TabsStyled = styled(Tabs)`

    color:#000;
    border-color:#000;
    letter-spacing:0.5px;

    .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn{
        color:#9387d9;
        font-weight:bold;
    }

    `;


function Cart(props) {

    const { cartItem } = useSelector(state => state.cart);

    const { isAuth } = useSelector(state => state.user.currentUser);

    const { screenDefault } = useSelector(state => state.cart);

    const match = useRouteMatch();

    return (
        <Wrapper>
            <Switch>
                <Route exact path={`${match.url}`} component={ShoppingCart} />
                <Route path={`${match.url}/checkout`}
                    render={() => {
                        if (!isAuth) return <Redirect to="/cart" />
                        return <Checkout />
                    }} />
                <Route component={NotFound} />
            </Switch>

            {/* <TabsStyled
                type="card"
                defaultActiveKey={!screenDefault ? 'cartScreen' : 'checkoutScreen'}
                centered={true}>
                <Tabs.TabPane
                    tab={`SHOPPING CART(${2})`}
                    key='cartScreen'>
                    {cartItem.length < 1 ? <Empty /> : <ShoppingCart />}
                </Tabs.TabPane>
                {isAuth && cartItem.length > 0 && <Tabs.TabPane
                    tab="CHECKOUT"
                    key='checkoutScreen'>
                    <Checkout />
                </Tabs.TabPane>}

            </TabsStyled> */}
        </Wrapper>
    );
}

export default Cart;