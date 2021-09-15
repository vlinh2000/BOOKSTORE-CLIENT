import { Col, Row, Typography } from 'antd';
import { Paymet } from 'constants/Global';
import React from 'react';
import styled from 'styled-components';


const TitleStyled = styled(Typography)`
    width:100%;
    font-size:12px;
    font-weight:500;
    letter-spacing:1px;

`;

const WrapperList = styled.div`

    font-size:12px;
    line-height:27px;
    margin-top:0.5rem;
    font-weight:500;
    
    a,span{
        color:#969696;
        display:block;

        &:hover{
            color:#9387d9 ;
        }
    }


`;

const FooterStyled = styled.div`
    height:40px;
    background:#000;
    color:#969696;
    text-align:center;
    line-height:40px;
    margin-top:3rem;
`;

const Wrapper = styled.div`
    margin-top:5rem;
`;

const Footer = () => {
    return (
        <Wrapper>
            <Row gutter={[10, 10]} justify="center" style={{ padding: '0 2rem' }}>
                <Col sm={{ span: 12 }} md={{ span: 7 }} >
                    <TitleStyled>CONTACT US</TitleStyled>
                    <WrapperList>
                        <span>199 Amsterdam 72, Wall street, Nox 20110 NY</span>
                        <span>(+123) 456 789</span>
                        <span>tikieshopbook@domain.com</span>
                        <span>Branch: New York, Paris, France, California, Madrid, Spain</span>
                        <span>Open hours: 8.00 – 20.00 Mon – Fri</span>
                    </WrapperList>
                </Col>
                <Col sm={{ span: 12 }} md={{ span: 4 }}>
                    <TitleStyled>PRINT RESTORATION</TitleStyled>
                    <WrapperList>
                        <a href="/#">Bestsellers</a>
                        <a href="/#">Interviews</a>
                        <a href="/#">Authors Story</a>
                        <a href="/#">Book Fairs</a>
                        <a href="/#">Privacy & Terms</a>
                    </WrapperList>
                </Col>
                <Col sm={{ span: 8 }} md={{ span: 4 }}>
                    <TitleStyled>SOCIAL MEDIA</TitleStyled>
                    <WrapperList>
                        <a href="/#">Twitter</a>
                        <a href="/#">Instagram</a>
                        <a href="/#">Authors Story</a>
                        <a href="/#">Facebook</a>
                        <a href="/#">Dribbble</a>
                        <a href="/#">Behance</a>
                    </WrapperList>
                </Col>
                <Col sm={{ span: 8 }} md={{ span: 4 }}>
                    <TitleStyled>ABOUT US</TitleStyled>
                    <WrapperList>
                        <a href="/#">About Us</a>
                        <a href="/#">Story</a>
                        <a href="/#">Institute</a>
                        <a href="/#">Blog</a>
                        <a href="/#" target="_blank">Gift cards</a>
                    </WrapperList>
                </Col>
                <Col sm={{ span: 8 }} md={{ span: 4 }}>
                    <img src={Paymet} alt='footerImg' />
                </Col>
            </Row>
            <FooterStyled>© 2021 TIKIE, MADE BY VIET LINH</FooterStyled>
        </Wrapper>
    );
};

export default Footer;