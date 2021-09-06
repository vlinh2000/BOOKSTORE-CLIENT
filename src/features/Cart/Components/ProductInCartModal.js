import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button, Col, Row, Tooltip } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

ProductInCartModal.propTypes = {
    book: PropTypes.object
};
ProductInCartModal.defaultProps = {
    book: {
        image: 'https://wpbingosite.com/wordpress/tikie/wp-content/uploads/2020/12/Image-70.jpg',
        name: 'A Tale of Two Cities',
        num: 2,
        price: 45
    }
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



function ProductInCartModal({ book }) {

    const handleRemove = (id) => {
        console.log(id);
    }

    return (

        <ProductInCartStyled>
            <Row gutter={[0, 5]}>
                <Col span={6}>
                    <img width="50px" height="75px" src={book.image} alt="product" />
                </Col>
                <Col span={17}>
                    <LinkSyled to="#">{book.name}</LinkSyled>
                    <PriceWrapperStyled>
                        <div> <span >Qty: </span><span>{book.num}</span> </div>
                        <div>${book.price}</div>
                    </PriceWrapperStyled>
                </Col>
                <Col span={1}>
                    <Tooltip title="Remove this item"> <Button onClick={() => handleRemove(book.id)} icon={<DeleteOutlined />}></Button></Tooltip>
                </Col>
            </Row>
        </ProductInCartStyled>

    );
}

export default ProductInCartModal;