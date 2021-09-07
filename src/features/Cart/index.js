import React from 'react';
import PropTypes from 'prop-types';
import { Tabs } from 'antd';
import ShoppingCart from './Components/ShoppingCart';
import Checkout from './Components/Checkout';
import styled from 'styled-components';

Cart.propTypes = {

};

const Wrapper = styled.div`

    margin:2rem 0;

`;


const TabsStyled = styled(Tabs)`

    color:#000;
    border-color:#000;
    letter-spacing:0.5px;

    .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn{
        color:#000;
        border:none;
    }

    `;


function Cart(props) {
    return (
        <Wrapper>
            <TabsStyled defaultActiveKey={0} centered={true}>
                <Tabs.TabPane
                    tab={`SHOPPING CART(${2})`}
                    key={0}>
                    <ShoppingCart />
                </Tabs.TabPane>
                <Tabs.TabPane
                    tab="CHECKOUT"
                    key={1}>
                    <Checkout />
                </Tabs.TabPane>
            </TabsStyled>
        </Wrapper>
    );
}

export default Cart;