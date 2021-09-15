import React from 'react';
import { Button, Col, Form, Modal, Row, Typography } from 'antd';
import styled from 'styled-components';
import { HomeOutlined, KeyOutlined, MailOutlined, PhoneOutlined, SmileOutlined, UserOutlined } from '@ant-design/icons';
import InputField from 'custom-fields/InputFields';

import { useForm } from 'react-hook-form';

import { yupResolver } from "@hookform/resolvers/yup"
import registerSchema from 'yup/registerSchema';
import { useDispatch, useSelector } from 'react-redux';
import { switchLoginModal, switchRegisterModal } from 'app/modalSlice';
import { register } from 'app/userSlice';
import { toast } from 'react-toastify';


const FormStyled = styled.form`
    padding: 0.5rem 2rem;
    border:1px solid #eee;
    margin-top:2rem;
    `;


const TitleStyled = styled(Typography.Text)`
    font-size:16px;
    font-weight:500;
    padding-bottom:0.3rem;
    border-bottom:3px solid #9387d9; 
`;

const WrapperStyled = styled.div`
    display:flex;
    justify-content:center;
`;

const ButtonStyled = styled(Button)`
    display:block;
    width:100%;
    min-height:50px;
    margin-bottom:0.5rem;
    font-size:13px;
    font-weight:500;
    color:#fff;
    margin-top:0.5rem;
    background:${(props) => props.bgcolor};

    &:hover, &:focus{
        background:#9387d9;
        color:#FFF;
        border:none;
    }

`;

function RegisterModal(props) {

    const { handleSubmit, control } = useForm({ resolver: yupResolver(registerSchema) });

    const { loading } = useSelector(state => state.user);

    const registerModalStatus = useSelector(({ modals }) => modals.registerModal);
    const dispatch = useDispatch();

    //handle register
    const onSubmit = async (values) => {

        const { error, payload: { message } } = await dispatch(register(values));
        if (error) {
            toast.error(message);
            return;
        }

        //when success register
        toast.success(message);

    }

    //Open login modal
    const handleToLoginModal = () => {
        const action = switchLoginModal(true);
        dispatch(action);
    }

    //handle close register modal
    const handleClose = () => {
        const action = switchRegisterModal(false);
        dispatch(action);
    }

    return (
        <div>
            <Modal
                visible={registerModalStatus}
                width={800}
                footer={false}
                onCancel={handleClose}>

                <FormStyled onSubmit={handleSubmit(onSubmit)}>
                    <WrapperStyled>
                        <TitleStyled>REGISTER</TitleStyled>
                    </WrapperStyled>
                    <Row
                        gutter={[20, 10]}
                        justify='space-around'
                        align="middle"
                        style={{ marginTop: '2rem' }} >
                        <Col span={8}>
                            <InputField
                                name="name"
                                placeholder="Họ tên"
                                prefix={<SmileOutlined />}
                                control={control} />
                        </Col>
                        <Col span={8}>
                            <InputField
                                name="phoneNumber"
                                prefix={<PhoneOutlined />}
                                placeholder="Số điện thoại"
                                control={control}
                            />
                        </Col>
                        <Col span={8}>
                            <InputField
                                name="email"
                                prefix={<MailOutlined />}
                                type="email"
                                placeholder="Email"
                                control={control}
                            />
                        </Col>
                        <Col span={8}>
                            <InputField
                                name="userName"
                                prefix={<UserOutlined />}
                                placeholder="User Name"
                                control={control}
                            />
                        </Col>
                        <Col span={8}>
                            <InputField
                                name="passWord"
                                type='password'
                                prefix={<KeyOutlined />}
                                placeholder="Pass word"
                                control={control}
                            />
                        </Col>
                        <Col span={8}>
                            <InputField
                                name="tryPassWord"
                                type="password"
                                prefix={<KeyOutlined />}
                                placeholder="Try pass word"
                                control={control}
                            />
                        </Col>
                        <Col span={24}>
                            <InputField
                                name="address"
                                prefix={<HomeOutlined />}
                                placeholder="Địa chỉ"
                                control={control}
                            />
                        </Col>
                    </Row>
                    <Form.Item>
                        <ButtonStyled loading={loading} bgcolor="#000" htmlType="submit">REGISTER</ButtonStyled>
                        <ButtonStyled onClick={handleToLoginModal} bgcolor="#b9b9b9">ALREADY HAS AN ACCOUNT</ButtonStyled>
                    </Form.Item>
                </FormStyled>
            </Modal>
        </div>
    );
}

export default RegisterModal;