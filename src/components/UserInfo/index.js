import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Button, Drawer, Form, message, Upload } from 'antd';
import InputField from 'custom-fields/InputFields';
import { CameraOutlined, HomeOutlined, KeyOutlined, MailOutlined, PhoneOutlined, SmileOutlined, UploadOutlined, UserOutlined } from '@ant-design/icons';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { switchUserInfoDrawer } from 'app/modalSlice';
import AvatarSelectField from 'custom-fields/AvatarSelectField';
import userInfoSchema from 'yup/userInfoSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { getMe, updateUserInfo } from 'app/userSlice';

UserInfo.propTypes = {

};

const DrawerStyled = styled(Drawer)``;

const ButtonStyled = styled(Button)`
    min-height:50px;
    font-size:13px;
    font-weight:500;
    color:#fff;
    background:${(props) => props.bgcolor};

    &:hover, &:focus{
        background:#9387d9;
        color:#FFF;
        border:none;
    }

`;

const FormStyled = styled(Form)`
    font-size:90%;

`;

function UserInfo() {

    const { user } = useSelector(state => state.user.currentUser);

    const { isVisibleUserInfo } = useSelector(state => state.modals);

    const { loading } = useSelector(state => state.user);

    const dispatch = useDispatch();

    const [isEdit, setIsEdit] = React.useState(true);

    const defaultValues = React.useMemo(() => {
        return {
            name: user.name,
            email: user.email,
            userName: user.userName,
            address: user.address,
            phoneNumber: user.phoneNumber,
            avatar: ''
        }
    }, [user])

    const { control, handleSubmit, formState: { touchedFields } } = useForm({
        defaultValues,
        resolver: yupResolver(userInfoSchema)
    })


    const onSubmit = async values => {
        const formData = new FormData();

        values.avatar.file && formData.append("avatar", values.avatar.file);

        formData.append("id", user.id);
        formData.append("name", values.name);
        formData.append("phoneNumber", values.phoneNumber);
        formData.append("email", values.email);
        formData.append("address", values.address);

        const { errors, payload } = await dispatch(updateUserInfo(formData));

        if (errors) {
            message.error(payload.message);
            return;
        }
        await dispatch(getMe());
        await dispatch(switchUserInfoDrawer(false));
        setIsEdit(true);
        message.success(payload.message);
    }

    const handleClose = () => {
        dispatch(switchUserInfoDrawer(false))
    }

    return (
        <div>
            <DrawerStyled
                onClose={handleClose}
                title="User infomation"
                width="600px"
                drawerStyle={{ padding: "0 2rem" }}
                visible={isVisibleUserInfo}>
                <FormStyled onFinish={handleSubmit(onSubmit)}>
                    <AvatarSelectField
                        name="avatar"
                        control={control}
                        disabled={isEdit}
                        value={user.avatar} />

                    <InputField
                        name="userName"
                        prefix={<UserOutlined />}
                        placeholder="User Name"
                        control={control}
                        disabled={true} />
                    <InputField
                        name="name"
                        placeholder="Họ tên"
                        prefix={<SmileOutlined />}
                        control={control}
                        disabled={isEdit} />
                    <InputField
                        name="phoneNumber"
                        prefix={<PhoneOutlined />}
                        placeholder="Số điện thoại"
                        control={control}
                        disabled={isEdit} />

                    <InputField
                        name="email"
                        prefix={<MailOutlined />}
                        type="email"
                        placeholder="Email"
                        control={control}
                        disabled={isEdit} />
                    {/* <InputField
                        name="passWord"
                        type='password'
                        prefix={<KeyOutlined />}
                        placeholder="Pass word"
                        control={control}
                        disabled={isEdit} /> */}
                    <InputField
                        name="address"
                        prefix={<HomeOutlined />}
                        placeholder="Địa chỉ"
                        control={control}
                        disabled={isEdit} />
                    <Form.Item>

                        {isEdit ? <ButtonStyled
                            block
                            bgcolor="#000"
                            type="text"
                            onClick={() => setIsEdit(prev => !prev)}>
                            Edit
                        </ButtonStyled> : <ButtonStyled
                            block
                            loading={loading}
                            disabled={Object.keys(touchedFields).length < 1}
                            bgcolor="#000"
                            htmlType="submit">
                            Save
                        </ButtonStyled>}
                    </Form.Item>
                </FormStyled>
            </DrawerStyled>
        </div>
    );
}

export default UserInfo;