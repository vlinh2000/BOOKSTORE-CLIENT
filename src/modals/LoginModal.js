import React from 'react';
import { Button, Form, Input, Modal, Typography } from 'antd';
import styled from 'styled-components';

import { useForm } from 'react-hook-form';

import { yupResolver } from "@hookform/resolvers/yup"
import loginSchema from 'yup/loginSchema';
import InputField from 'custom-fields/InputFields';
import { useDispatch, useSelector } from 'react-redux';
import { switchLoginModal, switchRegisterModal } from 'app/modalSlice';
import { getMe, login } from 'app/userSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const FormStyled = styled.form`
    padding: 0.5rem 2rem;
    border:1px solid #eee;
    margin-top:2rem;
    `;

const InputStyled = styled(Input)`
    min-height:55px;
    margin-top:2rem;
    font-weight:500;
    `;

const InputPassStyled = styled(Input)`
    min-height:55px;
    font-weight:500;
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
    margin-bottom:1rem;
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

const LostPassButtonStyled = styled.a`
    color:#000;
    display:block;
    text-align:end;
    font-weight:500;
    font-size:12px;

    &:hover{
        color:#9387d9;
    }
    `;

const SocialMediaStyled = styled.div`
        color:#000;
        display:block;
        text-align:center;
        font-weight:500;
        font-size:10px;
        cursor:pointer;

        &:hover{
            color:#9387d9;
        }
`;

function LoginModal(props) {

    const { control, handleSubmit } = useForm({ resolver: yupResolver(loginSchema) });

    const loginModalStatus = useSelector(({ modals }) => modals.loginModal);

    const dispatch = useDispatch();

    //handle login
    const onSubmit = async (values) => {

        const { error, payload: { message } } = await dispatch(login(values));
        // console.log(payload);
        //login failed 
        if (error) {
            toast.error(message);
            return;
        }

        //login success
        await dispatch(getMe());
        //close modal
        dispatch(switchLoginModal(false));
        toast.success("Welcome back!")
    }

    // Open register modal
    const handleToRegisterModal = () => {
        const action = switchRegisterModal(true);
        dispatch(action);
    }

    //handle close login modal
    const handleClose = () => {
        const action = switchLoginModal(false);
        dispatch(action);
    }

    return (
        <div>
            <Modal
                visible={loginModalStatus}
                width={500}
                footer={false}
                onCancel={handleClose}  >

                <FormStyled onSubmit={handleSubmit(onSubmit)}>
                    <WrapperStyled>
                        <TitleStyled>SIGN IN</TitleStyled>
                    </WrapperStyled>
                    <InputField
                        name="userName"
                        placeholder="User name"
                        control={control}
                    />
                    <InputField
                        name="passWord"
                        placeholder="Pass word"
                        type="password"
                        control={control}
                    />
                    <LostPassButtonStyled href="#" target="_blank">Forgot password?</LostPassButtonStyled>
                    <Form.Item>
                        <ButtonStyled bgcolor="#000" htmlType="submit">LOGIN</ButtonStyled>
                        <ButtonStyled onClick={handleToRegisterModal} bgcolor="#b9b9b9">CREATE ACCOUNT</ButtonStyled>
                    </Form.Item>
                    <SocialMediaStyled>LOGIN WITH SOCIAL MEDIA</SocialMediaStyled>
                </FormStyled>
            </Modal>
        </div>
    );
}

export default LoginModal;