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

     & .totalCategory{
         width:25px;
         height:25px;
         border-radius:50%;
         background:#f1f1f1;
         text-align:center;
         font-size:12px;
         line-height:25px;
     }
    };

`;

const CategoryStyled = styled.div`
    margin-bottom:2.5rem;
`;


function Category({ category }) {
    return (
        <CategoryStyled>
            <DeliverTitle title={category.name} />
            <ListCategoryStyled>
                <li className="item">
                    <span>{category.name}</span>
                    <span className='totalCategory'>{category.total}</span>
                </li>
            </ListCategoryStyled>
        </CategoryStyled>
    );
}

export default Category;