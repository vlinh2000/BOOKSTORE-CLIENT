import React from 'react';
import styled from 'styled-components';

import { Col, Row, Table, Radio, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

import { columnShoppingCartTab } from 'constants/Global';


const Wrapper = styled.div`
    margin:2rem auto;
`;

const CartTotalStyled = styled.div`
    padding-bottom:2rem;
    background: #f6f6f6; 
`;

const TitleStyled = styled.div`

    padding:0.75rem 2rem;
    font-weight:bold;
    background:#f0f0f0;
    font-size:13px;
    
    `;

const RowStyled = styled(Row)`

    padding:0.75rem 2rem;
    font-size:13px;

`;

const FontStyled = styled.span`

    font-weight:bold;
    padding-bottom:1px;
    border-bottom: 2px solid #000;
    margin-top:1rem;
    display:inline-block;

`;

const ButtonStyled = styled(Button)`

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

function ShoppingCart(props) {

    const dataSource = [
        {
            key: '1',
            product: { bookImage: 'https://wpbingosite.com/wordpress/tikie/wp-content/uploads/2020/12/Image-29.jpg', bookName: 'Fiends In the Forest' },
            price: 32,
            quantity: 10,
            subtotal: 19000,
            action: { DeleteOutlined }
        },
        {
            key: '2',
            product: { bookImage: 'https://wpbingosite.com/wordpress/tikie/wp-content/uploads/2020/12/Image-29.jpg', bookName: 'Fiends In the Forest' },
            price: 32,
            quantity: 10,
            subtotal: 19000,
            action: { DeleteOutlined }
        }
    ];


    return (
        <Wrapper>
            <Row justify='space-around'  >
                <Col span={14}>
                    <Table columns={columnShoppingCartTab} dataSource={dataSource} pagination={false} />
                </Col>
                <Col span={6}>
                    <CartTotalStyled>
                        <TitleStyled>CART TOTALS</TitleStyled>
                        <div>
                            <RowStyled>
                                <Col span={12}>
                                    <div>Subtotal</div>
                                </Col>
                                <Col span={12}>
                                    <div style={{ fontSize: '16px', marginBottom: '0.75rem' }}>$390.00</div>
                                    <Radio.Group >
                                        <Radio value={1}>Free shipping</Radio>
                                        <Radio value={2}>Flat rate</Radio>
                                    </Radio.Group>

                                </Col>
                            </RowStyled>
                            <RowStyled>
                                <Col span={12}>Shipping</Col>
                                <Col span={12}>
                                    <div style={{ color: '#969696' }}>Shipping options will be update during checkout.</div>
                                    <FontStyled>Calculate shipping</FontStyled>
                                </Col>
                            </RowStyled>
                            <RowStyled>
                                <Col span={12}>Total</Col>
                                <Col span={12}>
                                    <div style={{ fontSize: '20px', fontWeight: 'bold' }}>$390.00</div>
                                </Col>
                            </RowStyled>
                            <Row justify="center">
                                <Col span={18}>
                                    <ButtonStyled style={{ width: '100%' }}>PROCEED TO CHECKOUT</ButtonStyled>
                                </Col>
                            </Row>
                        </div>
                    </CartTotalStyled>
                </Col>

            </Row>
        </Wrapper >
    );
}

export default ShoppingCart;