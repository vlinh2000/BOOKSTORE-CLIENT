import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import InputField from 'custom-fields/InputFields';
import { Col, Row, Form, Divider, Button } from 'antd';
import { useForm } from 'react-hook-form';
import { SaveOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';

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

    const { control, handleSubmit } = useForm();

    const { user: { name, address, phoneNumber } } = useSelector(state => state.user.currentUser);

    const onSubmit = values => {
        console.log(values)
    }

    console.log({ name, address, phoneNumber })

    return (
        <Wrapper>
            <Row justify="center" gutter={[100, 0]} >
                <Col span={8}>
                    <PlaceOrderStyled>
                        <p>THÔNG TIN KHÁCH HÀNG</p>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <InputField
                                name="name"
                                placeholder="Họ tên"
                                value={name}
                                control={control} />
                            <InputField
                                name="phoneNumber"
                                placeholder="Số điện thoại"
                                value={phoneNumber}
                                control={control} />

                            <InputField
                                name="email"
                                placeholder="Email"
                                control={control} />
                            <InputField
                                name="address"
                                placeholder="Địa chỉ nhận hàng"
                                value={address}
                                control={control} />
                            <Form.Item>
                                <Button icon={<SaveOutlined />}>Save</Button>
                            </Form.Item>
                        </form>
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