import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import { Col, Row } from 'antd';

import Product from '../Product';
import { TitleStyled } from 'assets/styles/globalStyle'

ProductRelated.propTypes = {
    products: PropTypes.array
};

ProductRelated.defaultProps = {
    products: []
};

const Wrapper = styled.div`
    padding:0 3rem;
    margin-bottom:3rem;
    margin-left:2rem;
    `;

function ProductRelated({ products }) {
    return (<>{
        products.length > 0 &&
        <Wrapper>
            <TitleStyled>Related Products</TitleStyled>
            <Row justify="space-around">
                {products?.map(product => (<Col span={6} key={product.id} >
                    <Product product={product} />
                </Col>))}
            </Row >
        </Wrapper>
    }
    </>);
}

export default ProductRelated;