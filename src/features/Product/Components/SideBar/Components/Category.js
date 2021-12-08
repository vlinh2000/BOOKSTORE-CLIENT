import React from 'react';
import PropTypes from 'prop-types';
import { Radio } from 'antd';
import styled from 'styled-components';
import DeliverTitle from './DeliverTitle';
import { useDispatch } from 'react-redux';
import { filterBy } from 'features/Product/productSlice';
Category.propTypes = {
    categories: PropTypes.array
};
Category.defaultProps = {
    categories: []
};

const ListCategoryStyled = styled.div`
    list-style:none;
    font-weight:400;
    margin-left:0.75rem;
`;

const RadioStyled = styled(Radio)`
    display:block;
    color:#969696 ;
    cursor:pointer;
    font-weight:500;
    letter-spacing:1px;
    margin-bottom:0.4rem;
    font-size:14px;

    &:hover,&:focus{
        color:#000!important;
        
    }

`;

const CategoryStyled = styled.div`
    margin-bottom:2.5rem;
`;


function Category({ categories }) {
    const dispatch = useDispatch()

    const handleChange = ({ target: { value } }) => {
        dispatch(filterBy({ categoryFilter: value }));
    }

    return <CategoryStyled>
        <DeliverTitle title='Category' />
        <ListCategoryStyled>
            <Radio.Group onChange={handleChange} defaultValue={-1}>
                <RadioStyled value={-1}>All</RadioStyled>
                {categories?.map(category =>
                    <RadioStyled
                        key={category._id}
                        value={category._id}
                        name={category._id}>{category.name}</RadioStyled>
                )}
            </Radio.Group>
        </ListCategoryStyled>
    </CategoryStyled>
}

export default Category;