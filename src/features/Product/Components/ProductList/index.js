import React from 'react';
import PropTypes from 'prop-types';
import Product from '../Product';
import { Col, Row } from 'antd';


ProductList.propTypes = {

};

function ProductList(props) {
    return (
        <div>
            <Row gutter={[48, 48]}>
                <Col span={6}>
                    <Product />
                </Col>
            </Row >
        </div>
    );
}

export default ProductList;