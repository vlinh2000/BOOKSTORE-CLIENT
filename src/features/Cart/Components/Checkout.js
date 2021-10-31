import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import InputField from 'custom-fields/InputFields';
import { Col, Row, Form, Divider, Button, Steps } from 'antd';
import { useForm } from 'react-hook-form';
import { DollarCircleOutlined, DollarCircleTwoTone, DollarOutlined, SaveOutlined, UserOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';

Checkout.propTypes = {

};

const Wrapper = styled.div`
    margin:2rem auto;
    border:1px solid #ccc;
    width:60%;
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
    font-size:12px;
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
    height:100%;

`;


const ListProduct = styled.div`
    max-height:200px;
    overflow-y:auto;
    padding:0 1rem;
`;

function Checkout(props) {

    const { control, handleSubmit } = useForm();

    const { user: { name, address, phoneNumber } } = useSelector(state => state.user.currentUser);

    const { cartItem, totalPrice } = useSelector(state => state.cart);

    const onSubmit = values => {
        console.log(values)
    }


    return (
        <div>

            <Steps>
                <Steps.Step
                    status="process"
                    title="Login" />

                <Steps.Step status="wait" title="Check infomation" icon={<UserOutlined />} />
                <Steps.Step status="wait" title="Pay" icon={<UserOutlined />} />
            </Steps>
            <Wrapper>
                <Row justify="space-around" >
                    <Col span={12}>

                    </Col>
                    <Col span={12}>
                        <PlaceOrderStyled>
                            <p>PRODUCT</p>
                            <ListProduct>
                                {
                                    cartItem.map(item => (<ProductStyled key={item._id}>
                                        <div style={{ display: 'flex' }}>
                                            <img
                                                width="50px"
                                                height="60px"
                                                src={item.image}
                                                alt="bookImage" />
                                            <div style={{ marginLeft: '1rem' }}>
                                                <div>{item.name}</div>
                                                <span>Qty:</span> <span>{item.quantity}</span>
                                                <div><span>Price:</span> {item.price}</div>
                                            </div>
                                        </div>
                                        <span><DollarCircleOutlined />{item.subTotal}</span>
                                    </ProductStyled>))

                                }

                            </ListProduct>

                            <Divider />
                            <DivStyled>
                                <span>Subtotal</span>
                                <div><DollarOutlined /> {totalPrice}</div>
                            </DivStyled>
                            <Divider />
                            <DivStyled>
                                <span>Shipping</span>
                                <div>Free shipping</div>
                            </DivStyled>
                            <Divider />
                            <DivStyled>
                                <span>Total</span>
                                <span style={{ fontSize: 25, fontWeight: 'bold', color: "#000" }}><DollarOutlined /> {totalPrice}</span>
                            </DivStyled>
                            <div><ButtonStyled block={true}>PLACE ORDER</ButtonStyled></div>
                        </PlaceOrderStyled>

                    </Col>
                </Row>
            </Wrapper>
        </div>
    );
}

export default Checkout;