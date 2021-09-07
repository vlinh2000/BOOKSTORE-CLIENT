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
    
    a{
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
                        <a>199 Amsterdam 72, Wall street, Nox 20110 NY</a>
                        <a>(+123) 456 789</a>
                        <a>tikieshopbook@domain.com</a>
                        <a>Branch: New York, Paris, France, California, Madrid, Spain</a>
                        <a>Open hours: 8.00 – 20.00 Mon – Fri</a>
                    </WrapperList>
                </Col>
                <Col sm={{ span: 12 }} md={{ span: 4 }}>
                    <TitleStyled>PRINT RESTORATION</TitleStyled>
                    <WrapperList>
                        <a>Bestsellers</a>
                        <a>Interviews</a>
                        <a>Authors Story</a>
                        <a>Book Fairs</a>
                        <a>Privacy & Terms</a>
                    </WrapperList>
                </Col>
                <Col sm={{ span: 8 }} md={{ span: 4 }}>
                    <TitleStyled>SOCIAL MEDIA</TitleStyled>
                    <WrapperList>
                        <a>Twitter</a>
                        <a>Instagram</a>
                        <a>Authors Story</a>
                        <a>Facebook</a>
                        <a>Dribbble</a>
                        <a>Behance</a>
                    </WrapperList>
                </Col>
                <Col sm={{ span: 8 }} md={{ span: 4 }}>
                    <TitleStyled>ABOUT US</TitleStyled>
                    <WrapperList>
                        <a>About Us</a>
                        <a>Story</a>
                        <a>Institute</a>
                        <a>Blog</a>
                        <a>Gift cards</a>
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