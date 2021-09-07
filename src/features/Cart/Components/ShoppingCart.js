import React from 'react';
import PropTypes from 'prop-types';
import { columnShoppingCartTab } from 'constants/Global';
import { Checkbox, Col, Row, Table, Radio, Space } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import styled from 'styled-components';

ShoppingCart.propTypes = {

};


function ShoppingCart(props) {

    const dataSource = [
        {
            key: '1',
            product: 'a',
            price: 32,
            quantity: 10,
            subtotal: 19000,
            action: { DeleteOutlined }
        }
    ];


    return (
        <div>
            <Row justify='space-around' >
                <Col span={14}>
                    <Table columns={columnShoppingCartTab} dataSource={dataSource} pagination={false} />
                </Col>
                <Col span={6}>
                    <div>
                        <div>CART TOTALS</div>
                        <div>
                            <Row>
                                <Col span={12}>Subtotal</Col>
                                <Col span={12}>
                                    <div>$390.00</div>
                                    <Radio.Group >
                                        <Space direction="vertical">
                                            <Radio value={1}>Free shipping</Radio>
                                            <Radio value={2}>Flat rate</Radio>
                                        </Space>
                                    </Radio.Group>

                                </Col>
                            </Row>
                            <Row>
                                <Col span={12}>Shipping</Col>
                                <Col span={12}>
                                    <div>Shipping options will be update during checkout.</div>
                                    <div>Calculate shipping</div>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={12}>Total</Col>
                                <Col span={12}>$390.00</Col>
                            </Row>
                        </div>
                    </div>
                </Col>

            </Row>
        </div>
    );
}

export default ShoppingCart;