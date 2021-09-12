import React from 'react';
import PropTypes from 'prop-types';
import Product from '../Product';
import { Col, Row } from 'antd';


ProductList.propTypes = {

};

function ProductList({ products }) {

    return (
        <div>
            <Row gutter={[48, 48]}>
                {products.map(product =>
                    <Col key={product.id} span={6}>
                        <Product product={product} />
                    </Col>

                )}
            </Row >
        </div>
    );
}

export default ProductList;