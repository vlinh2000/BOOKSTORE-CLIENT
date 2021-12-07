import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from 'antd';
import styled from 'styled-components';
import DeliverTitle from './DeliverTitle';
import { useDispatch } from 'react-redux';
import { filterBy } from 'features/Product/productSlice';
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
    margin-left:0.75rem;
`;

const CheckboxStyled = styled(Checkbox)`
    color:#969696 ;
    cursor:pointer;
    font-weight:500;
    letter-spacing:1px;
    margin-bottom:0.3rem;
    font-size:13px;

    &:hover,&:focus{
        color:#000;
    }

`;

const CategoryStyled = styled.div`
    margin-bottom:2.5rem;
`;


function Category({ categories }) {

    const [cateChecked, setCateChecked] = React.useState({});

    const dispatch = useDispatch()

    const handleChange = ({ target: { name, checked } }) => {
        const newChecked = { ...cateChecked, [name]: checked }
        setCateChecked(newChecked);

        //handle category checked
        const conditionArray = [];
        for (let key in newChecked) {
            newChecked[key] && conditionArray.push(key);
        }

        //filter with this contition
        dispatch(filterBy({ categoryFilter: conditionArray }));
    }



    return <CategoryStyled>
        <DeliverTitle title='Category' />

        {categories?.map(category =>
            <ListCategoryStyled key={category._id}>
                <CheckboxStyled
                    onChange={handleChange}
                    name={category._id}>{category.name}</CheckboxStyled>
                {/* <li className="item">
                    <span>{category.categoryName}</span>
                </li> */}
            </ListCategoryStyled>
        )}
    </CategoryStyled>
}

export default Category;