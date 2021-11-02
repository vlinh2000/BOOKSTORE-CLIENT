import { DollarCircleOutlined } from "@ant-design/icons";
import { Button, Form } from "antd";
import styled from "styled-components";

const TitleStyled = styled.div`

    font-size:20px;
    font-weight:500;
    text-align:center;
    margin-bottom:3rem;

    &:after{
        content: ' ';
        display:block;
        height:10px;
        border-bottom:3px solid #9387d9;
        width:50px;
        margin:0 auto;
    }

`;

const WrapperShadowStyled = styled.div`
    padding:2rem 2rem;
    box-shadow:1px 1px 10px -8px #AAA;
    width:90%;
    margin:0 auto;
`;

const DolarStyled = styled(DollarCircleOutlined)`
    font-size:10px;
    color:#ff9f43;
`;

const DolartextStyled = styled.span`
    font-size:10px;
    color:#ea5455;
    font-style:italic;
`;

const OrgangeButton = styled(Button)`
   background:#ff9f43!important;
   box-shadow:1px 1px 10px 0px #BBB;
   border-color:#ff9f43;
   color:#FFF;
   font-size:12px;
   font-weight:500;
   height:40px;
   
   &:hover,&:focus{
       color:#FFF;
       border-color:#7367f0;
  }
`;
const RedButton = styled(Button)`
   background:#ea5455!important;
   box-shadow:1px 1px 10px 0px #BBB;
   border-color:#ea5455;
   color:#FFF;
   font-size:12px;
   font-weight:500;
   height:40px;
   
   &:hover,&:focus{
       color:#FFF;
       border-color:#7367f0;
  }
`;
const BlueButton = styled(Button)`
   background:#39CCCC!important;
   box-shadow:1px 1px 25px 0px #BBB;
   border-color:#39CCCC;
   color:#FFF;
   font-size:12px;
   font-weight:500;
   height:40px;
   
   &:hover,&:focus{
       color:#FFF;
       border-color:#7367f0;
  }
`;

const YellowButton = styled(Button)`
   background:#FFCC00!important;
   box-shadow:1px 1px 25px -8px #BBB;
   border-color:#FFCC00;
   color:#FFF;
   font-size:12px;
   font-weight:500;
   height:40px;
   
   &:hover,&:focus{
       color:#FFF;
       border-color:#7367f0;
  }
`;

const PurpleButton = styled(Button)`
   background:#B565A7!important;
   box-shadow:1px 1px 25px -5px #BBB;
   border-color:#B565A7;
   color:#222;
   font-size:12px;
   font-weight:500;
   
   &:hover,&:focus{
       color:#FFF;
       border-color:#7367f0;
  }
`;

const PinkButton = styled(Button)`
   background:pink!important;
   box-shadow:1px 1px 25px -5px #BBB;
   border-color:pink;
   color:#222;
   font-size:12px;
   font-weight:500;
   
   &:hover,&:focus{
       color:#FFF;
       border-color:#7367f0;
  }
`;

const TextGreenStyled = styled.span`
   background:#04AA6D!important;
   box-shadow:1px 1px 10px 0px #BBB;
   color:#FFF;
   font-size:12px;
   font-weight:500;
   padding:4px 10px;
`;

const TextRedStyled = styled.span`
   background:#ea5455!important;
   box-shadow:1px 1px 10px 0px #BBB;
   color:#FFF;
   font-size:12px;
   font-weight:500;
   padding:4px 10px;
`;

const TextYellowStyled = styled.span`
   background:#FFCC00!important;
   box-shadow:1px 1px 10px 0px #BBB;
   border-color:#FFCC00;
   color:#FFF;
   font-size:12px;
   font-weight:500;
   padding:4px 10px;
`;

const TextOrgangeStyled = styled.span`
   background:#ff9f43!important;
   box-shadow:1px 1px 10px 0px #BBB;
   border-color:#ff9f43;
   color:#FFF;
   font-size:12px;
   font-weight:500;
   padding:4px 10px;
`;


const FormItemStyled = styled(Form.Item)`
    .ant-form-item-label label{
        color:#969696;
        font-weight:500;
    }
    .ant-form-item-explain.ant-form-item-explain-error{
        font-size:10px;
        margin-top:5px;
    }
`;


export {
    TitleStyled, WrapperShadowStyled, DolarStyled,
    DolartextStyled, OrgangeButton, TextGreenStyled, TextYellowStyled,
    TextRedStyled, PurpleButton, BlueButton, YellowButton, FormItemStyled, PinkButton, RedButton, TextOrgangeStyled
}