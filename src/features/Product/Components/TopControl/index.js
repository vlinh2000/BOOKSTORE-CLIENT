import React from 'react';
import PropTypes from 'prop-types';
import { Button, Dropdown, Typography, Select } from 'antd';
import styled from 'styled-components';


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
    }    
`;


const SelectStyled = styled(Select)`
    min-width:200px;
`;

function TopControl(props) {
    return (
        <TopControlStyled>
            <Typography.Text className='notif'> {true ? `Showing all ${8} results` : `Showing ${1}–${12} of ${20} item(s)`}</Typography.Text>
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