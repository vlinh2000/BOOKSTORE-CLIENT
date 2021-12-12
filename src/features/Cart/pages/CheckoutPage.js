import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import styled from 'styled-components';
import { Steps, Form, Radio, Space, Input, Divider, message, Row, Col } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';

import infoSchema from 'yup/infoSchema';
import { yupResolver } from '@hookform/resolvers/yup';

import InputField from 'custom-fields/InputFields';
import Banner from 'components/Banner';
import { mastercardLogo, momoLogo } from 'constants/Global';
import { Checkout } from '../cartSlice';
import { history } from 'App';
import SelectField from 'custom-fields/SelectFields';
import axios from 'axios';
import { BlueButton, DolartextStyled, PurpleButton, TextGreenStyled, TextRedStyled, TextYellowStyled, OrgangeButton } from 'assets/styles/globalStyle'
import { PaymentApi } from 'api/PaymentApi';




const StepStyled = styled(Steps)`
    padding:0 8rem;
    margin:0 auto;
    margin-bottom:2rem;
    .ant-steps-item-title{
        font-size:15px;
        font-weight:500;
        font-style:italic;
    }
    `;

const MainStyled = styled.div`
    margin-bottom:2rem;
    `;

const MainScreenStyled = styled.div`
    margin: 2rem 8rem;
    padding:3rem 3rem;
    min-height:300px;
    position:relative;
    box-shadow: 1px 1px 25px -12px #9387d9;
    `;

const TitleStyled = styled.p`
    
    font-weight:500;
    letter-spacing:0.5px;
    font-size:16px;
    
    `;

const TitleSubStyled = styled.p`
    
    font-style:italic;
    margin-top:10px;
    font-size:13px;
    color:#969696;
    
    & .pay-message{
        font-weight:bold;
    }

`;

const CardStyled = styled.div`
    margin-bottom:1rem;
`;


const CardItemStyled = styled.div`
    display:flex;
    align-items:center;
    padding:0.75rem 0;
    margin-left:2rem;
    border-bottom:1px solid #eee;

    & div{
        margin-left:1rem;
    }
    `;

const AccountInfoStyled = styled.span`
    display:inline-block;
    width:100px;
    color:#969696;
    font-size:12px;
    font-weight:500;
    margin-right:1rem;
    `;

const ControlButton = styled.div`
    display:flex;
    justify-content:space-between;
    margin:3rem 0;
    
    `;

const ProductStyled = styled.div`
    display:flex;
    font-size:12px;
    margin-bottom:0.5rem;
    `;


const ListProduct = styled.div`
    padding:0 2rem;
    border-right:1px solid #DDD;
    `;

const DivStyled = styled.div`
    display:flex;
    color:#969696;
    font-weight:500;
    
    & span{
        min-width:200px;
    }
    
    & div{
        color:#000;
        font-weight:500;
    }
    `;



const PayMethodDetail = styled.div``;

const InfoVerify = styled.div`
    font-size:14px;
    word-wrap: break-word;
    width: 80%;
`;
const PersonInfoStyled = styled.span`
    width:18%;
    color:#969696;
    font-size:14px;
    font-weight:500;
    margin-right:1rem;
    `;

const InfoRowStyled = styled.div`
    border-bottom:1px solid #eee;
    padding:0.5rem 0;
    display:flex;
`;

const NoteStyled = styled.p`
    text-align:center;
    margin-bottom:3rem;
    font-size:16px;
    font-style:italic;    
`;

const InfoProduct = styled.div`
    margin:0 3rem 0.5rem 1rem;
    min-width:130px;
    font-size:12px;
    font-style:italic;    
    `;

const NameProductStyled = styled.div`
    font-weight:bold;
    min-width:130px;
    `;
function CheckoutPage(props) {

    const { user: { name, phoneNumber, address } } = useSelector(state => state.user.currentUser);

    const defaultValues = {
        name,
        phoneNumber,
        addressDetail: '',
        province: null,
        district: null,
        ward: null
    }

    const { control, handleSubmit, setValue } = useForm({
        resolver: yupResolver(infoSchema), defaultValues: React.useMemo(() => defaultValues, [name, phoneNumber])
    });


    const { cartItem, totalPrice } = useSelector(state => state.cart);

    const [shipInfo, setShipInfo] = React.useState({ name, address, phoneNumber, payMethod: { currentMethod: 0, traddingCode: '' } });

    const [currentStep, setCurrentStep] = React.useState(0);

    const [isLoading, setIsLoading] = React.useState(false);

    const [isEdit, setIsEdit] = React.useState(false);

    const [payments, setPayments] = React.useState([]);

    const dispatch = useDispatch()

    const { isCheckOutStatus } = useSelector(state => state.cart);

    const [provinces, setProvinces] = React.useState([]);
    const [districts, setDistricts] = React.useState([]);
    const [wards, setWards] = React.useState([]);

    const [form] = Form.useForm();

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

    //handle fetch payments

    React.useEffect(() => {
        const fetchPayments = async () => {
            try {
                const response = await PaymentApi.get_All();
                setPayments(response.payments);

            } catch (error) {
                console.log(error);
            }
        }

        fetchPayments();

    }, [])

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

    const handleNext = () => {

        setIsLoading(true);
        const timerId = setTimeout(() => {

            setCurrentStep(prev => prev + 1);
            clearTimeout(timerId);
            setIsLoading(false);
        }, 1000)

    }

    const handlePrevious = () => {
        setCurrentStep(prev => prev - 1);
    }


    //handle save personal information
    const onSubmit = values => {
        const address = `${values.addressDetail} , ${values.ward.label} , ${values.district.label} , ${values.province.label}`
        const newInfo = {
            name: values.name,
            phoneNumber: values.phoneNumber,
            address
        }
        setShipInfo(prev => ({ ...prev, ...newInfo }));
        handleNext();
    }

    //handle choose payment method
    const handleChoosePayment = ({ target }) => {
        setShipInfo(prev => ({ ...prev, payMethod: { ...prev.payMethod, currentMethod: target.value } }));
    }

    const handleInputTraddingCode = value => {
        setShipInfo(prev => ({ ...prev, payMethod: { ...prev.payMethod, ...value } }));
        message.success("Saved !");
    }


    const handleOrder = () => {
        const payInfo = shipInfo.payMethod.currentMethod === 0 ? { pay: false } : { pay: true, traddingCode: shipInfo.payMethod.traddingCode };
        const billInfo = {
            products: cartItem,
            totalPrice,
            ...payInfo,
            receiver: shipInfo.name,
            phoneReceiver: shipInfo.phoneNumber,
            address: shipInfo.address,
        };

        const handleCheckout = async () => {
            const { errors, payload } = await dispatch(Checkout(billInfo));

            if (errors) {
                message.error(payload.message);
                return;
            }

            message.success("Add bill successfully ! Please wait a muniute for checking your bill .");
            history.push('/me', "bought");
        }

        handleCheckout();
    }

    return <div>
        <Banner title="Check out" />
        <MainStyled>
            <StepStyled current={currentStep}>
                <Steps.Step title="Check information" />
                <Steps.Step title="Check products" />
                <Steps.Step title="Payment method" />
                <Steps.Step title="Verify" />
            </StepStyled>
            {
                //STEP 1
                currentStep === 0
                    ? <MainScreenStyled>
                        <NoteStyled><InfoCircleOutlined />  This is your infomation to get goods</NoteStyled>
                        <Form initialValues={defaultValues} autoComplete={false} form={form} layout="vertical" onFinish={handleSubmit(onSubmit)}>
                            <Row justify="center" gutter={[40, 0]}>
                                <Col span={8} >
                                    <InputField
                                        name="name"
                                        placeholder="Name"
                                        label='Name'
                                        control={control} />

                                    <InputField
                                        name="phoneNumber"
                                        placeholder="Phone"
                                        label='Phone'
                                        control={control} />
                                    <SelectField
                                        name="province"
                                        placeholder="Province"
                                        label='Province'
                                        options={provinces}
                                        onSetValue={setValue}
                                        onChosen={fetchDistrict}
                                        control={control} />

                                </Col>
                                <Col span={8}>
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

                                    <InputField
                                        name="addressDetail"
                                        placeholder="Address detail"
                                        label="Address detail"
                                        control={control} />
                                </Col>
                            </Row>


                            <ControlButton>
                                <BlueButton
                                    style={{ height: 40 }}
                                    type="primary"
                                    onClick={() => history.push("/cart")} >
                                    Back to cart
                                </BlueButton>
                                <OrgangeButton
                                    disabled={isEdit}
                                    htmlType="submit"
                                    loading={isLoading}
                                >
                                    Next step
                                </OrgangeButton>
                            </ControlButton>

                        </Form>
                    </MainScreenStyled>
                    //STEP 2
                    : currentStep === 1
                        ? <MainScreenStyled>
                            <NoteStyled><InfoCircleOutlined /> All your product, please check after order</NoteStyled>
                            <Row justify="center" gutter={[40, 0]}>
                                <Col span={9}>
                                    <ListProduct>
                                        {
                                            cartItem.map(item => (<ProductStyled key={item._id}>
                                                <img
                                                    width="50px"
                                                    height="70px"
                                                    src={item.image}
                                                    alt="bookImage" />

                                                <InfoProduct>
                                                    <NameProductStyled>{item.name}</NameProductStyled>
                                                    <span>Qty:</span> <span>{item.quantity}</span>
                                                    <div><span>Price:</span> {item.price}</div>
                                                </InfoProduct>
                                                <span>Sub: {item.subTotal}</span>
                                            </ProductStyled>))
                                        }
                                    </ListProduct>

                                </Col>
                                <Col span={7}>
                                    <DivStyled>
                                        <span>Subtotal</span>
                                        <div>{totalPrice}</div>
                                    </DivStyled>
                                    <Divider />
                                    <DivStyled>
                                        <span>Shipping</span>
                                        <div>Free shipping</div>
                                    </DivStyled>
                                    <Divider />
                                    <DivStyled>
                                        <span>Total</span>
                                        <span style={{ fontSize: 25, fontWeight: 'bold', color: "#ea5455" }}>{totalPrice} <DolartextStyled>dolars</DolartextStyled></span>
                                    </DivStyled>
                                </Col>
                            </Row>
                            <ControlButton>
                                <BlueButton onClick={handlePrevious}  >Previous step</BlueButton>
                                <OrgangeButton loading={isLoading} onClick={handleNext}>Next step</OrgangeButton>
                            </ControlButton>


                        </MainScreenStyled>
                        //StEP 3
                        : currentStep === 2 ? <MainScreenStyled>
                            <TitleStyled> Please choose one payment method </TitleStyled>

                            <div style={{ marginLeft: '2rem' }}>
                                <Radio.Group defaultValue={shipInfo.payMethod.currentMethod} onChange={handleChoosePayment}>
                                    <Space align="start" direction="vertical">
                                        <Radio value={0} >Payment on delivery</Radio>
                                        <Radio value={1} >Payment right now by master card Or electronic wallet</Radio>
                                    </Space>
                                </Radio.Group>
                                {shipInfo.payMethod.currentMethod === 1 && (<PayMethodDetail>
                                    <TitleSubStyled> Quý khách vui lòng chuyển khoản qua số tài khoản bên dưới và nhập mã giao dịch để được xác nhận hóa đơn [<span className="pay-message">Cú pháp: {`<VLINH> <Your name>`}</span>]</TitleSubStyled>
                                    <CardStyled>
                                        {payments?.map(payment => <CardItemStyled key={payment._id}>
                                            <img width="100px" height="70px" src={`${process.env.REACT_APP_API_URL}/${payment.paymentLogo}`} alt="mastercard" />
                                            <div>
                                                <div> <AccountInfoStyled>Account number:</AccountInfoStyled> <span>{payment.accountNumber}</span></div>
                                                <div> <AccountInfoStyled>Account holder:</AccountInfoStyled> <span>{payment.holder.toUpperCase()}</span></div>
                                            </div>
                                        </CardItemStyled>)}
                                    </CardStyled>
                                    <Form
                                        layout="inline"
                                        onFinish={handleInputTraddingCode}  >
                                        <Form.Item
                                            initialValue={shipInfo.payMethod.traddingCode}
                                            name="traddingCode"
                                            rules={[{ required: true, message: "Vui lòng nhập mã giao dịch!" }]} >
                                            <Input placeholder="Nhập mã giao dịch tại đây" />
                                        </Form.Item>
                                        <PurpleButton htmlType="submit"> Apply</PurpleButton>
                                    </Form>
                                </PayMethodDetail>)}

                            </div>

                            <ControlButton>
                                <BlueButton onClick={handlePrevious}>Previous step</BlueButton>
                                <OrgangeButton
                                    disabled={shipInfo.payMethod.currentMethod === 1 && shipInfo.payMethod.traddingCode === ''}
                                    loading={isLoading}
                                    onClick={handleNext}>Next step</OrgangeButton>
                            </ControlButton>

                        </MainScreenStyled> :
                            //STEP 4
                            <MainScreenStyled>
                                <NoteStyled> Bill Information </NoteStyled>
                                <Row justify="center" gutter={[40, 0]}>
                                    <Col span={12} style={{ flexFlow: "none" }}>
                                        <div>
                                            <InfoRowStyled>
                                                <PersonInfoStyled>Name:</PersonInfoStyled>
                                                <InfoVerify>{shipInfo.name}</InfoVerify>
                                            </InfoRowStyled>
                                            <InfoRowStyled>
                                                <PersonInfoStyled>Phone:</PersonInfoStyled>
                                                <InfoVerify>{shipInfo.phoneNumber}</InfoVerify>
                                            </InfoRowStyled>
                                            <InfoRowStyled>
                                                <PersonInfoStyled>Address:</PersonInfoStyled>
                                                <InfoVerify>{shipInfo.address}</InfoVerify>
                                            </InfoRowStyled>
                                            <InfoRowStyled>
                                                <PersonInfoStyled>Pay status:</PersonInfoStyled>
                                                <InfoVerify>{shipInfo.payMethod.currentMethod === 1 ? <TextGreenStyled>paid</TextGreenStyled> : <TextRedStyled>unpaid</TextRedStyled>}</InfoVerify>
                                            </InfoRowStyled>
                                            {shipInfo.payMethod.currentMethod === 1
                                                &&
                                                <InfoRowStyled>
                                                    <PersonInfoStyled>Trading code:</PersonInfoStyled>
                                                    <InfoVerify><TextYellowStyled>{shipInfo.payMethod.traddingCode}</TextYellowStyled></InfoVerify>
                                                </InfoRowStyled>}
                                            <InfoRowStyled>
                                                <PersonInfoStyled>Total :</PersonInfoStyled>
                                                <InfoVerify style={{ fontSize: 25, fontWeight: 'bold', color: "#ea5455" }}>{totalPrice} <DolartextStyled>dolars</DolartextStyled></InfoVerify>
                                            </InfoRowStyled>

                                        </div>
                                    </Col>
                                    <Col span={9}>
                                        <div style={{ paddingLeft: "3rem", borderLeft: "1px solid #DDD" }}>
                                            {
                                                cartItem.map(item => (<ProductStyled key={item._id}>
                                                    <div style={{ display: 'flex' }}>
                                                        <img
                                                            width="50px"
                                                            height="60px"
                                                            src={item.image}
                                                            alt="bookImage" />
                                                        <div style={{ marginLeft: '1rem', marginRight: '6rem', flexGrow: 1 }}>
                                                            <NameProductStyled>{item.name}</NameProductStyled>
                                                            <div><span>Price:</span> {item.price}</div>
                                                            <div><span>Qty:</span> {item.quantity}</div>
                                                        </div>
                                                    </div>
                                                    {/* <span style={{ color: "#9387d9", marginLeft: '0.5rem' }}>x{item.quantity}</span> */}
                                                </ProductStyled>))
                                            }
                                        </div>
                                    </Col>
                                </Row>
                                <ControlButton>
                                    <BlueButton onClick={handlePrevious} >Previous step</BlueButton>
                                    <OrgangeButton
                                        style={{ width: 450 }}
                                        loading={isCheckOutStatus}
                                        onClick={handleOrder}
                                        block={true}>ORDER</OrgangeButton>
                                </ControlButton>
                            </MainScreenStyled>

            }
        </MainStyled>
    </div >
}

export default CheckoutPage;