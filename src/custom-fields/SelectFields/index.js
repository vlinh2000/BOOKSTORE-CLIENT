import React from 'react';
import PropTypes from 'prop-types';
import { Button, Divider, Input, Select } from 'antd';
import styled from 'styled-components';
import { SearchOutlined } from '@ant-design/icons';
import { Controller } from 'react-hook-form';

Search.propTypes = {
    options: PropTypes.array
};

Search.defaultProps = {
    options: []
};




function Search({ name, options, control }) {

    return (
        <Controller
            control={control}
            name={name}
            render={({ field }) => {

                return

            }}
        >

        </Controller>
    );
}

export default Search;