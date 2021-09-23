import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import styled from 'styled-components';
import { Button, Steps, Form, Radio, Space, Input, Divider, Tooltip, message, Row, Col } from 'antd';
import {
    CheckOutlined, CloseCircleFilled, DollarCircleOutlined, DollarOutlined,
    EditOutlined, SaveOutlined, SwapLeftOutlined, SwapRightOutlined
} from '@ant-design/icons';

import infoSchema from 'yup/infoSchema';
import { yupResolver } from '@hookform/resolvers/yup';

import InputField from 'custom-fields/InputFields';
import Banner from 'components/Banner';
import { mastercardLogo, momoLogo } from 'constants/Global';
import { Checkout } from '../cartSlice';
import { history } from 'App';




const StepStyled = styled(Steps)`
    width:50%;
    margin:0 auto;
    margin-bottom:2rem;
    `;

const MainStyled = styled.div`

    margin-bottom:2rem;
    `;

const ButtonStyled = styled(Button)`
    
    font-size:12px;
    font-weight:500;
    background:#AAA;
    color:#FFF;
    height:40px;
    width:45%;
    &:hover,&:focus{
        border:none;
        color:#EEE;
        background:#9387d9 ;
        
    }
    
    `;
const ButtonPreviousNextStyled = styled(Button)`
    
    font-size:12px;
    font-weight:500;
    background:#000;
    color:#FFF;
    &:hover,&:focus{
        border:none;
        color:#EEE;
        background:#9387d9 ;
        
    }
    
    `;

const MainScreenStyled = styled.div`
    
    width:50%;
    margin:0 auto;
    padding:2rem 10rem;
    min-height:300px;
    position:relative;
    box-shadow: 1px 1px 2px 1px #9387d9;
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
    justify-content:space-around;
    align-items:center;
    padding:0.75rem 0;
    border-bottom:1px solid #eee;
    `;

const AccountInfoStyled = styled.span`
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
    justify-content:space-between;
    font-size:12px;
    margin-bottom:0.5rem;
    `;


const ListProduct = styled.div`
    max-height:200px;
    overflow-y:auto;
    padding:0 1rem;
    `;

const DivStyled = styled.div`
    display:flex;
    justify-content:space-between;
    color:#969696;
    font-weight:500;
    
    & div{
        color:#000;
        font-weight:500;
    }
    `;


const MainVerify = styled.div`
    display:flex;
    border-bottom:1px solid #eee;
    border-top:1px solid #eee;
    padding:3rem 0;
    
    `;

const PayMethodDetail = styled.div``;

const InfoVerify = styled.span`
    
    font-weight:bold;
    font-size:14px;
    color:#9387d9;
    
    
`;

const InfoRowStyled = styled(Row)`
    border-bottom:1px solid #eee;
    padding:0.5rem 0;
`;

function CheckoutPage(props) {

    const { user: { name, address, phoneNumber } } = useSelector(state => state.user.currentUser);

    const { control, handleSubmit } = useForm({
        resolver: yupResolver(infoSchema), defaultValues: {
            name,
            phoneNumber,
            address
        }
    });


    const { cartItem, totalPrice } = useSelector(state => state.cart);

    const [currentStep, setCurrentStep] = React.useState(0);

    const [isLoading, setIsLoading] = React.useState(false);

    const [shipInfo, setShipInfo] = React.useState({ name, address, phoneNumber, payMethod: { currentMethod: 0, traddingCode: '' } });

    const [isEdit, setIsEdit] = React.useState(false);

    const dispatch = useDispatch()

    const { isCheckOutStatus } = useSelector(state => state.cart);

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
        setShipInfo(prev => ({ ...prev, ...values }));
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
            history.push('/product');
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
                        <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
                            <InputField
                                name="name"
                                placeholder="Name"
                                label='Name'
                                disabled={!isEdit}
                                control={control} />

                            <InputField
                                name="phoneNumber"
                                placeholder="Phone number"
                                label='Phone number'
                                disabled={!isEdit}
                                control={control} />

                            <InputField
                                name="address"
                                placeholder="Address"
                                label="Address"
                                disabled={!isEdit}
                                control={control} />


                            <ControlButton>
                                <Button
                                    danger={!isEdit}
                                    type="primary"
                                    onClick={() => setIsEdit(prev => !prev)}
                                    icon={isEdit ? <SaveOutlined /> : <EditOutlined />}>{isEdit ? 'Save' : "Edit"}</Button>
                                <Tooltip title="Next step">
                                    <ButtonPreviousNextStyled
                                        disabled={isEdit}
                                        htmlType="submit"
                                        loading={isLoading}
                                        icon={<SwapRightOutlined />
                                        } />
                                </Tooltip>
                            </ControlButton>

                        </Form>
                    </MainScreenStyled>
                    //STEP 2
                    : currentStep === 1
                        ? <MainScreenStyled>
                            <TitleStyled>Products</TitleStyled>
                            <ListProduct>
                                {
                                    cartItem.map(item => (<ProductStyled key={item._id}>
                                        <div style={{ display: 'flex' }}>
                                            <img
                                                width="50px"
                                                height="60px"
                                                src={item.image}
                                                alt="bookImage" />
                                            <div style={{ marginLeft: '1rem' }}>
                                                <div>{item.name}</div>
                                                <span>Qty:</span> <span>{item.quantity}</span>
                                                <div><span>Price:</span> {item.price}</div>
                                            </div>
                                        </div>
                                        <span><DollarCircleOutlined /> {item.subTotal}</span>
                                    </ProductStyled>))
                                }
                            </ListProduct>
                            <Divider />
                            <DivStyled>
                                <span>Subtotal</span>
                                <div><DollarOutlined /> {totalPrice}</div>
                            </DivStyled>
                            <Divider />
                            <DivStyled>
                                <span>Shipping</span>
                                <div>Free shipping</div>
                            </DivStyled>
                            <Divider />
                            <DivStyled>
                                <span>Total</span>
                                <span style={{ fontSize: 25, fontWeight: 'bold', color: "#000" }}><DollarOutlined /> {totalPrice}</span>
                            </DivStyled>
                            <ControlButton>
                                <Tooltip title="Previous step">
                                    <ButtonPreviousNextStyled onClick={handlePrevious} icon={<SwapLeftOutlined />} />
                                </Tooltip>
                                <Tooltip title="Next step">
                                    <ButtonPreviousNextStyled loading={isLoading} onClick={handleNext} icon={<SwapRightOutlined />} />
                                </Tooltip>
                            </ControlButton>


                        </MainScreenStyled>
                        //StEP 3
                        : currentStep === 2 ? <MainScreenStyled>
                            <TitleStyled>  Please choose one payment method </TitleStyled>

                            <Radio.Group defaultValue={shipInfo.payMethod.currentMethod} onChange={handleChoosePayment}>
                                <Space align="start" direction="vertical">
                                    <Radio value={0} >Payment on delivery</Radio>
                                    <Radio value={1} >Payment right now by master card Or electronic wallet</Radio>
                                </Space>
                            </Radio.Group>
                            {shipInfo.payMethod.currentMethod === 1 && (<PayMethodDetail>
                                <TitleSubStyled> Quý khách vui lòng chuyển khoản qua số tài khoản bên dưới và nhập mã giao dịch để được xác nhận hóa đơn [<span className="pay-message">Cú pháp: {`<VLINH> <Your name>`}</span>]</TitleSubStyled>
                                <CardStyled>
                                    <CardItemStyled>
                                        <img width="100px" height="70px" src={mastercardLogo} alt="mastercard" />
                                        <div>
                                            <div> <AccountInfoStyled>Account number:</AccountInfoStyled> <span>837104719132</span></div>
                                            <div> <AccountInfoStyled>Account holder:</AccountInfoStyled> <span>TRUONG VIET LINH</span></div>
                                        </div>
                                    </CardItemStyled>
                                    <CardItemStyled>
                                        <img width="100px" height="70px" src={momoLogo} alt="mastercard" />
                                        <div>
                                            <div> <AccountInfoStyled>Account number:</AccountInfoStyled> <span>0387746666</span></div>
                                            <div> <AccountInfoStyled>Account holder:</AccountInfoStyled> <span>TRUONG VIET LINH</span></div>
                                        </div>
                                    </CardItemStyled>
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
                                    <Button htmlType="submit"> Apply</Button>
                                </Form>
                            </PayMethodDetail>)}



                            <ControlButton>
                                <Tooltip title="Previous step">
                                    <ButtonPreviousNextStyled onClick={handlePrevious} icon={<SwapLeftOutlined />} />
                                </Tooltip>
                                <Tooltip title="Next step">
                                    <ButtonPreviousNextStyled
                                        disabled={shipInfo.payMethod.currentMethod === 1 && shipInfo.payMethod.traddingCode === ''}
                                        loading={isLoading}
                                        onClick={handleNext}
                                        icon={<SwapRightOutlined />} />
                                </Tooltip>
                            </ControlButton>

                        </MainScreenStyled> :
                            //STEP 4
                            <MainScreenStyled>
                                <TitleStyled style={{ textAlign: 'center' }}> Bill Information </TitleStyled>
                                <MainVerify>
                                    <div style={{ flexGrow: 1 }}>
                                        <InfoRowStyled>
                                            <Col span={8}>
                                                <AccountInfoStyled>Name:</AccountInfoStyled>
                                            </Col>
                                            <Col span={16}>
                                                <InfoVerify>{shipInfo.name.toUpperCase()}</InfoVerify>
                                            </Col>
                                        </InfoRowStyled>
                                        <InfoRowStyled>
                                            <Col span={8}>
                                                <AccountInfoStyled>Phone:</AccountInfoStyled>
                                            </Col>
                                            <Col span={16}>
                                                <InfoVerify>{shipInfo.phoneNumber}</InfoVerify>
                                            </Col>
                                        </InfoRowStyled>
                                        <InfoRowStyled>
                                            <Col span={8}>
                                                <AccountInfoStyled>Address:</AccountInfoStyled>
                                            </Col>
                                            <Col span={16}>
                                                <InfoVerify>{shipInfo.address}</InfoVerify>
                                            </Col>
                                        </InfoRowStyled>
                                        <InfoRowStyled>
                                            <Col span={8}>
                                                <AccountInfoStyled>Pay status:</AccountInfoStyled>
                                            </Col>
                                            <Col span={16}>
                                                <InfoVerify>{shipInfo.payMethod.currentMethod === 1 ? <CheckOutlined /> : <CloseCircleFilled />}</InfoVerify>
                                            </Col>
                                        </InfoRowStyled>
                                        {shipInfo.payMethod.currentMethod === 1
                                            &&
                                            <InfoRowStyled>
                                                <Col span={8}>
                                                    <AccountInfoStyled>Tradding code:</AccountInfoStyled>
                                                </Col>
                                                <Col span={16}>
                                                    <InfoVerify>{shipInfo.payMethod.traddingCode}</InfoVerify>
                                                </Col>
                                            </InfoRowStyled>}
                                        <InfoRowStyled>
                                            <Col span={8}>
                                                <AccountInfoStyled>Total :</AccountInfoStyled>
                                            </Col>
                                            <Col span={16}>
                                                <InfoVerify><DollarOutlined /> {totalPrice}</InfoVerify>
                                            </Col>
                                        </InfoRowStyled>

                                    </div>
                                    <ListProduct>
                                        {
                                            cartItem.map(item => (<ProductStyled key={item._id}>
                                                <div style={{ display: 'flex' }}>
                                                    <img
                                                        width="50px"
                                                        height="60px"
                                                        src={item.image}
                                                        alt="bookImage" />
                                                    <div style={{ marginLeft: '0.5rem' }}>
                                                        <div>{item.name}</div>
                                                        <div><span>Price:</span> {item.price}</div>
                                                    </div>
                                                </div>
                                                <span style={{ color: "#9387d9", marginLeft: '0.5rem' }}>x{item.quantity}</span>
                                            </ProductStyled>))
                                        }
                                    </ListProduct>
                                </MainVerify>
                                <ControlButton>
                                    <Tooltip title="Previous step">
                                        <ButtonPreviousNextStyled onClick={handlePrevious} icon={<SwapLeftOutlined />} />
                                    </Tooltip>
                                    <ButtonStyled
                                        loading={isCheckOutStatus}
                                        onClick={handleOrder}
                                        block={true}>ORDER</ButtonStyled>
                                </ControlButton>
                            </MainScreenStyled>

            }
        </MainStyled>
    </div>
}

export default CheckoutPage;