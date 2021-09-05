import React from 'react';
import PropTypes from 'prop-types';
import { Button, Col, Divider, Modal, Row, Tooltip, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { DeleteOutlined } from '@ant-design/icons';
import styled from 'styled-components';

CartModal.propTypes = {

};

const ProductInCartStyled = styled.div`
    margin-bottom:0.5rem;
`;

const LinkSyled = styled(Link)`
    font-size:16px;
    font-weight:500;
    letter-spacing:0.5px;
    color:#000;

    &:hover{
        color:#9387d9 ;
    }
`;

const PriceWrapperStyled = styled.div`
    color:#969696;
    line-height:25px;
    font-size:14px;
    font-weight:bold;
    letter-spacing:1px;
`;

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



function CartModal(props) {
    return (
        <Modal
            visible={true}
            width={500}
            footer={false}
            closable={false}
            style={{ transform: 'translate(80%,5%)' }}>
            {/* Product */}
            <WrapperProduct>
                <ProductInCartStyled>
                    <Row gutter={[0, 5]}>
                        <Col span={6}>
                            <img width="80px" height="90px" src="https://wpbingosite.com/wordpress/tikie/wp-content/uploads/2020/12/Image-70.jpg" alt="product" />
                        </Col>
                        <Col span={17}>
                            <LinkSyled to="#">A Tale of Two Cities</LinkSyled>
                            <PriceWrapperStyled>
                                <div> <span >Qty: </span><span>{2}</span> </div>
                                <div>${45}</div>
                            </PriceWrapperStyled>
                        </Col>
                        <Col span={1}>
                            <Tooltip title="Remove this item"> <Button icon={<DeleteOutlined />}></Button></Tooltip>
                        </Col>
                    </Row>
                </ProductInCartStyled>
            </WrapperProduct>
            {/* *** */}
            <DividerStyled />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography.Text strong={true}>Total:</Typography.Text>
                <TotalPriceStyled>$ 12000</TotalPriceStyled>

            </div>
            <Row justify="space-between" gutter={[10, 10]}>
                <Col span={12}> <ButtonStyled bgcolor="#000">VIEW CART</ButtonStyled></Col>
                <Col span={12}> <ButtonStyled bgcolor="#969696" >CHECK OUT</ButtonStyled></Col>
            </Row>
            <NoteStyled>FREE SHIPPING ON ALL ORDERS OVER $75</NoteStyled>
        </Modal >
    );
}

export default CartModal;