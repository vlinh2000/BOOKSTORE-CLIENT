import React from 'react';
import PropTypes from 'prop-types';
import { Divider, Typography } from 'antd';
import styled from 'styled-components';
import DeliverTitle from './DeliverTitle';
Category.propTypes = {
    category: PropTypes.object
};
Category.defaultProps = {
    category: { name: "Children's books", total: 8 }
};

const ListCategoryStyled = styled.ul`
    padding:0;
    list-style:none;
    font-weight:400;
    
    .item {
     color:#969696 ;
     display:flex;
     justify-content:space-between;   
     cursor:pointer;
     font-size:15px;
     font-weight:500;
     letter-spacing:1px;
     margin-bottom:0.5rem;
     
     &:hover{
         color:#000;
     }
    };

`;

const CategoryStyled = styled.div`
    margin-bottom:2.5rem;
`;


function Category({ categories }) {
    return <CategoryStyled>
        <DeliverTitle title='Category' />
        {categories?.map(category =>
            <ListCategoryStyled>
                <li className="item">
                    <span>{category.categoryName}</span>
                </li>
            </ListCategoryStyled>
        )}
    </CategoryStyled>
}

export default Category;