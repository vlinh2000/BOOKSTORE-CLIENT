import React from 'react';
import PropTypes from 'prop-types';
import Product from '../Product';
import ProductList from '../ProductList';
import styled from 'styled-components';

ProductRelated.propTypes = {

};

const Wrapper = styled.div`
    line-height:20px;

`;

function ProductRelated(props) {
    return (
        <Wrapper>
            <ProductList />
        </Wrapper>
    );
}

export default ProductRelated;