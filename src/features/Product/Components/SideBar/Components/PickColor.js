import React from 'react';
import PropTypes from 'prop-types';
import { Divider, Typography } from 'antd';
import styled from 'styled-components';
import DeliverTitle from './DeliverTitle';
import { CheckOutlined } from '@ant-design/icons';
PickColor.propTypes = {

};

const CheckIconStyled = styled(CheckOutlined)`
    color:#FFF;
    opacity:0;
`;

const ListPickColorStyled = styled.ul`
    padding:0;
    list-style:none;
    font-weight:400;
    
    .item {
     display:flex;
     justify-content:space-between;   
     align-items:center;
     cursor:pointer;
     font-size:15px;
     font-weight:500;
     letter-spacing:1px;
     margin-bottom:1rem;
     
     &:hover {
         color:#9387d9;
         ${CheckIconStyled} {
             opacity:1;
         }

     }

     & .totalColor{
         width:25px;
         height:25px;
         border-radius:50%;
         background:#f1f1f1;
         text-align:center;
         font-size:12px;
         line-height:25px;
     }
    };

`;

const PickColorStyled = styled.div`
    margin-bottom:2.5rem;
`;

const ColorWrapperStyled = styled.div`
    font-size:12px;

    & .color{
        display:inline-block;
        width:27px;
        height:27px;
        border-radius:50%;
        margin-right:10px;
        text-align:center;
        line-height:27px
    }
`;



function PickColor(props) {
    return (
        <PickColorStyled>
            <DeliverTitle title="color" />
            <ListPickColorStyled>
                <li className="item">
                    <ColorWrapperStyled>
                        <span className='color' style={{ backgroundColor: 'red' }}>
                            <CheckIconStyled />
                        </span>
                        <span>Red</span>
                    </ColorWrapperStyled>
                    <span className='totalColor'>8</span>
                </li>
                <li className="item">
                    <ColorWrapperStyled>
                        <span className='color' style={{ backgroundColor: 'blue' }}>
                            <CheckIconStyled />
                        </span>
                        <span>Blue</span>
                    </ColorWrapperStyled>
                    <span className='totalColor'>8</span>
                </li>
                <li className="item">
                    <ColorWrapperStyled>
                        <span className='color' style={{ backgroundColor: 'green' }}>
                            <CheckIconStyled />
                        </span>
                        <span>Green</span>
                    </ColorWrapperStyled>
                    <span className='totalColor'>8</span>
                </li>
            </ListPickColorStyled>
        </PickColorStyled>
    );
}

export default PickColor;