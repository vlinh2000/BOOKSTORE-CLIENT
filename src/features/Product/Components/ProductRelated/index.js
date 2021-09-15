import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import { Col, Divider, Row } from 'antd';

import Product from '../Product';

ProductRelated.propTypes = {
    products: PropTypes.array
};

ProductRelated.defaultProps = {
    products: []
};

const Wrapper = styled.div`
    line-height:20px;
    display:flex;
    flex-direction:column;
    align-items:center;
    `;

const TitleStyled = styled.div`

    font-size:20px;
    font-weight:500;
    text-transform:uppercase;
    margin:2rem 0 3rem 0;
    
    &:after{
        content: ' ';
        display:block;
        height:10px;
        border-bottom:3px solid #9387d9;
        width:50px;
        margin:0 auto;
    }

`;

function ProductRelated({ products }) {
    return (
        <Wrapper>
            <Divider />
            <TitleStyled>Related Products</TitleStyled>
            <Row gutter={[20, 10]}>
                {products?.map(product => (<Col key={product.id} span={6}>
                    <Product product={product} />
                </Col>))}
            </Row >
            <Divider />
        </Wrapper>
    );
}

export default ProductRelated;