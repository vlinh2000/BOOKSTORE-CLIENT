import { ArrowRightOutlined, ShoppingOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { history } from 'App';
import { switchCartModal } from 'app/modalSlice';
import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
const Wrapper = styled.div`
    display:flex;
    justify-content:center;
    flex-direction:column;
    align-items:center;
    line-height:50px;
    margin-bottom:2rem;
`;
const IconStyled = styled(ShoppingOutlined)`
    font-size:40px;
`;

const TitleStyled = styled.div`
    font-weight:500;
`;

const ButtonStyled = styled(Button)`
    border:none;
    color:#969696;
    padding:0;
    font-size:13px;
    border-bottom:2px solid #000;
    font-weight:500;

    &:hover{
        color:#9387d9 ;
        border-color:#9387d9 ;
    }
`;



const NotProductInCartModal = () => {

    const dispatch = useDispatch();

    const handleShopping = () => {
        dispatch(switchCartModal(false));
        history.push('/');
    }
    return (
        <Wrapper>
            <IconStyled />
            <TitleStyled>No product in the cart</TitleStyled>
            <ButtonStyled onClick={handleShopping} >GO TO SHOP <ArrowRightOutlined /> </ButtonStyled>

        </Wrapper>
    );
};

export default NotProductInCartModal;