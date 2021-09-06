import React from 'react';
import PropTypes from 'prop-types';
import { Button, Col, Divider, Modal, Popover, Row, Typography } from 'antd';
import styled from 'styled-components';
import ProductInCartModal from 'features/Cart/Components/ProductInCartModal';
import NotProductInCartModal from 'features/Cart/Components/NotProductInCartModal';

CartModal.propTypes = {
    products: PropTypes.array,
    totalPrice: PropTypes.number,
};
CartModal.defaultPropTypes = {
    products: [],
    totalPrice: 0
};



const DividerStyled = styled(Divider)`
    height:10px;
    border-color:#000;
    `;

const ButtonStyled = styled(Button)`
    width:100%;
    min-height:40px;
    background:${props => props.bgcolor};
    color:#FFF;
    margin:1rem 0;
    
    &:hover{
        background:#9387d9 ;
        color:#FFF;
        border:none;
    }

`;

const NoteStyled = styled.div`

    font-size:10px;
    letter-spacing:1px;
    text-align:center;

`;

const TotalPriceStyled = styled.div`
    font-weight:500;
    font-size:25px;
`;

const WrapperProduct = styled.div`
    margin-top:2rem;
    max-height:300px;
    overflow:auto;
    padding:0 1.5rem;

`;



function CartModal({ products, totalPrice }) {
    return (
        <div>
            {/* Product */}
            {false ? <NotProductInCartModal /> : <div>
                <WrapperProduct>
                    <ProductInCartModal />
                </WrapperProduct>
                <DividerStyled />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography.Text strong={true}>Total:</Typography.Text>
                    <TotalPriceStyled>$ {totalPrice}</TotalPriceStyled>

                </div>
                <Row justify="space-between" gutter={[10, 10]}>
                    <Col span={12}> <ButtonStyled bgcolor="#000">VIEW CART</ButtonStyled></Col>
                    <Col span={12}> <ButtonStyled bgcolor="#969696" >CHECK OUT</ButtonStyled></Col>
                </Row>
            </div>}

            <NoteStyled>FREE SHIPPING ON ALL ORDERS OVER $75</NoteStyled>
        </div >
    );
}

export default CartModal;