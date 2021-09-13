import React from 'react';
import { Avatar, Button, Col, message, Row } from 'antd';
import InputField from 'custom-fields/InputFields';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';

import { yupResolver } from "@hookform/resolvers/yup"
import evaluateSchema from 'yup/evaluateSchema';
import VotedField from 'custom-fields/VotedField';
import { useDispatch, useSelector } from 'react-redux'
import { hasNewFeedBack, sendFeedBack } from 'features/Product/productSlice';

const Wrapper = styled.div`
    padding:0 9rem;
`;

function ProductEvaluateForm({ bookId }) {

    const { isLoadingFeedBack } = useSelector(state => state.pageInfo)

    const { control, handleSubmit, reset } = useForm({ resolver: yupResolver(evaluateSchema) });

    const dispatch = useDispatch()


    const onSubmit = values => {
        //handle post feedback to db
        try {
            const sendFB = async () => {
                const data = { ...values, bookId };
                const { payload } = await dispatch(sendFeedBack(data))

                dispatch(hasNewFeedBack());
                message.success(payload);
            }
            sendFB();
            reset({
                voted: 0,
                message: ''
            });
        } catch (error) {
            message.error(error);
        }

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
                <Button type="primary" htmlType="submit" loading={isLoadingFeedBack}>
                    Submit
                </Button>
            </form>

        </Wrapper>
    );
}

export default ProductEvaluateForm;

