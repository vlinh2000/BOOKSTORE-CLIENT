import React from 'react';
import { Button, Col, Form, Input, Modal, Row, Typography } from 'antd';
import styled from 'styled-components';
import { HomeOutlined, KeyOutlined, MailOutlined, PhoneOutlined, SmileOutlined, UserOutlined } from '@ant-design/icons';
import InputField from 'custom-fields/InputFields';

const FormStyled = styled(Form)`
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

    &:hover{
        background:#9387d9;
        color:#FFF;
        border:none;
    }

`;

function RegisterModal(props) {

    const onFinish = (values) => {
        console.log(values);
    }

    const onFinishFailed = (err) => {
        console.log(err);
    }

    return (
        <div>
            <Modal
                visible={false}
                width={800}
                footer={false}
            >

                <FormStyled>
                    <WrapperStyled>
                        <TitleStyled>REGISTER</TitleStyled>
                    </WrapperStyled>
                    <Row
                        gutter={[20, 1]}
                        justify='space-around'
                        align="middle"
                        style={{ marginTop: '2rem' }} >
                        <Col span={8}>
                            <InputField
                                name="name"
                                placeholder="Họ tên"
                                prefix={<SmileOutlined />}
                            />
                        </Col>
                        <Col span={8}>
                            <InputField
                                name="phoneNumber"
                                prefix={<PhoneOutlined />}
                                type='number'
                                placeholder="Số điện thoại"
                            />
                        </Col>
                        <Col span={8}>
                            <InputField
                                name="email"
                                prefix={<MailOutlined />}
                                type="email"
                                placeholder="Email"
                            />
                        </Col>
                        <Col span={8}>
                            <InputField
                                name="userName"
                                prefix={<UserOutlined />}
                                placeholder="User Name"
                            />
                        </Col>
                        <Col span={8}>
                            <InputField
                                name="passWord"
                                type='password'
                                prefix={<KeyOutlined />}
                                placeholder="Pass word"
                            />
                        </Col>
                        <Col span={8}>
                            <InputField
                                name="tryPassWord"
                                type="password"
                                prefix={<KeyOutlined />}
                                placeholder="Try pass word"
                            />
                        </Col>
                        <Col span={24}>
                            <InputField
                                name="address"
                                prefix={<HomeOutlined />}
                                placeholder="Địa chỉ"
                            />
                        </Col>
                    </Row>
                    <Form.Item>
                        <ButtonStyled bgcolor="#000" htmlType="submit">REGISTER</ButtonStyled>
                        <ButtonStyled bgcolor="#b9b9b9">ALREADY HAS AN ACCOUNT</ButtonStyled>
                    </Form.Item>
                </FormStyled>
            </Modal>
        </div>
    );
}

export default RegisterModal;