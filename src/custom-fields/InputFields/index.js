import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Form, Input } from 'antd'
import { Controller } from 'react-hook-form';

InputField.propTypes = {
    //form  , field if using formik

    name: PropTypes.string,
    placeholder: PropTypes.string,
    type: PropTypes.string,
    disabled: PropTypes.bool,
    value: PropTypes.string
};

InputField.defaultProps = {

    name: '',
    placeholder: '',
    type: 'text',
    disabled: false,
    value: ''
};

const InputStyled = styled(Input)`
    min-height:55px;
    font-weight:500;
    `;

function InputField(props) {

    const { name, prefix, placeholder, type, disabled, control, label } = props;

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, formState: { errors } }) => {

                return (<Form.Item
                    validateStatus={errors[field.name] && 'error'}
                    help={errors[field.name]?.message}
                    name={field.name}
                    initialValue={field.value}
                    label={label} >
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