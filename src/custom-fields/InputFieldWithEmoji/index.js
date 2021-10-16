import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'antd'
import { Controller } from 'react-hook-form';
import InputEmojiWithRef from 'react-input-emoji';

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


function InputFieldWithEmoji(props) {

    const { name, placeholder, disabled, control, label } = props;

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
                    <InputEmojiWithRef
                        {...field}
                        disabled={disabled}
                        placeholder={placeholder} />
                </Form.Item>)
            }} />

    );
}

export default InputFieldWithEmoji;