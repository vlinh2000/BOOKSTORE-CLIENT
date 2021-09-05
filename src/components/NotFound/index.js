import React from 'react';
import { Button, Typography } from 'antd';
import styled from 'styled-components';

const NotFoundWrapper = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    min-height:500px;
`;

const FourZeroFourStyled = styled.div`

    font-size:100px;
    font-weight:bold;

`;

const QuoteStyled = styled(Typography)`
    font-size:25px;
    font-weight:500;
    margin-bottom:0.5rem;
`;

const DescriptionStyled = styled.div`
    color:#969696;
    text-transform:uppercase;
    font-size:10px;
    margin-bottom:2rem;
    letter-spacing:1px;
`;

const ButtonStyled = styled(Button)`
    width:200px;
    border-width:2px;
    border-radius:20px;
    font-size:11px;
    color:#969696;
    font-weight:500;
    letter-spacing:0.5px;
`;

function NotFound(props) {
    return (
        <NotFoundWrapper>
            <FourZeroFourStyled>404</FourZeroFourStyled>
            <QuoteStyled>Something's missing ...</QuoteStyled>
            <DescriptionStyled>this page is missing of you assembled the link incorrectly</DescriptionStyled>
            <ButtonStyled>GO TO HOME PAGE</ButtonStyled>
        </NotFoundWrapper>
    );
}

export default NotFound;