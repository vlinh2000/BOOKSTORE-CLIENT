import React from 'react';
import PropTypes from 'prop-types';
import { Button, Divider, Input, Select } from 'antd';
import styled from 'styled-components';
import { SearchOutlined } from '@ant-design/icons';

Search.propTypes = {
    options: PropTypes.array
};

Search.defaultProps = {
    options: []
};

const SearchStyled = styled.div`
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

function Search({ options }) {
    return (
        <SearchStyled>
            <SortSelect name="categorySearch" defaultValue={-1} bordered={false}>
                <Select.Option value={-1}>All Category </Select.Option>
                <Select.Option value={1}  >Children's books </Select.Option>
                <Select.Option value={2} >Children's books </Select.Option>
            </SortSelect>
            <Divider type='vertical' style={{ fontSize: '20px' }} />
            <Input type="text" name="searchValue" bordered={false} placeholder="Search for books by keyword" />
            <Button icon={<SearchOutlined style={{ fontWeight: 700, fontSize: 15 }} />} type="text" shape='circle' onClick={() => console.log('search')}></Button>
        </SearchStyled>
    );
}

export default Search;