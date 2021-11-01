import React from 'react';
import { Avatar, Button, Drawer, Form, message, Tooltip, Tabs, Divider, Row, Col } from 'antd';
import InputField from 'custom-fields/InputFields';
import { HomeOutlined, LogoutOutlined, MailOutlined, PhoneOutlined, SmileOutlined, UserOutlined } from '@ant-design/icons';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { switchUserInfoDrawer } from 'app/modalSlice';
import AvatarSelectField from 'custom-fields/AvatarSelectField';
import userInfoSchema from 'yup/userInfoSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { getMe, logout, updateUserInfo } from 'app/userSlice';
import { toastSuccess } from 'utils/common';
import Banner from 'components/Banner';
import { OrgangeButton, TextYellowStyled, YellowButton } from 'assets/styles/globalStyle';
import { history } from 'App';

UserInfo.propTypes = {

};

const WrapperUserInfo = styled.div`

   width:80%;
   margin:2rem auto; 
   min-height:500px;
`;

const WrapperMain = styled.div`
   box-shadow:1px 1px 25px -8px #BBB;
   padding:0 2rem;
   `;

const TabStyled = styled(Tabs)`
   padding:3rem 0;
   `;

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

const FormStyled = styled(Form)``;

const ContentStyled = styled.div`
   max-width:800px;
   margin:0 auto;
`;
const NameProductStyled = styled.div`
    font-weight:bold;
    min-width:130px;
    `;
const ProductStyled = styled.div`
    display:flex;
    font-size:12px;
    margin-bottom:0.5rem;
    `;


const InfoProduct = styled.div`
    margin:0 3rem 0.5rem 1rem;
    min-width:130px;
    font-size:12px;
    font-style:italic;    
`;
const BillStyled = styled.div`
    box-shadow:1px 1px 25px -8px #BBB;
    padding:1rem 2rem;

`;
const TopStyled = styled.div`
    display:flex;
    justify-content:space-between;
    margin-bottom:0.5rem;
`;

const InfoStyled = styled.span`
    display:inline-block;
    color:#969696;
    font-weight:500;
    font-size:13px;
    min-width:70px;
`;

const InfoRowStyled = styled.div`
    border-bottom:1px solid #eee;
    padding:0.5rem 0;
    display:flex;
`;
const PersonInfoStyled = styled.span`
    width:18%;
    color:#969696;
    font-size:14px;
    font-weight:500;
    margin-right:1rem;
    `;
const InfoVerify = styled.div`
    font-size:14px;
    word-wrap: break-word;
    width: 70%;
`;
const CreateAtStyled = styled.span`
    font-size:10px;
    margin-right:0.5rem;
`;
function UserInfo() {

    const { user, isAuth } = useSelector(state => state.user.currentUser);

    const { isVisibleUserInfo } = useSelector(state => state.modals);

    const { loading } = useSelector(state => state.user);

    const dispatch = useDispatch();

    const defaultValues = React.useMemo(() => {
        return {
            name: user.name,
            email: user.email,
            userName: user.userName,
            address: user.address,
            phoneNumber: user.phoneNumber,
            avatar: '',
            passWord: user.passWord || ''
        }
    }, [user])

    const { control, handleSubmit, formState: { touchedFields } } = useForm({
        defaultValues,
        resolver: yupResolver(userInfoSchema)
    })

    const onSubmit = async values => {
        console.log(values);
        const fieldUpdate = [];

        console.log(touchedFields);
        for (let key in touchedFields) {
            fieldUpdate.push(key);
        }
        const formData = new FormData();

        formData.append("id", user._id);

        fieldUpdate.forEach(key => {
            formData.append(key, values[key]);
        })

        const { error, payload } = await dispatch(updateUserInfo(formData));
        if (error) {
            message.error(payload.message);
            return;
        }

        dispatch(getMe()).then(() => {
            message.success(`Your ${fieldUpdate.join(", ")} have been changed`);
        }).catch((err) => {
            message.error(err);
        });
    }

    const handleClose = () => {
        dispatch(switchUserInfoDrawer(false))
    }

    //handle user logout 
    const handleLogout = () => {
        dispatch(logout());
        handleClose();
        toastSuccess("See you later !", "BYE");
    }



    return (
        <WrapperUserInfo>
            <Banner title="Profile" />
            <WrapperMain>
                <TabStyled
                    tabBarGutter={5}
                    tabPosition="left"
                    hideAdd={true}>
                    <Tabs.TabPane tab="My infomation" key={1}>
                        <ContentStyled>

                            <FormStyled
                                layout="vertical"
                                initialValues={defaultValues}
                                onFinish={handleSubmit(onSubmit)}>
                                <AvatarSelectField
                                    name="avatar"
                                    control={control}
                                    value={user.avatar} />
                                <Row gutter={[40, 0]} style={{ marginBottom: "2rem" }}>
                                    <Col span={12}>
                                        <InputField
                                            name="userName"
                                            placeholder="User Name"
                                            label="Username"
                                            disabled={true}
                                            control={control} />
                                        <InputField
                                            name="name"
                                            placeholder="Your name"
                                            label="Name"
                                            control={control}
                                        />
                                        <InputField
                                            name="phoneNumber"
                                            placeholder="Your phone"
                                            label="Phone"
                                            control={control}
                                        />
                                    </Col>
                                    <Col span={12}>

                                        <InputField
                                            name="email"
                                            type="email"
                                            label="Email"
                                            placeholder="your email"
                                            control={control} />
                                        <InputField
                                            name="passWord"
                                            type='password'
                                            label="Password (hashed)"
                                            placeholder="Your password"
                                            control={control} />
                                        <InputField
                                            name="address"
                                            label="Address"
                                            placeholder="Your address"
                                            control={control}
                                        />
                                    </Col>
                                </Row>
                                <OrgangeButton
                                    loading={loading}
                                    htmlType="submit">
                                    Update
                                </OrgangeButton>
                            </FormStyled>
                        </ContentStyled>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="My bills" key={2}>
                        <ContentStyled>
                            <BillStyled>
                                <TopStyled>
                                    <div style={{ fontStyle: 'italic', borderBottom: '1px solid #0074D9' }}>
                                        <CreateAtStyled>Create at:</CreateAtStyled>
                                        <span>11/1/2021</span>
                                    </div>
                                    <div><TextYellowStyled >pending</TextYellowStyled></div>
                                </TopStyled>
                                <Divider />
                                <Row justify="center" gutter={[40, 0]}>
                                    <Col span={12}>
                                        <div>
                                            <InfoRowStyled>
                                                <PersonInfoStyled>Name:</PersonInfoStyled>
                                                <InfoVerify>aaaaa</InfoVerify>
                                            </InfoRowStyled>
                                            <InfoRowStyled>
                                                <PersonInfoStyled>Phone:</PersonInfoStyled>
                                                <InfoVerify>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</InfoVerify>
                                            </InfoRowStyled>
                                            <InfoRowStyled>
                                                <PersonInfoStyled>Address:</PersonInfoStyled>
                                                <InfoVerify>aaaaa</InfoVerify>
                                            </InfoRowStyled>
                                        </div>
                                    </Col>
                                    <Col span={12}>
                                        <div style={{ paddingLeft: "3rem", borderLeft: "1px solid #DDD" }}>
                                            <ProductStyled>
                                                <div style={{ display: 'flex' }}>
                                                    <img
                                                        width="50px"
                                                        height="60px"
                                                        src='http://localhost:8000/api/images/image23268518.png'
                                                        alt="bookImage" />
                                                    <NameProductStyled>aaaaaaa</NameProductStyled>
                                                    <div>Qty: <span>1 </span>4</div>
                                                    <div><span>Price: </span> csadsadsada</div>
                                                </div>
                                                {/* <span style={{ color: "#9387d9", marginLeft: '0.5rem' }}>x{item.quantity}</span> */}
                                            </ProductStyled>
                                        </div>
                                    </Col>
                                </Row>
                            </BillStyled>
                        </ContentStyled>
                    </Tabs.TabPane>
                </TabStyled>
            </WrapperMain >
        </WrapperUserInfo >
    );
}

export default UserInfo;