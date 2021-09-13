import React from 'react';
import PropTypes from 'prop-types';
import { Button, Dropdown, Typography, Select, Empty } from 'antd';
import styled from 'styled-components';
import { useSelector } from 'react-redux';


TopControl.propTypes = {

};

const TopControlStyled = styled.div`
    display:flex;
    justify-content:space-between;
    margin-bottom:2rem;

    .notif {
        font-size:12px;
        color:#969696;
        font-weight:500;
        
        .keyword{
            font-size:15px;
            color:#9387d9;
            font-weight:500;
        }
    }    
`;


const SelectStyled = styled(Select)`
    min-width:200px;
`;


function TopControl({ totalProduct }) {

    const { value } = useSelector(state => state.pageInfo.search);

    return (
        <TopControlStyled>
            <Typography.Text className='notif'> {totalProduct === 0 ? <Empty /> : <span>Showing {totalProduct} results  <span className="keyword"> [{value ? value : 'All'}]</span></span>} </Typography.Text>
            <div>
                <SelectStyled defaultValue={0}>
                    <Select.Option value={0}>Default Sorting</Select.Option>
                    <Select.Option value={1}>Sort By Popularity</Select.Option>
                    <Select.Option value={2}>Sort By Average Rating</Select.Option>
                    <Select.Option value={3}>Sort By Latest</Select.Option>
                    <Select.Option value={4}>Sort By Price: Low To High</Select.Option>
                    <Select.Option value={5}>Sort By Price: High To Low</Select.Option>
                </SelectStyled>
            </div>


        </TopControlStyled>


    );
}

export default TopControl;