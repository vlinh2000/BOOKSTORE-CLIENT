import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import InputField from 'custom-fields/InputFields';
import { Col, Row, Form, Typography, Divider, Button } from 'antd';

Checkout.propTypes = {

};

const Wrapper = styled.div`
    margin:2rem auto;
    
    `;

const ButtonStyled = styled(Button)`

    margin-top:1rem;
    height:50px;
    font-size:12px;
    font-weight:500;
    background:#000;
    color:#EEE;

    &:hover{
        border:none;
        color:#EEE;
        background:#9387d9 ;

    }

    `;

const ProductStyled = styled.div`

    display:flex;
    justify-content:space-between;

`;

const DivStyled = styled.div`

    display:flex;
    justify-content:space-between;
    color:#969696;
    font-weight:500;
    
    & div{
        color:#000;
        font-weight:500;
    }
`;

const PlaceOrderStyled = styled.div`

    padding:2rem 2rem;
    border:1px solid #ccc;
    height:100%;

`;


function Checkout(props) {
    return (
        <Wrapper>
            <Row justify="center" gutter={[100, 0]} >
                <Col span={8}>
                    <PlaceOrderStyled>
                        <p>THÔNG TIN KHÁCH HÀNG</p>
                        <Form>
                            <InputField
                                name="name"
                                placeholder="Họ tên" />
                            <InputField
                                name="phoneNumber"
                                placeholder="Số điện thoại" />
                            <InputField
                                name="email"
                                placeholder="Email" />
                            <InputField
                                name="address"
                                placeholder="Địa chỉ nhận hàng" />
                        </Form>
                    </PlaceOrderStyled>
                </Col>
                <Col span={8}>
                    <PlaceOrderStyled>
                        <p>SẢN PHẨM</p>
                        <ProductStyled>
                            <div style={{ display: 'flex' }}>
                                <img width="50px" height="80px" src="https://wpbingosite.com/wordpress/tikie/wp-content/uploads/2020/12/Image-11.jpg" alt="bookImage" ></img>
                                <div style={{ marginLeft: '1rem' }}>
                                    <div>A PROMISED LAND</div>
                                    <span>Qty:</span> <span>1</span>
                                </div>
                            </div>
                            <span>$90</span>
                        </ProductStyled>
                        <Divider />
                        <DivStyled>
                            <span>Subtotal</span>
                            <div>$390</div>
                        </DivStyled>
                        <Divider />
                        <DivStyled>
                            <span>Shipping</span>
                            <div>Free shipping</div>
                        </DivStyled>
                        <Divider />
                        <DivStyled>
                            <span>Total</span>
                            <span style={{ fontSize: 25, fontWeight: 'bold', color: "#000" }}>$390</span>
                        </DivStyled>
                        <div><ButtonStyled block={true}>PLACE ORDER</ButtonStyled></div>
                    </PlaceOrderStyled>

                </Col>
            </Row>
        </Wrapper>
    );
}

export default Checkout;