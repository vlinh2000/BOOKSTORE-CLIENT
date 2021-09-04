import React from 'react';
import PropTypes from 'prop-types';
import { Button, Col, Rate, Row, Typography } from 'antd';
import { ArrowRightOutlined, HeartOutlined, SearchOutlined, ShoppingCartOutlined, StarOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

Product.propTypes = {
    book: PropTypes.object
};

Product.defaultProps = {
    book: {
        image: ['https://wpbingosite.com/wordpress/tikie/wp-content/uploads/2020/12/Image-33.jpg'],
        discount: '40%',
        name: "Bat man",
        author: "v.Linh",
        price: 400,
        oldPrice: 500



    }
};

const HoverImageStyled = styled.div`

    background-image:url('https://wpbingosite.com/wordpress/tikie/wp-content/uploads/2019/04/Image-2.jpg');
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
const ProductStyled = styled.div`

    .book-image{
        position:relative;

        & img{
            transition: all 0.45s ease 0s;
        }

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

function Product({ book }) {
    return (
        <ProductStyled to="/sadsa">
            <div className='book-image'>
                <img width="250px" height='350px' src={book.image[0]} alt='book' />
                <span className="discount">-{book.discount}</span>
                <HoverImageStyled >
                    <div className="tip-box">
                        <Link to={`/${book.id}`}> <Button size='large' icon={<ArrowRightOutlined />} /></Link>
                        <Button style={{ margin: '10px 0' }} size='large' icon={<HeartOutlined />} />
                        <Button size='large' icon={<SearchOutlined />} />
                    </div>
                </HoverImageStyled>

            </div>
            <LinkStyled>
                <TitleStyled >{book.name}</TitleStyled>
            </LinkStyled>
            <ByAuthorStyled><span className="by">By: </span> <span className="author">{book.author}</span>  </ByAuthorStyled>
            <RaitingStyled>
                <div>
                    {book.oldPrice && <Typography.Text style={{ color: "#969696", fontWeight: 500, textDecoration: "line-through" }}>${book.oldPrice}</Typography.Text>}
                    <Typography.Text style={{ color: "#ff4545", fontWeight: 500, marginLeft: 5 }}>${book.price}</Typography.Text>
                </div>
                <span>
                    <Rate disabled defaultValue={2} value={5} style={{ fontSize: 12 }} />
                    <span style={{ marginLeft: 5 }}>({0})</span>
                </span>
            </RaitingStyled>
        </ProductStyled>
    );
}

export default Product;