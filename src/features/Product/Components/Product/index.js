import React from 'react';
import PropTypes from 'prop-types';
import { Button, Col, Rate, Row, Typography } from 'antd';
import { ArrowRightOutlined, HeartOutlined, SearchOutlined, ShoppingCartOutlined, StarOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

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
        evaluate: []
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
    cursor:pointer;
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

const TitleStyled = styled(Typography.Text)`
    font-size:16px;
    display: block;
    margin: 10px 0 0 0;
    font-weight: 500;
    color:#000;
`;
const ProductStyled = styled(Link)`


    .book-image{
        position:relative;

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


const LinkStyled = styled(Link)`
    &:hover {
        ${TitleStyled} {
            color:#9387d9;
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
    display:flex;
    justify-content:space-between;
`;

function Product({ product }) {

    const { _id, name, author, price, oldPrice, image, feedBack } = product;


    //hanlde get voted star highest 
    const getVotedHighest = () => {
        //feedBack : {
        // _id
        // bookId
        // comments:[]  }
        let cloneFeedBack = [...feedBack?.comments];
        cloneFeedBack = cloneFeedBack.sort((a, b) => b.voted - a.voted);
        return cloneFeedBack[0].voted;

    }

    return (
        <ProductStyled to={`/product/${_id}`}>
            <div className='book-image'>
                <img width="250px" height='350px' src={image[0]} alt='book' />
                {oldPrice && <span className="discount">- {(((oldPrice - price) / oldPrice) * 100).toFixed(0)} %</span>}

                <HoverImageStyled bgImage={image[1]}>
                    <div className="tip-box">
                        <Link to={`/product/${_id}`}> <ButtonStyled size='large' icon={<ArrowRightOutlined />} /></Link>
                        <ButtonStyled style={{ margin: '10px 0' }} size='large' icon={<HeartOutlined />} />
                        <ButtonStyled size='large' icon={<SearchOutlined />} />
                    </div>
                </HoverImageStyled>

            </div>
            <LinkStyled>
                <TitleStyled >{name}</TitleStyled>
            </LinkStyled>
            <ByAuthorStyled><span className="by">By: </span> <span className="author">{author}</span>  </ByAuthorStyled>
            <RaitingStyled>
                <div>
                    {product.oldPrice && <Typography.Text style={{ color: "#969696", fontWeight: 500, textDecoration: "line-through" }}>${product.oldPrice}</Typography.Text>}
                    <Typography.Text style={{ color: "#ff4545", fontWeight: 500, marginLeft: 5 }}>${product.price}</Typography.Text>
                </div>
                <span>
                    <Rate disabled defaultValue={2} value={feedBack ? getVotedHighest() : 0} style={{ fontSize: 12 }} />
                    <span style={{ marginLeft: 5 }}>({feedBack?.comments?.length || 0})</span>
                </span>
            </RaitingStyled>
        </ProductStyled>
    );
}

export default Product;