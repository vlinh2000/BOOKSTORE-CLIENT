import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button, Col, message, Row, Tooltip } from 'antd';
import { DeleteOutlined, DollarOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { removeItemInCart } from '../cartSlice';
import { useDispatch } from 'react-redux';

ProductInCartModal.propTypes = {
    product: PropTypes.object
};
ProductInCartModal.defaultProps = {
    product: {
        image: '',
        name: '',
        quantity: 0,
        price: 0
    }
};

const ProductInCartStyled = styled.div`
    margin-bottom:0.5rem;
`;

const TitleSyled = styled.div`
    font-size:12px;
    font-weight:500;
    letter-spacing:0.5px;
    color:#000;

    &:hover{
        color:#9387d9 ;
    }
`;

const PriceWrapperStyled = styled.div`
    color:#969696;
    line-height:20px;
    font-size:11px;
    font-weight:bold;
    letter-spacing:1px;
`;



function ProductInCartModal({ product }) {

    const dispatch = useDispatch()

    const handleRemove = async (id) => {
        const action = removeItemInCart({ id });
        await dispatch(action);
        message.success("Remove item successfully");
    }

    return (

        <ProductInCartStyled>
            <Row gutter={[0, 5]}>
                <Col span={6}>
                    <img width="50px" height="60px" src={product.image} alt="product" />
                </Col>
                <Col span={17}>
                    <TitleSyled >{product.name}</TitleSyled>
                    <PriceWrapperStyled>
                        <div> <span >Qty: </span><span>{product.quantity}</span> </div>
                        <div><DollarOutlined /> {product.price} /1</div>
                    </PriceWrapperStyled>
                </Col>
                <Col span={1}>
                    <Tooltip
                        title="Remove this item">
                        <Button
                            onClick={() => handleRemove(product._id)}
                            icon={<DeleteOutlined />} />
                    </Tooltip>
                </Col>
            </Row>
        </ProductInCartStyled>

    );
}

export default ProductInCartModal;