import React from 'react';
import PropTypes from 'prop-types';

import { Col, Row } from 'antd';

import Product from '../Product';
import styled from 'styled-components';


ProductList.propTypes = {
    products: PropTypes.array
};

ProductList.defaultProps = {
    products: []
};

const ProductListStyled = styled.div``;

function ProductList({ products }) {
    return (
        <ProductListStyled>
            <Row gutter={[20, 48]}>
                {products.map(product =>
                    <Col key={product._id} sm={{ span: 24 }} md={{ span: 12 }} xs={{ span: 24 }} lg={{ span: 6 }}>
                        <Product product={product} />
                    </Col>
                )}
            </Row >
        </ProductListStyled>
    );
}

export default ProductList;