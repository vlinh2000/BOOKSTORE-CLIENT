import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Divider, Input, Select } from 'antd';
import styled from 'styled-components';
import { SearchOutlined } from '@ant-design/icons';
import { Controller } from 'react-hook-form';
import { FormItemStyled } from 'assets/styles/globalStyle';

SelectField.propTypes = {
    options: PropTypes.array
};

SelectField.defaultProps = {
    options: []
};


const SelectStyled = styled(Select)`
    .ant-select-selector{
        height:55px!important;
        .ant-select-selection-item, .ant-select-selection-placeholder ,.ant-select-selection-search{
            line-height:55px!important;
        }

    }
`;

function SelectField(props) {
    const { name, options, control, placeholder, label, disabled, onChosen, onSetValue } = props;

    const [optionWithCondition, setOptionWithCondition] = React.useState([]);

    const handleSelect = values => {
        if (name === 'province') {
            onSetValue('district', null)
            onSetValue('ward', null)
        }

        else if (name === 'district') {
            onSetValue('ward', null)
        }

        onChosen && onChosen(values.value);
    }
    return (
        <Controller
            control={control}
            name={name}
            render={({ field, formState: { errors } }) => {
                return <FormItemStyled
                    validateStatus={errors[name] && "error"}
                    help={errors[name] && errors[name].message}
                    label={label}>
                    <SelectStyled
                        {...field}
                        labelInValue
                        onSelect={handleSelect}
                        placeholder={placeholder}
                        options={optionWithCondition.length > 0 ? optionWithCondition : options}
                        control={control} />
                </FormItemStyled>
            }
            }
        />
    );
}
export default SelectField;