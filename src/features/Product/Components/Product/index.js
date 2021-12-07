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

const HoverImageStyled = styled.div`
    background-image:url(${props => props.bgImage});
    background-position:center;
    background-repeat:none;
    background-size:cover;
    height:350px;
    width:250px;
    position:absolute;
    top:0;
    display:none;
    transition: all 0.45s ease 0s;

    .tip-box{
        height:100%;
        display:flex;
        flex-direction:column;
        justify-content:flex-end;
        align-items:flex-end;
        opacity: 0;
        transition: all 0.35s ease 0s;
        transform: translate(-1rem,-1rem);
    }

`;

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
const ProductStyled = styled.div`
    .book-image{
        position:relative;
        cursor:pointer;
        &:hover{
            ${HoverImageStyled} {
                display:block;

                .tip-box{
                    opacity:1;
                }
            }
        }

        .discount{
            font-size:12px;
            min-width:55px;
            color:#FFF;
            line-height:22px;
            padding:2px 10px;
            font-weight:500;
            display:block;
            position:absolute;
            top:10px;
            background:#ff0404;
            text-align:center;
            left:10px;
            z-index:1;
            border-radius:20px;
        }
    }
}
`;

const ButtonStyled = styled(Button)`
    border-width:2px;

    &:hover{
        color:#FFF ;
        border-color:#9387d9 ;
        background:#9387d9;
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

    const { _id, name, author, price, oldPrice, image, feedBack } = product;

    const [isAdding, setIsAdding] = React.useState(false);

    const dispatch = useDispatch()



    //handle add to cart
    const handleAddToCart = () => {

        setIsAdding(true);
        const intervalId = setInterval(async () => {

            const action = addToCart({ _id, name, image: image[0], price, quantity: 1, subTotal: price });

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
                    width="250px"
                    height='350px'
                    src={image[0]}
                    alt='book' />
                {oldPrice && <span className="discount">- {(((oldPrice - price) / oldPrice) * 100).toFixed(0)} %</span>}

                <HoverImageStyled
                    bgImage={image[1]}>
                    <div
                        className="tip-box">

                        {isAdding ?
                            <ButtonStyled
                                size='large'
                                icon={<Spin />} />
                            :
                            <ButtonStyled
                                size='large'
                                icon={<ShoppingCartOutlined />}
                                onClick={handleAddToCart} />
                        }
                        <ButtonStyled
                            style={{ margin: '10px 0' }}
                            size='large'
                            icon={<HeartOutlined />} />
                        <Link
                            to={`/product/${_id}`}>
                            <ButtonStyled
                                size='large'
                                icon={<SearchOutlined />} /></Link>
                    </div>
                </HoverImageStyled>

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
                    {product.oldPrice && <Typography.Text style={{ color: "#969696", fontWeight: 500, textDecoration: "line-through" }}><DollarCircleOutlined /> {product.oldPrice}</Typography.Text>}
                    <Typography.Text
                        style={{ color: "#ff4545", fontWeight: 500, marginLeft: 5 }}><DollarCircleOutlined /> {product.price}</Typography.Text>
                </div>
                <div>
                    <Rate
                        disabled
                        defaultValue={2}
                        value={feedBack[0] ? getVotedHighest(feedBack[0]) : 0}
                        style={{ fontSize: 12 }} />
                    <span
                        style={{ marginLeft: 5 }}>({feedBack[0]?.comments?.length || 0})</span>
                </div>
            </RaitingStyled>
        </ProductStyled>
    );
}

export default Product;