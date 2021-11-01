import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'antd'
import { Controller } from 'react-hook-form';
import InputEmojiWithRef from 'react-input-emoji';
import styled from 'styled-components';

InputFieldWithEmoji.propTypes = {
    //form  , field if using formik

    name: PropTypes.string,
    placeholder: PropTypes.string,
    type: PropTypes.string,
    disabled: PropTypes.bool,
    value: PropTypes.string,
    label: PropTypes.string
};

InputFieldWithEmoji.defaultProps = {

    name: '',
    placeholder: '',
    type: 'text',
    disabled: false,
    value: '',
    label: ''
};

const FormItemStyled = styled(Form.Item)`
    .ant-form-item-label label{
        color:#969696;
        font-weight:500;
    }
    .ant-form-item-explain.ant-form-item-explain-error{
        font-size:10px;
        margin-top:5px;
        margin-bottom:1rem;
    }

    .react-emoji{
        align-items:start;

        .react-input-emoji--container{
            border-color:#7FDBFF !important;
        }
        
        .react-input-emoji--placeholder{
            align-items:start;
            margin-top:1rem;
        }
        
        .react-input-emoji--input{
            top:0.5rem;
            min-height:200px;
        }

        .react-input-emoji--button{
            margin-top:1rem;
        }
    }
`;

function InputFieldWithEmoji(props) {

    const { name, placeholder, disabled, control, label } = props;

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, formState: { errors } }) => {
                return (<FormItemStyled
                    validateStatus={errors[field.name] && 'error'}
                    help={errors[field.name]?.message}
                    name={field.name}
                    initialValue={field.value}
                    label={label} >
                    <InputEmojiWithRef
                        {...field}
                        disabled={disabled}
                        placeholder={placeholder} />
                </FormItemStyled>)
            }} />

    );
}

export default InputFieldWithEmoji;