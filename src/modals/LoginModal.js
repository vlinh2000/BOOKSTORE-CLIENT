import React from 'react';

import { Button, Form, Modal, Typography } from 'antd';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup"

import styled from 'styled-components';
import loginSchema from 'yup/loginSchema';
import InputField from 'custom-fields/InputFields';

import { useDispatch, useSelector } from 'react-redux';
import { switchLoginModal, switchRegisterModal } from 'app/modalSlice';
import { getMe, login, setCurrentUser } from 'app/userSlice';

import firebase, { auth } from 'firebase/config';
import { GoogleCircleFilled } from '@ant-design/icons';
import { toastError, toastSuccess } from 'utils/common';




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
        text-align:center; 
`;

const ButtonSiginGgStyled = styled(Button)`

    width:50%;
    background-color:#FFF;
    font-weight:500;
    border:none;
    box-shadow:1px 1px 1px 0.5px #969696;
    height:35px;

    &:hover{
        color:#777;
    }

`;

const GroupSigninSocial = styled.div`
    text-align:center;
`;

const ggProvider = new firebase.auth.GoogleAuthProvider();

function LoginModal(props) {

    const { control, handleSubmit } = useForm({ resolver: yupResolver(loginSchema) });

    const loginModalStatus = useSelector(({ modals }) => modals.loginModal);

    const dispatch = useDispatch();

    const { loading } = useSelector(state => state.user);

    //handle login
    const onSubmit = async (values) => {

        const { error, payload: { message } } = await dispatch(login(values));

        if (error) {
            toastError(message);
            return;
        }

        await dispatch(getMe());
        //close modal
        dispatch(switchLoginModal(false));
        toastSuccess("Welcome back!", "HI")
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


    //



    const handleLoginGg = async () => {
        const { user } = await auth.signInWithPopup(ggProvider);
        if (!user) return;

        const {
            displayName,
            photoURL,
            email,
            phoneNumber, refreshToken } = user;

        const token = await user.getIdToken();

        await dispatch(setCurrentUser({
            auth: {
                token,
                refreshToken
            },
            user: {
                name: displayName,
                avatar: photoURL,
                email,
                phoneNumber
            }
        }));
        dispatch(switchLoginModal(false));
        toastSuccess("Welcome back!", "HI")
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
                        <ButtonStyled
                            loading={loading}
                            bgcolor="#000"
                            htmlType="submit">LOGIN</ButtonStyled>
                        <ButtonStyled
                            onClick={handleToRegisterModal}
                            bgcolor="#b9b9b9">CREATE ACCOUNT</ButtonStyled>
                    </Form.Item>
                </FormStyled>
                <GroupSigninSocial>
                    <SocialMediaStyled>Or</SocialMediaStyled>
                    <ButtonSiginGgStyled
                        onClick={handleLoginGg}
                        style={{ marginTop: 10 }}
                        icon={<GoogleCircleFilled twoToneColor="#eb2f96" />}
                    > Sign in with Google </ButtonSiginGgStyled>
                </GroupSigninSocial>
            </Modal>
        </div>
    );
}

export default LoginModal;