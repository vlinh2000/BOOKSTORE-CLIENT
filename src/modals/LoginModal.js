import React from 'react';
import PropTypes from 'prop-types';
import { Button, Divider, Drawer, Form, Input, Modal, Space, Tabs, Typography } from 'antd';
import styled from 'styled-components';

LoginModal.propTypes = {

};

const FormStyled = styled(Form)`
    padding: 0.5rem 2rem;
    border:1px solid #eee;
    margin-top:2rem;
    `;

const InputStyled = styled(Input)`
    min-height:45px;
    margin-top:2rem;
    font-weight:500;
    `;

const InputPassStyled = styled(Input)`
    min-height:45px;
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
`;

const ButtonStyled = styled(Button)`
    display:block;
    width:100%;
    min-height:50px;
    margin-bottom:0.75rem;
    font-size:13px;
    font-weight:500;
    color:#fff;
    margin-top:0.5rem;
    background:${(props) => props.bgcolor};

    &:hover{
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

function LoginModal(props) {


    const onFinish = (values) => {
        console.log(values);
    }

    const onFinishFailed = (err) => {
        console.log(err);
    }

    return (
        <div>
            <Modal
                visible={true}
                width={510}
                footer={false}
            >
                <FormStyled>
                    <WrapperStyled>
                        <TitleStyled>SIGN IN</TitleStyled>
                    </WrapperStyled>
                    <Form.Item
                        name="userName" >
                        <InputStyled
                            placeholder="User name"
                        />
                    </Form.Item>
                    <Form.Item
                        name="passWord"
                    >
                        <InputPassStyled
                            placeholder="Pass word"
                        />
                    </Form.Item>
                    <LostPassButtonStyled href="#" target="_blank">Forgot password?</LostPassButtonStyled>
                    <Form.Item>
                        <ButtonStyled bgcolor="#000" htmlType="submit">LOGIN</ButtonStyled>
                        <ButtonStyled bgcolor="#b9b9b9">CREATE ACCOUNT</ButtonStyled>
                    </Form.Item>
                </FormStyled>
            </Modal>
        </div>
    );
}

export default LoginModal;