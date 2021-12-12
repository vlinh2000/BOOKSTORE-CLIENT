import React from 'react';
import PropTypes from 'prop-types';

import { Col, Row } from 'antd';

import Product from '../Product';


ProductList.propTypes = {
    products: PropTypes.array
};

ProductList.defaultProps = {
    products: []
};

function ProductList({ products }) {
    return (
        <div>
            <Row gutter={[20, 48]}>
                {products.map(product =>
                    <Col key={product._id} sm={{ span: 24 }} md={{ span: 12 }} xs={{ span: 24 }} lg={{ span: 6 }}>
                        <Product product={product} />
                    </Col>
                )}
            </Row >
        </div>
    );
}

export default ProductList;