import React from 'react';
import PropTypes from 'prop-types';
import { Button, Col, Divider, message, Row, Typography } from 'antd';
import styled from 'styled-components';
import ProductInCartModal from 'features/Cart/Components/ProductInCartModal';
import NotProductInCartModal from 'features/Cart/Components/NotProductInCartModal';
import { DollarOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { switchCartModal, switchLoginModal } from 'app/modalSlice';
import { history } from 'App';
import { checkOut } from 'features/Cart/cartSlice';
import { useLocation } from 'react-router';

CartModal.propTypes = {
    cartItem: PropTypes.array,
    totalPrice: PropTypes.number,
};
CartModal.defaultPropTypes = {
    cartItem: [],
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
    max-height:250px;
    overflow:auto;
    padding:0 2rem;
    min-width:320px;
`;



function CartModal({ cartItem, totalPrice, isAuth }) {

    const dispatch = useDispatch();

    const location = useLocation();

    const handleViewCart = () => {
        const action = switchCartModal(false);
        dispatch(action);
        history.push('/cart');
    }

    const handleCheckOut = () => {
        dispatch(switchCartModal(false));

        if (!isAuth) {
            dispatch(switchLoginModal(true));
            message.warning("Please login to check out");
            return;
        }

        history.push('/cart/checkout');
    }


    return (
        <div>
            {/* Product */}
            {cartItem.length < 1 ? <NotProductInCartModal /> : <div>
                <WrapperProduct>
                    {
                        cartItem?.map(item => <ProductInCartModal product={item} key={item._id} />)
                    }

                </WrapperProduct>
                <DividerStyled />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography.Text strong={true}>Total:</Typography.Text>
                    <TotalPriceStyled><DollarOutlined /> {totalPrice}</TotalPriceStyled>
                </div>
                <Row justify="space-between" gutter={[10, 10]}>
                    <Col span={12}>
                        <ButtonStyled
                            onClick={handleViewCart}
                            bgcolor="#000">
                            VIEW CART
                        </ButtonStyled>
                    </Col>
                    <Col span={12}>
                        <ButtonStyled
                            onClick={handleCheckOut}
                            bgcolor="#969696" >
                            CHECK OUT
                        </ButtonStyled>
                    </Col>
                </Row>
            </div>}

            <NoteStyled>FREE SHIPPING ON ALL ORDERS OVER $75</NoteStyled>
        </div >
    );
}

export default CartModal;