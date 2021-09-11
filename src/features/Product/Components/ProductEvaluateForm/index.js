import React from 'react';
import { Avatar, Button, Col, Form, Rate, Row } from 'antd';
import InputField from 'custom-fields/InputFields';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';

import { yupResolver } from "@hookform/resolvers/yup"
import evaluateSchema from 'yup/evaluateSchema';
import VotedField from 'custom-fields/VotedField';

const Wrapper = styled.div`
    padding:0 9rem;
`;

function ProductEvaluateForm(props) {

    const { control, handleSubmit, setValue, field } = useForm({ resolver: yupResolver(evaluateSchema) });

    const onSubmit = values => {
        console.log(values);
    }

    return (
        <Wrapper>
            <form onSubmit={handleSubmit(onSubmit)} >
                <VotedField
                    control={control}
                    name="voted"
                    label="Your rating"
                />
                <Row gutter={20}>
                    <Avatar>L</Avatar>
                    <Col span={10}>
                        <InputField
                            name="message"
                            placeholder="Your Reviews"
                            control={control}
                        />
                    </Col>
                </Row>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </form>

        </Wrapper>
    );
}

export default ProductEvaluateForm;

