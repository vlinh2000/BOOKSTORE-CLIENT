import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Form } from 'antd';

import { filterBy } from 'features/Product/productSlice';
import { useLocation } from 'react-router';
import { history } from 'App';


const FormSearchStyled = styled(Form)`
    display:flex;
    align-items:center;

    padding: 0.3rem 1rem;
    border-radius:30px;
    background:#f1f1f1;
    border:1px solid #CCC;
    
    input{
        font-style:italic;
        font-size:13px;
        color:#0395f7;
    }
    
    .ant-btn-text:hover, .ant-btn-text:focus{
        color:#0395f7;
        background:none;
}

`;

function FormSearch(props) {

    const [value, setValue] = React.useState('');

    const location = useLocation();

    const dispatch = useDispatch();

    //handle onchange input
    const handleonChange = ({ target }) => {
        setValue(target.value);
    }

    //handle dispatch action to filter product
    const onSubmit = () => {

        if (location.pathname !== '/product') {
            history.push('/');
        }
        dispatch(filterBy({ searchValue: value }));
        setValue('');
    }

    return (
        <FormSearchStyled
            autoComplete="off"
            onFinish={onSubmit}>
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
                htmlType="submit" />
        </FormSearchStyled>
    );
}

export default FormSearch;