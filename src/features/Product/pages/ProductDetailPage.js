import React from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router';
import styled from 'styled-components';
import { Breadcrumb, Button, Col, Divider, Row, Typography } from 'antd';
import { BookOutlined, HeartOutlined, HomeOutlined, MinusOutlined, PlusOutlined, UserOutlined } from '@ant-design/icons';
import ProductRelated from '../Components/ProductRelated';
import ProductComment from '../Components/ProductComment';
import ProductEvaluateForm from '../Components/ProductEvaluateForm';

ProductDetailPage.propTypes = {

};

const Wrapper = styled.div`
    line-height:55px;
    padding:2rem 2rem
`;


const TitleStyled = styled.div`
    font-size:30px;
    font-weight:bold;
`;

const PriceStyled = styled.div`

    font-weight:500;
    color:#9387d9; 
    font-size:25px;

`;

const DecriptionStyled = styled.div`

    font-size:13px;
    color:#969696;
    line-height:20px;
    letter-spacing:0.5px;
`;

const NumberInStockStyled = styled.div`
    font-size:12px;
    font-weight:bold;
`;

const ButtonStyled = styled(Button)`
    width:100%;
    border-radius:30px;
    font-size:12px;
    background:#000;
    font-weight:500;
    color:#CCC;
    background:${props => props.bgcolor};
    min-height:45px;

    &:hover{
        background:#7060cd;
        border-color:#7060cd;
        color:#FFF;
    }

`;

const InfoStyled = styled.div`

    line-height:25px;
    font-size:13px;
    color:#969696;
    letter-spacing:0.5px;
`;

const ButtonGroupStyled = styled.div`

    border: 2px solid #969696;
    display:flex;
    justify-content:space-around;
    align-items:center;
    font-size:13px;
    font-weight:bold;
    border-radius:30px;
    height:40px;


`;

const ButtonSmallStyled = styled(Button)`
    &:hover{
        color:#FFF ;
        color:${props => props.color};
        border-color:${props => props.borderColor};
        background:${props => props.bgcolor}
    }
`;

const GroupImage = styled.div`
    margin:2rem;
    
    & img{
        margin-right:1rem;
    }
`;

function ProductDetailPage(props) {
    const { bookId } = useParams();

    return (
        <Wrapper>
            <Row justify="center" >
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 10 }}>
                    <img
                        height="550px"
                        width="450px"
                        src="https://wpbingosite.com/wordpress/tikie/wp-content/uploads/2020/12/Image-29.jpg"
                        alt="mainPhoto" />
                    <GroupImage>
                        <img
                            width="100px"
                            height="120px"
                            src="https://wpbingosite.com/wordpress/tikie/wp-content/uploads/2020/12/Image-29.jpg"
                            alt="mainPhoto" />
                        <img
                            width="100px"
                            height="120px"
                            src="https://wpbingosite.com/wordpress/tikie/wp-content/uploads/2020/12/Image-31.jpg"
                            alt="mainPhoto" />
                        <img
                            width="100px"
                            height="120px"
                            src="https://wpbingosite.com/wordpress/tikie/wp-content/uploads/2020/12/Image-32.jpg"
                            alt="mainPhoto" />
                    </GroupImage>
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 9 }}>
                    <Breadcrumb separator=">">
                        <Breadcrumb.Item href="/product">
                            <HomeOutlined />
                        </Breadcrumb.Item>
                        <Breadcrumb.Item href="">
                            <BookOutlined />
                            <span>Fiends In the Forest</span>
                        </Breadcrumb.Item>
                    </Breadcrumb>
                    <TitleStyled>Fiends In the Forest</TitleStyled>
                    <PriceStyled>$115.00</PriceStyled>
                    <Divider />
                    <DecriptionStyled>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</DecriptionStyled>
                    <NumberInStockStyled>30 in stock</NumberInStockStyled>
                    <Row
                        justify="center"
                        gutter={10}
                        align="middle">
                        <Col span={5}>
                            <ButtonGroupStyled>
                                <ButtonSmallStyled
                                    color="#9387d9"
                                    type='text'
                                    size='small'
                                    icon={<PlusOutlined />} />
                                <span>1</span>
                                <ButtonSmallStyled
                                    color="#9387d9"
                                    type='text'
                                    size='small'
                                    icon={<MinusOutlined />} />
                            </ButtonGroupStyled>
                        </Col>
                        <Col span={16}>
                            <ButtonStyled>ADD TO CART</ButtonStyled>
                        </Col>
                        <Col span={3}>
                            <ButtonSmallStyled
                                size="large"
                                borderColor="#9387d9"
                                bgcolor="#9387d9"
                                size='large'
                                shape="circle"
                                icon={<HeartOutlined />}>
                            </ButtonSmallStyled>
                        </Col>
                    </Row>
                    <ButtonStyled
                        bgcolor="#9387d9"
                    >BUY NOW</ButtonStyled>
                    <Divider />
                    <InfoStyled>
                        <div>
                            <span>Category:</span>
                            <span style={{ marginLeft: '0.5rem', fontWeight: 'bold', color: "#000" }}>Hornor</span>
                        </div>
                        <div>
                            <span>Author:</span>
                            <span style={{ marginLeft: '0.5rem', fontWeight: 'bold', color: "#000" }}>Adam Strass</span>
                        </div>
                    </InfoStyled>
                </Col>
            </Row>
            <Divider />
            <ProductComment />
            <ProductEvaluateForm />
            <ProductRelated />
        </Wrapper>
    );
}

export default ProductDetailPage;