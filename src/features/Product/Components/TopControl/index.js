import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Select, Alert } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import { filterBy } from 'features/Product/productSlice';


TopControl.propTypes = {
    totalProduct: PropTypes.number
};

TopControl.defaultProps = {
    totalProduct: 0
};

const TopControlStyled = styled.div`
    display:flex;
    justify-content:space-between;
    align-items:center;
    margin-bottom:2rem;
`;

const ShowResultStyled = styled.span`
    display:inline-block;
    height:35px;
    font-size:12px;
    color:#969696;
    font-weight:500;
    line-height:35px;
`;

const SelectStyled = styled(Select)`
    min-width:200px;
`;

const AlertStyled = styled(Alert)`
    height:30px;
    display:inline-flex;
    margin-left:1rem;
`;

function TopControl({ totalProduct }) {

    const { filterPattern: { searchValue } } = useSelector(state => state.pageInfo);
    const dispatch = useDispatch()

    const handleCloseSearchValue = () => {
        dispatch(filterBy({ searchValue: '' }))
    }

    const onSelect = (value) => {

        dispatch(filterBy({ sort: value === 0 ? '' : value }))
    }

    return (
        <TopControlStyled>
            <div>
                <ShowResultStyled> {totalProduct ? `Showing all ${totalProduct} results` : `Showing all ${totalProduct} results`} </ShowResultStyled>
                {searchValue && <AlertStyled
                    onClose={handleCloseSearchValue}
                    showIcon icon={<SearchOutlined />}
                    message={searchValue}
                    closable />}
            </div>
            <div>
                <SelectStyled defaultValue={0} onSelect={onSelect} >
                    <Select.Option disabled value={0}>Default Sorting</Select.Option>
                    <Select.Option value="min-to-max">Sort By Price: Low To High</Select.Option>
                    <Select.Option value='max-to-min'>Sort By Price: High To Low</Select.Option>
                </SelectStyled>
            </div>


        </TopControlStyled>


    );
}

export default TopControl;