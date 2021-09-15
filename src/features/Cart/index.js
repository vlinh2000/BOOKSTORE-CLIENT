import React from 'react';
import { message, Tabs } from 'antd';
import ShoppingCart from './Components/ShoppingCart';
import Checkout from './Components/Checkout';
import styled from 'styled-components';
import { useSelector } from 'react-redux';


const Wrapper = styled.div`
    margin:2rem 0;
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
    const { isAuth } = useSelector(state => state.user.currentUser);

    return (
        <Wrapper>
            <TabsStyled
                type="card"
                defaultActiveKey={0}
                centered={true}>
                <Tabs.TabPane
                    tab={`SHOPPING CART(${2})`}
                    key={0}>
                    <ShoppingCart />
                </Tabs.TabPane>
                {isAuth && <Tabs.TabPane
                    tab="CHECKOUT"
                    key={1}>
                    <Checkout />
                </Tabs.TabPane>}

            </TabsStyled>
        </Wrapper>
    );
}

export default Cart;