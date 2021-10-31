import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux'

import styled from 'styled-components';
import { Avatar, Button, Col, message, Row, Form, Alert, Tooltip } from 'antd';
import { InfoCircleTwoTone, LoginOutlined } from '@ant-design/icons';

import { yupResolver } from "@hookform/resolvers/yup"
import evaluateSchema from 'yup/evaluateSchema';

import VotedField from 'custom-fields/VotedField';

import { hasNewFeedBack, sendFeedBack } from 'features/Product/productSlice';
import { switchLoginModal } from 'app/modalSlice';

import InputEmoji from "react-input-emoji";
import InputFieldWithEmoji from 'custom-fields/InputFieldWithEmoji';

const Wrapper = styled.div`

    padding:2rem 3rem 4rem 3rem;
    margin-left:2rem;
    box-shadow:1px 1px 25px -8px #AAA;
`;

const AlertStyled = styled(Alert)`
    font-size:12px;
    font-weight:500;
    display:inline-flex;

`;

const TextStyled = styled.h3`
    font-size:1.1rem;
    font-style:italic;
    margin-bottom:1.5rem; 
`;

function SendFeedBack({ bookId }) {

    const { isLoadingFeedBack } = useSelector(state => state.pageInfo);

    const { isAuth, user: { avatar, name } } = useSelector(state => state.user.currentUser);

    const { control, handleSubmit, reset } = useForm({ resolver: yupResolver(evaluateSchema) });

    const dispatch = useDispatch()

    const [form] = Form.useForm();

    const onSubmit = values => {
        //handle post feedback to db
        try {
            const sendFB = async () => {
                const data = { ...values, bookId };
                const { payload } = await dispatch(sendFeedBack(data))
                dispatch(hasNewFeedBack());
                message.success(payload);
                reset({ voted: 0 })
                form.setFieldsValue({ message: '' });
            }
            sendFB();
        } catch (error) {
            message.error(error);
        }

    }



    return (<Wrapper>
        {isAuth ? <>
            <TextStyled>Please give us your feeling</TextStyled>
            <Form form={form} onFinish={handleSubmit(onSubmit)} >
                <VotedField
                    control={control}
                    name="voted"
                    label="Your rating"
                />
                <Row style={{ marginTop: "-5px;" }}>
                    <Col span={1}>
                        <Avatar
                            size="large"
                            style={{ backgroundColor: '#f56a00', marginTop: 3 }}
                            src={avatar ? avatar : ''}>{!avatar && name?.charAt(0)?.toUpperCase()}  </Avatar>
                    </Col>
                    <Col span={10}>
                        <InputFieldWithEmoji
                            name="message"
                            placeholder="Your Reviews"
                            control={control}
                        />
                    </Col>
                </Row>
                <Button type="primary" htmlType="submit" loading={isLoadingFeedBack}>
                    Send feed back
                </Button>
            </Form>
        </>
            : <AlertStyled
                icon={<InfoCircleTwoTone />}
                showIcon
                type="info"
                message="Please login to send your feed back"
                action={
                    <Tooltip title="Login now">
                        <Button
                            onClick={() => dispatch(switchLoginModal(true))}
                            icon={<LoginOutlined />}
                            size="small"
                            type="primary" />
                    </Tooltip>
                } />}


    </Wrapper>

    );
}

export default SendFeedBack;
