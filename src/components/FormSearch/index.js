import React from 'react';
// import PropTypes from 'prop-types';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Divider, Input, Select, Form } from 'antd';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { searchValue } from 'features/Product/productSlice';

// FormSearch.propTypes = {

// };
const FormSearchStyled = styled(Form)`
    display:flex;
    align-items:center;

    padding: 0.3rem 1rem;
    border-radius:30px;
    background:#f1f1f1;

    .ant-btn-text:hover, .ant-btn-text:focus{
        color:#9387d9;
}

`;

const SortSelect = styled(Select)`
    min-width:150px;

    .ant-select-selection-item{
        font-weight: 500;
        font-size:12px;
    };

    .ant-select-selector:hover{
        color:#9387d9;
        transition: 0s;
    };
`;


function FormSearch(props) {

    const { categories } = useSelector(state => state.pageInfo);
    const [cateSelect, setCateSelect] = React.useState('-1');
    const [value, setValue] = React.useState('');

    const dispatch = useDispatch();

    const cateOptions = React.useMemo(() => {

        const options = categories.map(cate => ({ label: cate.categoryName, value: cate._id }));
        return [{ label: "All Categories", value: '-1' }, ...options];
    }, [categories]);

    //handle change select
    const handleSelect = value => {
        setCateSelect(value);
    }

    //handle onchange input
    const handleonChange = ({ target }) => {
        setValue(target.value);
    }

    //handle onSearch 


    //handle dispatch action to filter product
    const onSubmit = () => {
        const search = { category: cateSelect, value };
        const action = searchValue(search);
        dispatch(action);
        setCateSelect('-1');
        setValue('');
    }

    return (
        <FormSearchStyled
            onFinish={onSubmit}>
            <SortSelect
                name="category"
                options={cateOptions}
                defaultValue="-1"
                value={cateSelect}
                bordered={false}
                onChange={handleSelect}>
            </SortSelect>
            <Divider type='vertical' style={{ fontSize: '20px' }} />
            <Input
                name="value"
                placeholder="Search for books by keyword"
                bordered={false}
                onChange={handleonChange}
                value={value} />

            <Button
                icon={<SearchOutlined style={{ fontWeight: 700, fontSize: 15 }} />}
                type="text"
                shape='circle'
                htmlType="submit"></Button>
        </FormSearchStyled>
    );
}

export default FormSearch;