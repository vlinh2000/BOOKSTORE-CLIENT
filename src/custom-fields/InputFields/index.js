import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Form, Input } from 'antd'

InputField.propTypes = {
    //form  , field if using formik

    name: PropTypes.string,
    placeholder: PropTypes.string,
    type: PropTypes.string,
    disabled: PropTypes.bool
};

InputField.defaultProps = {

    name: '',
    placeholder: '',
    type: 'text',
    disabled: false
};

const InputStyled = styled(Input)`
    min-height:55px;
    font-weight:500;
    `;

function InputField(props) {

    const { name, prefix, placeholder, type, disabled } = props;



    return (
        <Form.Item
            name={name} >

            <InputStyled
                type={type}
                prefix={prefix}
                placeholder={placeholder}
                disabled={disabled}
            />

        </Form.Item>
    );
}

export default InputField;