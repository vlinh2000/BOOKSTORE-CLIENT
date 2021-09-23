import React from 'react';
import styled from 'styled-components';

import { Col, Row, Table, Radio, Button, Typography, Tooltip, Popconfirm, Empty } from 'antd';

import { useDispatch, useSelector } from 'react-redux';
import { DeleteOutlined, DollarOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { removeItemInCart, updateCart } from '../cartSlice';
import Column from 'rc-table/lib/sugar/Column';
import { switchLoginModal } from 'app/modalSlice';
import { history } from 'App';
import Banner from 'components/Banner';


const Wrapper = styled.div``;

const WrapperMain = styled.div`
    padding:3rem 2rem;
    width:90%;
    margin:0 auto;
    box-shadow:1px 1px 2px 0.5px #9387d9;    
`;

const CartTotalStyled = styled.div`
    padding-bottom:2rem;
    background: #f6f6f6; 
    box-shadow:1px 1px 1px 1px #000;
`;

const TitleStyled = styled.div`
    padding:0.75rem 2rem;
    font-weight:bold;
    background:#f0f0f0;
    font-size:13px;
    
    `;

const RowStyled = styled(Row)`
    padding:0.75rem 2rem;
    font-size:13px;

`;

const FontStyled = styled.span`
    font-weight:bold;
    padding-bottom:1px;
    border-bottom: 2px solid #000;
    margin-top:1rem;
    display:inline-block;

`;

const ButtonStyled = styled(Button)`
    height:50px;
    font-size:12px;
    font-weight:500;
    background:#000;
    color:#EEE;

    &:hover{
        border:none;
        color:#EEE;
        background:#9387d9 ;

    }
`;

const RowTitleStyled = styled(Typography)`
    text-transform:uppercase;
    font-size:11px;
`;


const ProductInCartStyled = styled.div`
    display:flex;
    align-items:center;
    max-width:70%;
`;

const ButtonRemoveStyled = styled(Button)`
    margin:0 8px;
    &:hover{
        color:#9387d9;
        border-color: #9387d9;
    }

`;

const TableWrapper = styled.div`
    box-shadow:1px 1px 1px 1px #000;
`;


function CartPage(props) {

    const { cartItem, totalPrice } = useSelector(state => state.cart);

    const { isAuth } = useSelector(state => state.user.currentUser);


    const dispatch = useDispatch()

    const handleIncrease = (id) => {
        const action = updateCart({ id, number: 1 })
        dispatch(action);
    }
    //Data source of table
    const cartItemSource = React.useMemo(() => {

        return cartItem.map(item => ({
            key: item._id,
            product: {
                bookName: item.name,
                bookImage: item.image
            },
            price: item.price,
            quantity: item.quantity,
            subtotal: item.subTotal
        }))

    }, [cartItem])



    const handleDecrease = (id) => {
        const action = updateCart({ id, number: -1 })
        dispatch(action);
    }

    const handleRemove = (id) => {
        const action = removeItemInCart({ id });
        dispatch(action);

    }

    const handleCheckOut = () => {

        if (!isAuth) {
            dispatch(switchLoginModal(true));
            return;
        }
        history.push('/cart/checkout');
    }

    return (
        <Wrapper>
            <Banner title="Cart" />
            {cartItem.length < 1 ? <Empty /> :
                <WrapperMain>
                    <Row justify='space-around'  >
                        <Col span={14}>
                            <TableWrapper>

                                <Table
                                    // columns={columnShoppingCartTab}
                                    dataSource={cartItemSource}
                                    pagination={false} >
                                    <Column
                                        title={() => <RowTitleStyled>Product</RowTitleStyled>}
                                        dataIndex="product"
                                        key="product"
                                        render={book =>
                                            <ProductInCartStyled>
                                                <img
                                                    width="70px"
                                                    height="90px"
                                                    src={book.bookImage}
                                                    alt="bookImage" />
                                                <span
                                                    style={{ marginLeft: '1rem' }}>
                                                    {book.bookName}
                                                </span>
                                            </ProductInCartStyled>} />

                                    <Column
                                        title={() => <RowTitleStyled>price</RowTitleStyled>}
                                        dataIndex="price"
                                        key="price" />

                                    <Column
                                        title={() => <RowTitleStyled>quantity</RowTitleStyled>}
                                        dataIndex="quantity"
                                        key="quantity"
                                        render={(num, { key }) => <div>
                                            <ButtonRemoveStyled
                                                onClick={() => handleDecrease(key)}
                                                disabled={num === 1}
                                                size="small"
                                                icon={<MinusOutlined />} />
                                            {num}
                                            <ButtonRemoveStyled
                                                onClick={() => handleIncrease(key)}
                                                size="small"
                                                icon={<PlusOutlined />} />
                                        </div>

                                        } />

                                    <Column
                                        title={() => <RowTitleStyled>subtotal</RowTitleStyled>}
                                        dataIndex="subtotal"
                                        key="subtotal" />

                                    <Column
                                        title=''
                                        dataIndex="action"
                                        key="action"
                                        render={(value, { key }) => <Popconfirm
                                            onConfirm={() => handleRemove(key)}
                                            title="Are you sure to remove this item?"
                                            okText="Yes" cancelText="No">
                                            <Tooltip
                                                title="Remove this item">
                                                <ButtonRemoveStyled
                                                    shape="circle"
                                                    type='text'
                                                    size="small"
                                                    icon={<DeleteOutlined />} />
                                            </Tooltip>
                                        </Popconfirm>} />

                                </Table>
                            </TableWrapper>
                        </Col>
                        <Col span={6}>
                            <CartTotalStyled>
                                <TitleStyled>CART TOTALS</TitleStyled>
                                <div>
                                    <RowStyled>
                                        <Col span={12}>
                                            <div>subtotal</div>
                                        </Col>
                                        <Col span={12}>
                                            <div
                                                style={{ fontSize: '16px', marginBottom: '0.75rem' }}>
                                                <DollarOutlined /> {totalPrice}
                                            </div>
                                            <Radio.Group defaultValue={1}>
                                                <Radio value={1} >Free shipping</Radio>
                                                <Radio value={2}>Flat rate</Radio>
                                            </Radio.Group>

                                        </Col>
                                    </RowStyled>
                                    <RowStyled>
                                        <Col span={12}>Shipping</Col>
                                        <Col span={12}>
                                            <div style={{ color: '#969696' }}>Shipping options will be update during checkout.</div>
                                            <FontStyled>Calculate shipping</FontStyled>
                                        </Col>
                                    </RowStyled>
                                    <RowStyled>
                                        <Col span={12}>Total</Col>
                                        <Col span={12}>
                                            <div style={{ fontSize: '20px', fontWeight: 'bold' }}><DollarOutlined /> {totalPrice}</div>
                                        </Col>
                                    </RowStyled>
                                    <Row justify="center">
                                        <Col span={18}>
                                            <ButtonStyled
                                                onClick={handleCheckOut}
                                                style={{ width: '100%' }}>PROCEED TO CHECKOUT</ButtonStyled>
                                        </Col>
                                    </Row>
                                </div>
                            </CartTotalStyled>
                        </Col>

                    </Row>
                </WrapperMain>
            }

        </Wrapper >
    );
}

export default CartPage;