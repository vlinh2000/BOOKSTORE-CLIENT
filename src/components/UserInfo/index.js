import React from 'react';
import { Avatar, Button, Drawer, Form, message, Tooltip, Tabs, Divider, Row, Col, Steps, Badge, Popconfirm } from 'antd';
import InputField from 'custom-fields/InputFields';
import { AccountBookOutlined, CarOutlined, HistoryOutlined, HomeOutlined, HourglassOutlined, LogoutOutlined, MailOutlined, PhoneOutlined, SmileOutlined, UserOutlined } from '@ant-design/icons';
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
import { BlueButton, DolartextStyled, OrgangeButton, RedButton, TextGreenStyled, TextOrgangeStyled, TextRedStyled, TextYellowStyled, YellowButton } from 'assets/styles/globalStyle';
import { history } from 'App';
import { billApi } from 'api/BillApi';
import moment from 'moment';
import { date } from 'yup/lib/locale';

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

   .ant-tabs-tab{
       font-weight:bold;
       color:#969696;
   }
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

const FormStyled = styled(Form)`
    box-shadow:1px 1px 25px -8px #BBB;
    padding:2rem 3rem;
    `;

const ContentStyled = styled.div`
   max-width:800px;
   margin:0 auto;
`;
const NameProductStyled = styled.div`
    font-weight:500;
    min-width:130px;
    max-width:90%;
    word-wrap:break-word;
    `;
const ProductStyled = styled.div`
    font-size:12px;
    margin-bottom:0.5rem;
    width:50%;
    `;


const InfoProduct = styled.div`
    margin:0 3rem 0.5rem 1rem;
    min-width:130px;
    font-size:12px;
    font-style:italic;    
`;
const BillStyled = styled.div`
    box-shadow:1px 1px 25px -8px #BBB;
    padding:1rem 2rem 2rem 2rem;
    margin-bottom:1rem;
`;
const TopStyled = styled.div`
    display:flex;
    justify-content:space-between;
    margin-bottom:0.5rem;
    `;

const TitleStyled = styled.div`
    color:#888;
    font-weight:bold;
    font-size:17px;
    margin-bottom:1rem;
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

const StepStyled = styled(Steps)`
    margin-bottom:1rem;
    .ant-steps-item{
        padding:1rem 0;
    }
`;
function UserInfo() {

    const { user, isAuth } = useSelector(state => state.user.currentUser);

    const { isVisibleUserInfo } = useSelector(state => state.modals);

    const { loading } = useSelector(state => state.user);

    const [billStatus, setBillStatus] = React.useState({});

    const [bills, setBills] = React.useState([]);

    const [isLoading, setIsLoading] = React.useState(false);

    const [isChange, setIsChange] = React.useState(false);

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

    React.useEffect(() => {
        const fetchBills = async () => {
            try {
                const response = await billApi.getAll();
                let billStatus = {
                    Pending: 0,
                    Shipping: 0,
                    Delivered: 0
                };


                response.bills?.forEach(bill => {
                    billStatus[bill.status]++;
                })
                setBillStatus(billStatus);
                const sortBill = response.bills.sort((a, b) => new Date(b.createAt) - new Date(a.createAt))
                console.log(sortBill);
                setBills(sortBill);
            } catch (error) {
                message.error(error);
            }
        }
        fetchBills();
    }, [isChange])


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

    const onUpdate = async (billId, status) => {
        try {
            const response = await billApi.update(billId, { status });
            setIsLoading(false)
            setIsChange(prev => !prev);
        } catch (error) {
            // const errMessage = error.response.data;
            message.error(error)
            setIsLoading(false)
        }
    }


    const handleDelivered = (billId) => {
        console.log(billId);
        setIsLoading(true);
        onUpdate(billId, "Delivered");
    }

    //handle cancel order when wait comfirm
    const handleCancelOrder = (billId) => {
        console.log(billId);
        setIsLoading(true);
        onUpdate(billId, "Canceled");
    }



    return (
        <WrapperUserInfo>
            <Banner title="Profile & Bills" />
            <WrapperMain>
                <TabStyled
                    tabBarGutter={5}
                    tabPosition="left"
                    hideAdd={true}>
                    <Tabs.TabPane tab="My profile" key={1}>
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
                            <StepStyled style={{ marginTop: 5 }}>
                                <Steps.Step
                                    subTitle="Pending"
                                    icon={
                                        <Badge
                                            count={billStatus.Pending || 0}>
                                            <HourglassOutlined style={{ fontSize: 25 }} />
                                        </Badge>}>

                                </Steps.Step>
                                <Steps.Step
                                    subTitle="Shipping"
                                    icon={
                                        <Badge
                                            count={billStatus.Shipping || 0}>
                                            <CarOutlined
                                                style={{ fontSize: 25 }} />
                                        </Badge>}>

                                </Steps.Step>
                                <Steps.Step
                                    subTitle="Delivered"
                                    icon={
                                        <Badge
                                            count={billStatus.Delivered || 0}>
                                            <HomeOutlined
                                                style={{ fontSize: 25 }} />
                                        </Badge>}>

                                </Steps.Step>

                            </StepStyled>
                            <TitleStyled>
                                <HistoryOutlined
                                    style={{ fontSize: 13, marginRight: 5 }} />
                                history ({bills.length || 0})
                            </TitleStyled>
                            {
                                bills?.map((bill, index) => <BillStyled>
                                    <TopStyled key={bill._id}>
                                        <div style={{ fontStyle: 'italic', borderBottom: '1px solid #0074D9' }}>
                                            <CreateAtStyled>Create at:</CreateAtStyled>
                                            <span>{moment(bill.createAt).format("DD/MM/YYYY HH:MM")}</span>
                                        </div>
                                        <div>
                                            {bill.status === 'Pending' ? <TextYellowStyled >{bill.status}</TextYellowStyled> :
                                                bill.status === 'Shipping' ? <TextOrgangeStyled >{bill.status}</TextOrgangeStyled> :
                                                    bill.status === 'Canceled' ? <TextRedStyled >{bill.status}</TextRedStyled> :
                                                        <TextGreenStyled >{bill.status}</TextGreenStyled>
                                            }
                                        </div>
                                    </TopStyled>
                                    <Divider />
                                    <Row justify="center" gutter={[10, 0]}>
                                        <Col span={12}>
                                            <div>
                                                <InfoRowStyled>
                                                    <PersonInfoStyled>Name:</PersonInfoStyled>
                                                    <InfoVerify>{bill.receiver}</InfoVerify>
                                                </InfoRowStyled>
                                                <InfoRowStyled>
                                                    <PersonInfoStyled>Phone:</PersonInfoStyled>
                                                    <InfoVerify>{bill.phoneReceiver}</InfoVerify>
                                                </InfoRowStyled>
                                                <InfoRowStyled>
                                                    <PersonInfoStyled>Address:</PersonInfoStyled>
                                                    <InfoVerify>{bill.address}</InfoVerify>
                                                </InfoRowStyled>
                                                <InfoRowStyled>
                                                    <PersonInfoStyled>{bill.status !== 'Delivered' ? 'Expected delivery:' : 'Received'}</PersonInfoStyled>
                                                    <InfoVerify>{moment(bill.receivedDate).format("DD/MM/YYYY")}</InfoVerify>
                                                </InfoRowStyled>
                                                <InfoRowStyled>
                                                    <PersonInfoStyled>Total:</PersonInfoStyled>
                                                    <InfoVerify style={{ fontSize: 25, fontWeight: 'bold', color: "#ea5455" }}>{bill.totalPrice} <DolartextStyled>dolars</DolartextStyled></InfoVerify>
                                                </InfoRowStyled>
                                            </div>
                                        </Col>
                                        <Col span={12}>
                                            <div style={{ paddingLeft: "3rem", borderLeft: "1px solid #DDD" }}>

                                                {
                                                    bill.products?.map(product => <ProductStyled key={product._id}>
                                                        <div style={{ display: 'flex' }}>
                                                            <img
                                                                width="50px"
                                                                height="60px"
                                                                src={product.image}
                                                                alt="bookImage" />
                                                            <div style={{ marginLeft: "1rem" }}>
                                                                <NameProductStyled>{product.name}</NameProductStyled>
                                                                <div>Qty: <span>{product.quantity}</span></div>
                                                                <div>
                                                                    Price:<span>{product.price}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {/* <span style={{ color: "#9387d9", marginLeft: '0.5rem' }}>x{item.quantity}</span> */}
                                                    </ProductStyled>)
                                                }
                                            </div>
                                            <Divider />
                                        </Col>
                                    </Row>
                                    {bill.status === 'Pending' ?
                                        <Popconfirm
                                            onConfirm={() => handleCancelOrder(bill._id)}
                                            title="Are you sure?">
                                            <RedButton
                                                loading={isLoading}
                                                style={{ marginTop: '1rem' }}>
                                                Cancel order
                                            </RedButton>
                                        </Popconfirm> :
                                        bill.status === 'Shipping' && <Popconfirm
                                            onConfirm={() => handleDelivered(bill._id)}
                                            title="Did you received ?"
                                            okText="Yes" cancelText="No">
                                            <BlueButton
                                                loading={isLoading}
                                                style={{ marginTop: '1rem' }}>
                                                Delivered?
                                            </BlueButton>
                                        </Popconfirm>}
                                </BillStyled>)


                            }
                        </ContentStyled>
                    </Tabs.TabPane>
                </TabStyled>
            </WrapperMain >
        </WrapperUserInfo >
    );
}

export default UserInfo;