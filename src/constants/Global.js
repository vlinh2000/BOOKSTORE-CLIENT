
import { DeleteOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Typography } from 'antd';
import Logo from 'assets/images/logo.png';
import Paymet from 'assets/images/paymetFooter.png';
import styled from 'styled-components';

const RowTitleStyled = styled(Typography)`

    text-transform:uppercase;
    font-size:11px;
`;

const ProductInCartStyled = styled.div`

    display:flex;
    justify-content:space-around;
    align-items:center;
    max-width:70%;

`;

const ButtonStyled = styled(Button)`

    margin:0 5px;
    &:hover{
        color:#9387d9;
        border-color: #9387d9;
    }

`;

const columnShoppingCartTab = [
    {
        title: () => <RowTitleStyled>Product</RowTitleStyled>,
        dataIndex: 'product',
        key: 'product',
        render: book =>
            <ProductInCartStyled>
                <img width="70px" height="90px" src={book.bookImage} alt="bookImage" />
                <span>{book.bookName}</span>
            </ProductInCartStyled>

    },
    {
        title: () => <RowTitleStyled>Price</RowTitleStyled>,
        dataIndex: 'price',
        key: 'price',
    },
    {
        title: () => <RowTitleStyled>quantity</RowTitleStyled>,
        dataIndex: 'quantity',
        key: 'quantity',
        render: (num) => <div> <ButtonStyled size="small" icon={<MinusOutlined />} /> {num} <ButtonStyled size="small" icon={<PlusOutlined />} /></div>

    },
    {
        title: () => <RowTitleStyled>subtotal</RowTitleStyled>,
        dataIndex: 'subtotal',
        key: 'subtotal',
    },
    {
        title: '',
        dataIndex: 'action',
        key: 'action',
        render: () => <ButtonStyled shape="circle" type='text' size="small" icon={<DeleteOutlined />} />
    }
];



export { Logo, Paymet, columnShoppingCartTab };