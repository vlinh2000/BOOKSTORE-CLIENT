import React from 'react';
import { Button, Col, Form, Modal, Row, Typography } from 'antd';
import styled from 'styled-components';
import InputField from 'custom-fields/InputFields';

import { useForm } from 'react-hook-form';

import { yupResolver } from "@hookform/resolvers/yup"
import registerSchema from 'yup/registerSchema';
import { useDispatch, useSelector } from 'react-redux';
import { switchLoginModal, switchRegisterModal } from 'app/modalSlice';
import { register } from 'app/userSlice';
import { toastError, toastSuccess } from 'utils/common';
import SelectField from 'custom-fields/SelectFields';
import axios from 'axios';


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

    const defaultValues = {
        name: '',
        phoneNumber: '',
        email: '',
        userName: '',
        passWord: '',
        tryPassWord: '',
        province: null,
        district: null,
        ward: null
    }

    const { handleSubmit, control, setValue, reset } = useForm({ resolver: yupResolver(registerSchema), defaultValues });

    const { loading } = useSelector(state => state.user);

    const registerModalStatus = useSelector(({ modals }) => modals.registerModal);

    const [provinces, setProvinces] = React.useState([]);
    const [districts, setDistricts] = React.useState([]);
    const [wards, setWards] = React.useState([]);

    const [form] = Form.useForm();

    const dispatch = useDispatch();

    //handle register
    const onSubmit = async (values) => {
        const userInfo = {
            name: values.name,
            phoneNumber: values.phoneNumber,
            email: values.email,
            userName: values.userName,
            passWord: values.passWord,
            address: `${values.ward.label}, ${values.district.label}, ${values.province.label}`
        }
        const { error, payload: { message } } = await dispatch(register(userInfo));

        if (error) {
            toastError(message);
            return;
        }

        //when success register
        reset(defaultValues);
        form.resetFields();
        toastSuccess(message);
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

    React.useEffect(() => {
        try {
            const fetchProvinces = async () => {
                const url = `${process.env.REACT_APP_API_PROVINCES}/p`;
                let { data } = await axios.get(url);
                data = data.map(province => ({ label: province.name, value: province.code }))
                setProvinces(data);
            }

            fetchProvinces();
        } catch (error) {
            console.log(error)
        }

    }, []);

    const fetchDistrict = async provinceCode => {
        try {
            setDistricts([]);
            setWards([]);
            const url = `${process.env.REACT_APP_API_PROVINCES}/p/${provinceCode}?depth=2`
            const { data } = await axios.get(url);
            setDistricts(data.districts.map(district => ({ label: district.name, value: district.code })));
        } catch (error) {
            console.log(error)
        }
    }

    const fetchWards = async districtCode => {
        try {
            const url = `${process.env.REACT_APP_API_PROVINCES}/d/${districtCode}?depth=2`
            const { data } = await axios.get(url);
            setWards(data.wards.map(wards => ({ label: wards.name, value: wards.code })));
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <Modal
                visible={registerModalStatus}
                width={1000}
                footer={false}
                onCancel={handleClose}>

                <FormStyled
                    form={form}
                    initialValues={defaultValues}
                    layout="vertical"
                    onFinish={handleSubmit(onSubmit)}>
                    <WrapperStyled>
                        <TitleStyled>REGISTER</TitleStyled>
                    </WrapperStyled>
                    <Row
                        gutter={[30, 0]}
                        style={{ marginTop: '0.5rem' }} >
                        <Col span={8}>
                            <InputField
                                name="name"
                                placeholder="Your name"
                                label="Name"
                                control={control} />
                            <InputField
                                name="phoneNumber"
                                placeholder="Your phone"
                                label="Phone"
                                control={control}
                            />
                            <InputField
                                name="email"
                                type="email"
                                placeholder="Your email"
                                label="Email"
                                control={control}
                            />
                        </Col>
                        <Col span={8}>
                            <InputField
                                name="userName"
                                placeholder="Your username"
                                label="User name"
                                control={control}
                            />
                            <InputField
                                name="passWord"
                                type='password'
                                placeholder="Your password"
                                label="Pass word"
                                control={control}
                            />
                            <InputField
                                name="tryPassWord"
                                type="password"
                                placeholder="Re password"
                                label="Re password"
                                control={control}
                            />
                        </Col>
                        <Col span={8}>
                            <SelectField
                                name="province"
                                placeholder="Province"
                                label='Province'
                                options={provinces}
                                onSetValue={setValue}
                                onChosen={fetchDistrict}
                                control={control} />
                            <SelectField
                                name="district"
                                placeholder="District"
                                label='District'
                                onChosen={fetchWards}
                                onSetValue={setValue}
                                options={districts}
                                control={control} />
                            <SelectField
                                name="ward"
                                placeholder="Ward"
                                label='Ward'
                                options={wards}
                                control={control} />

                        </Col>
                    </Row>
                    <ButtonStyled loading={loading} bgcolor="#000" htmlType="submit">REGISTER</ButtonStyled>
                    <ButtonStyled onClick={handleToLoginModal} bgcolor="#b9b9b9">ALREADY HAS AN ACCOUNT</ButtonStyled>
                </FormStyled>
            </Modal>
        </div>
    );
}

export default RegisterModal;