import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Alert, Form, Input, Rate } from 'antd'
import { Controller } from 'react-hook-form';
import { SmileOutlined } from '@ant-design/icons';
import { ErrorMessage } from '@hookform/error-message';

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

// const VotedStyled = styled(Input)`
//     min-height:55px;
//     font-weight:500;
//     `;
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
                        <span style={{ marginRight: 10 }}>{label}:</span>
                        <Rate onChange={handleVotedChange} />
                    </RaitingStyled>
                    {errors[field.name]?.message && <Alert style={{ width: '50%' }} message={errors[field.name]?.message} type="warning" showIcon />}

                </Form.Item>)
            }} />

    );
}

export default VotedField;