import React from 'react';
import { Controller } from 'react-hook-form';
import PropTypes from 'prop-types';

import styled from 'styled-components';

import { Alert, Form, Rate } from 'antd'

VotedField.propTypes = {
    //form  , field if using formik

    name: PropTypes.string,
    placeholder: PropTypes.string,
    type: PropTypes.string,
    disabled: PropTypes.bool
};

VotedField.defaultProps = {

    name: '',
    placeholder: '',
    type: 'text',
    disabled: false
};

const RaitingStyled = styled.div`
    color:#969696;
    font-size:15px;
    font-weight:bold;
    margin-bottom:1rem;

`;

function VotedField(props) {

    const { name, control, label } = props;

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, formState: { errors } }) => {

                //fake event change
                const handleVotedChange = star => {
                    const changeEvent = {
                        target: {
                            name: name,
                            value: star
                        }
                    };
                    field.onChange(changeEvent);
                }

                return (<Form.Item
                    name={field.name} >
                    <RaitingStyled>
                        <span
                            style={{ marginRight: 10 }}>{label}:</span>
                        <Rate
                            value={field.value}
                            onChange={handleVotedChange} />
                    </RaitingStyled>
                    {errors[field.name]?.message
                        && <Alert
                            style={{ width: '50%' }}
                            message={errors[field.name]?.message}
                            type="warning"
                            showIcon />}

                </Form.Item>)
            }} />

    );
}

export default VotedField;