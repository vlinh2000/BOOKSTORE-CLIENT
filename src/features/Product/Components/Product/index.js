import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { addToCart } from 'features/Cart/cartSlice';

import styled from 'styled-components';
import { Button, message, Rate, Spin, Typography } from 'antd';
import { DollarCircleOutlined, HeartOutlined, SearchOutlined, ShoppingCartOutlined } from '@ant-design/icons';

import { getVotedHighest } from 'utils/common';

Product.propTypes = {
    product: PropTypes.object
};

Product.defaultProps = {
    product: {
        id: '',
        name: '',
        author: '',
        price: 0,
        oldPrice: 0,
        image: [],
        isAddToCart: false
    }

};

const TitleStyled = styled(Link)`
    font-size:16px;
    display: block;
    margin: 10px 0 0 0;
    font-weight: 500;
    color:#000;
    
    &:hover {
        color:#9387d9;
    }
    `;

const ButtonStyled = styled(Button)`
    border:none;
    display:block;

    &:hover{
        color:#FFF ;
        border-color:#9387d9 ;
        background:#9387d9;
    }
`;

const TipBoxItem = styled.div`
    transition: all .5s ease;
    margin-bottom:10px;
`;

const ProductStyled = styled.div`
    .book-image{
        position:relative;

        .main-image{
            position:absolute;
            opacity:1;
        }
        .second-image,.main-image{
            transition:0.5s;
            width: 100%;
            height: 400px;
            object-fit:cover;
        }

        &:hover .tip-box {
            opacity: 1;
            transform: translate(0,-150px);
        } 
        &:hover .main-image{
            opacity:0;
        } 


        .discount{
            font-size:11px;
            color:#FFF;
            padding:3px 7px;
            position:absolute;
            top:10px;
            background:#FF4136;
            text-align:center;
            left:10px;
            z-index:1;
            border-radius:5px;
        }
    }
    
    
    .tip-box {
        position:absolute;
        right:20px;
        transition: all .5s ease;
        opacity: 0;
        transform: translate(0,0);
    }
}
`;




const ByAuthorStyled = styled.div`
    margin-bottom:5px;
    font-style:italic;
    font-weight:500;

    .by{
        font-size:12px;
        margin-right:5px;
    }

    .author{
        color:#9387d9;
    }
`;

const RaitingStyled = styled.div`
    width:90%;
    display:flex;
    justify-content:space-between;
`;

function Product({ product }) {

    const { _id, name, author, price, oldPrice, banner, images, feedBack } = product;

    const [isAdding, setIsAdding] = React.useState(false);

    const dispatch = useDispatch()



    //handle add to cart
    const handleAddToCart = () => {

        setIsAdding(true);
        const intervalId = setInterval(async () => {

            const action = addToCart({ _id, name, image: banner, price, quantity: 1, subTotal: price });

            await dispatch(action);
            setIsAdding(false);
            clearInterval(intervalId);
            message.success(`${name.toUpperCase()} has been added to cart succesfully`);
        }, 1000)

    }


    return (
        <ProductStyled>
            <div
                className='book-image'>
                <img
                    className='main-image'
                    src={banner}
                    alt='book' />
                <img
                    className='second-image'
                    src={images[0]}
                    alt='book' />
                {oldPrice && <span className="discount">- {(((oldPrice - price) / oldPrice) * 100).toFixed(0)} %</span>}
                <div className="tip-box">

                    {isAdding ?
                        <TipBoxItem
                            bottom="120px"
                        >
                            <ButtonStyled
                                className='tipbox-item'
                                size='large'
                                icon={<Spin />} />
                        </TipBoxItem>
                        :
                        <TipBoxItem
                            bottom="120px"
                        >
                            <ButtonStyled
                                className='tipbox-item'
                                size='large'
                                icon={<ShoppingCartOutlined />}
                                onClick={handleAddToCart} />
                        </TipBoxItem>
                    }
                    <TipBoxItem
                        bottom="70px"
                    >
                        <ButtonStyled
                            className='tipbox-item'
                            size='large'
                            icon={<HeartOutlined />} />
                    </TipBoxItem>
                    <TipBoxItem
                        bottom="20px"
                    >

                        <Link
                            className='tipbox-item'
                            to={`/product/${_id}`}>
                            <ButtonStyled
                                size='large'
                                icon={<SearchOutlined />} /></Link>
                    </TipBoxItem>
                </div>

            </div>
            <TitleStyled
                to={`/product/${_id}`}>
                {name}</TitleStyled>
            <ByAuthorStyled>
                <span
                    className="by">By: </span>
                <span
                    className="author">{author}</span>
            </ByAuthorStyled>
            <RaitingStyled>
                <div>
                    {product.oldPrice && <Typography.Text
                        style={
                            {
                                color: "#969696",
                                fontWeight: 500,
                                textDecoration: "line-through"
                            }
                        }><DollarCircleOutlined />{product.oldPrice}
                    </Typography.Text>}
                    <Typography.Text
                        style={
                            {
                                color: "#ff4545",
                                fontWeight: 500,
                                marginLeft: 5
                            }
                        }>
                        <DollarCircleOutlined /> {product.price}
                    </Typography.Text>
                </div>
                <div>
                    <Rate
                        disabled
                        defaultValue={2}
                        value={feedBack[0] ? getVotedHighest(feedBack[0]) : 0}
                        style={{ fontSize: 12 }} />
                    <span
                        style={
                            {
                                marginLeft: 5
                            }
                        }>
                        ({feedBack[0]?.comments?.length || 0})
                    </span>
                </div>
            </RaitingStyled>
        </ProductStyled>
    );
}

export default Product;