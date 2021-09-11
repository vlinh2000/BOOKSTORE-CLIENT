import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Form, Input } from 'antd'
import { Controller } from 'react-hook-form';
import { SmileOutlined } from '@ant-design/icons';
import { ErrorMessage } from '@hookform/error-message';

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

    const { name, prefix, placeholder, type, disabled, control } = props;

    return (
        <Controller
            name={name}
            placeholder={placeholder}
            prefix={prefix}
            control={control}
            render={({ field, formState: { errors } }) => {

                return (<Form.Item
                    validateStatus={errors[field.name] && 'error'}
                    help={errors[field.name]?.message}
                    name={field.name} >
                    <InputStyled
                        {...field}
                        type={type}
                        prefix={prefix}
                        placeholder={placeholder}
                        disabled={disabled}
                    />
                </Form.Item>)
            }} />

    );
}

export default InputField;