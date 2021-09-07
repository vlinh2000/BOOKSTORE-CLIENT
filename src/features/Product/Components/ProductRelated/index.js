import React from 'react';
import PropTypes from 'prop-types';
import Product from '../Product';
import ProductList from '../ProductList';
import styled from 'styled-components';
import { Col, Divider, Row } from 'antd';

ProductRelated.propTypes = {

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

function ProductRelated(props) {
    return (
        <Wrapper>
            <Divider />
            <TitleStyled>Related Products</TitleStyled>
            <Row gutter={[20, 10]}>
                <Col span={6}>
                    <Product />
                </Col>
                <Col span={6}>
                    <Product />
                </Col>
                <Col span={6}>
                    <Product />
                </Col>
                <Col span={6}>
                    <Product />
                </Col>
            </Row >
            <Divider />
        </Wrapper>
    );
}

export default ProductRelated;