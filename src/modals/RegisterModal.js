import React from 'react';
import { Button, Col, Form, Input, Modal, Row, Typography } from 'antd';
import styled from 'styled-components';
import { HomeOutlined, KeyOutlined, MailOutlined, PhoneOutlined, SmileOutlined, UserOutlined } from '@ant-design/icons';

const FormStyled = styled(Form)`
    padding: 0.5rem 2rem;
    border:1px solid #eee;
    margin-top:2rem;
    `;

const InputStyled = styled(Input)`
    min-height:55px;
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
                    <Row gutter={[20, 1]} justify='space-around' align="middle" style={{ marginTop: '2rem' }} >
                        <Col span={8}>
                            <Form.Item
                                name="name" >
                                <InputStyled
                                    prefix={<SmileOutlined />}
                                    placeholder="Họ tên"
                                />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                name="phoneNumber">
                                <InputStyled
                                    prefix={<PhoneOutlined />}
                                    type='number'
                                    placeholder="Số điện thoại" />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                name="email">
                                <InputStyled
                                    prefix={<MailOutlined />}
                                    type="email"
                                    placeholder="Email" />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                name="userName">
                                <InputStyled
                                    prefix={<UserOutlined />}
                                    placeholder="User Name" />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                name="passWord">
                                <InputPassStyled
                                    prefix={<KeyOutlined />}
                                    placeholder="Pass word" />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                name="tryPassWord">
                                <InputPassStyled
                                    prefix={<KeyOutlined />}
                                    placeholder="Try pass word" />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                name="address">
                                <InputStyled
                                    prefix={<HomeOutlined />}
                                    placeholder="Địa chỉ" />
                            </Form.Item>
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