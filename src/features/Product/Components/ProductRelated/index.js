import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import { Col, Row } from 'antd';

import Product from '../Product';
import { TitleStyled } from 'assets/styles/globalStyle'
import { ArrowLeftOutlined, LeftCircleOutlined, RightCircleOutlined } from '@ant-design/icons';

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

const Slider = styled.div`
    display:flex;
    position:relative;
    .previous,.next{
        position:absolute;
        bottom:50%;
        z-index:1000;
        font-size:200%;
        cursor:pointer;
    }
    .previous{
        left:-60px;
    }
    .next{
        right:-50px;
    }

    .previous:checked ~ .s1{
        margin-left:-200px;
    }

`;

function ProductRelated({ products }) {
    return (<>{
        products.length > 0 &&
        <Wrapper>
            <TitleStyled>Related Products</TitleStyled>
            <Slider>
                <span className='previous'><LeftCircleOutlined /></span>
                <span className='next'><RightCircleOutlined /></span>
                {products?.map((product, index) => <Product key={product._id} className={`s${index}`} product={product} />)}

            </Slider>


            <Row gutter={[20, 48]}>
                {products?.map(product => (<Col span={6} key={product.id} >
                    <Product product={product} />
                </Col>))}
            </Row >
        </Wrapper>
    }
    </>);
}

export default ProductRelated;