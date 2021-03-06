import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import styled from 'styled-components';

import { BackTop, Button, Col, Divider, message, Row, Skeleton, Spin } from 'antd';
import { ArrowUpOutlined, HeartOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';

import ProductRelated from '../Components/ProductRelated';
import ProductComment from '../Components/ProductComment';
import SendFeedBack from '../Components/SendFeedBack';

import { productApi } from 'api/ProductApi';
import { feedBackApi } from 'api/feedBackApi';
import { useDispatch } from 'react-redux';
import { addToCart } from 'features/Cart/cartSlice';
import { history } from 'App';
import { DolartextStyled, WrapperShadowStyled } from 'assets/styles/globalStyle';
import { toastSuccess } from 'utils/common';


const ReviewStyled = styled.div`
   
`;

const Wrapper = styled.div`
    padding:2rem 2rem
`;


const TitleStyled = styled.div`
    font-size:30px;
    font-weight:bold;
`;

const PriceStyled = styled.div`

    font-weight:500;
    color:#ea5455; 
    font-size:25px;

`;

const DecriptionStyled = styled.div`

    font-size:13px;
    color:#969696;
    line-height:20px;
    letter-spacing:0.5px;
    margin-bottom:1rem;
`;

const NumberInStockStyled = styled.div`
    font-size:12px;
    font-weight:bold;
`;

const ButtonStyled = styled(Button)`
    width:100%;
    border-radius:30px;
    font-size:12px;
    background:#000;
    font-weight:500;
    color:#CCC;
    background:${props => props.bgcolor};
    min-height:45px;

    &:hover ,&:focus{
        background:#7060cd;
        border-color:#7060cd;
        color:#FFF;
    }

`;

const InfoStyled = styled.div`

    line-height:25px;
    font-size:13px;
    color:#969696;
    letter-spacing:0.5px;
`;

const ButtonGroupStyled = styled.div`

    border: 2px solid #969696;
    display:flex;
    justify-content:space-around;
    align-items:center;
    font-size:13px;
    font-weight:bold;
    border-radius:30px;
    height:40px;


`;

const ButtonSmallStyled = styled(Button)`
    &:hover{
        color:#FFF ;
        color:${props => props.color};
        border-color:${props => props.borderColor};
        background:${props => props.bgcolor}
    }
`;

const GroupImage = styled.div`
    margin:2rem 0;
    
    img{
        margin-right:1rem;
        cursor:pointer;
    }

    & .active{
        border:3px solid #111;
    }

`;

const SkeletonStyled = styled(Skeleton)`
    padding:0 7rem;
    margin:2rem;
`;

const ButtonBackTopStyled = styled(Button)`

    height: 40px;
    width: 40px;
    lineHeight: 40px;
    background-color: rgba(0,0,0,0.5);
    border-radius:50%;
    color:#FFF;
    
    &:hover{    
        color:#FFF;
        background:#333;
        border:none;
    }

`;

const OutOfStock = styled.div`
    color:#FF4136;
    font-size:14px;
    font-weight:bold;
`;

function ProductDetailPage(props) {
    const { bookId } = useParams();

    const [book, setBook] = React.useState({});

    const [feedBack, setFeedBack] = React.useState([]);

    const [relatedBook, setRelatedBook] = React.useState([]);

    const [isBookLoading, setIsBookLoading] = React.useState(false);

    const [isFeedBackLoading, setIsFeedBackLoading] = React.useState(false);

    const [isRelatedLoading, setIsRelatedLoading] = React.useState(false);

    const [quantity, setQuantity] = React.useState(1);

    const { isNewFeed } = useSelector(state => state.pageInfo)

    const [isAdding, setIsAdding] = React.useState(false);

    const [isAddingCheckOut, setIsAddingCheckOut] = React.useState(false);

    const [currentImageIndex, setCurrenImageIndex] = React.useState(0);

    const [listImages, setListImages] = React.useState([]);



    const dispatch = useDispatch();

    React.useEffect(() => {
        //handle fetch book with book id
        try {
            const fetchBook = async () => {

                const { book } = await productApi.get(bookId);
                console.log(book);
                setBook(book);
                setListImages([book.banner, ...book.images]);
                setIsBookLoading(false);
                // notification.success({
                //     placement: 'topRight',
                //     bottom: 50,
                //     duration: 2,
                //     rtl: true,
                //     message: "Fetch thanhf coong"
                // })
            }

            setIsBookLoading(true);
            fetchBook();
        } catch (error) {
            setIsBookLoading(false);
        }
    }, [bookId])

    //Handle decrease quantity
    const handleIncrease = () => {
        setQuantity(prev => prev < book.stockQuantity ? prev + 1 : prev)
    }

    //Handle increase quantity
    const handleDecrease = () => {
        setQuantity(prev => prev > 1 ? prev - 1 : prev)
    }
    //Handle buy now
    const handleBuyNow = () => {
        if (book.stockQuantity < 1) {
            toastSuccess("Out of stock , please comeback later");
            return;
        }

        const { name, banner, price, _id } = book;
        const product = {
            _id,
            name,
            image: banner,
            price,
            quantity,
            subTotal: (quantity * price)
        };
        //handle dispatch checkout
        setIsAddingCheckOut(true);
        const intervalId = setInterval(async () => {
            await dispatch(addToCart(product));
            setIsAddingCheckOut(false);
            clearInterval(intervalId);
            message.success(`${name} has been added to cart successfully`);
            history.push('/cart')
        }, 1000)

    }

    //Handle add to cart -- dispatch to store
    const handleAddToCart = () => {
        if (book.stockQuantity < 1) {
            toastSuccess("Out of stock , please comeback later");
            return;
        }

        const { name, banner, price, _id } = book;

        const product = {
            _id,
            name,
            image: banner,
            price,
            quantity,
            subTotal: (quantity * price)
        };

        //handle dispatch
        setIsAdding(true);
        const intervalId = setInterval(async () => {

            await dispatch(addToCart(product));
            setIsAdding(false);
            clearInterval(intervalId);
            message.success(`${name} has been added to cart successfully`);
            history.push('/cart')
        }, 1000)

    }
    //handle fetch feedback
    React.useEffect(() => {
        const fetchFeedBack = async () => {
            try {
                const response = await feedBackApi.get(bookId);
                console.log(response)
                setFeedBack(response.feedBack.comments);
                setIsFeedBackLoading(false);
            } catch (error) {
                setIsFeedBackLoading(false);
            }
        }
        setIsFeedBackLoading(true);
        fetchFeedBack();

    }, [bookId, isNewFeed])

    //handle get related book
    React.useEffect(() => {
        if (!book.category) return;

        const fetchRelatedProduct = async () => {
            const params = {
                _limit: 4,
                bookId,
                categoryId: book.category?._id
            }
            const { books } = await productApi.getAll(params);
            setRelatedBook(books);
            setIsRelatedLoading(false);
        }
        setIsRelatedLoading(true);
        fetchRelatedProduct();

    }, [bookId, book.category])



    return (
        <Wrapper>
            <WrapperShadowStyled>

                {isBookLoading ? <Spin />
                    : (

                        <Row justify="space-around" >
                            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 11 }} >
                                <img
                                    height="550px"
                                    width="450px"
                                    src={listImages && listImages[currentImageIndex]}
                                    alt="mainPhoto" />
                                <GroupImage>
                                    {listImages?.map((img, index) => (<img
                                        className={index === currentImageIndex && "active"}
                                        key={index}
                                        onClick={() => setCurrenImageIndex(index)}
                                        width="100px"
                                        height="120px"
                                        src={img}
                                        alt={index} />))}
                                </GroupImage>
                            </Col>
                            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 13 }}>
                                <TitleStyled>{book.name}</TitleStyled>
                                <PriceStyled>{book.price} <DolartextStyled>dolars</DolartextStyled> </PriceStyled>
                                <Divider />
                                <DecriptionStyled>{book.description}</DecriptionStyled>
                                {book.stockQuantity > 0 ? <NumberInStockStyled>{book.stockQuantity} in stock</NumberInStockStyled> : <OutOfStock>Oh no .... Out of stock , please comeback later</OutOfStock>}
                                <Row
                                    justify="center"
                                    gutter={10}
                                    align="middle">
                                    <Col span={5} style={{ margin: "1rem 0" }}>
                                        <ButtonGroupStyled>
                                            <ButtonSmallStyled
                                                onClick={handleDecrease}
                                                disabled={quantity === 1 || book.stockQuantity < 1}
                                                color="#9387d9"
                                                type='text'
                                                size='small'
                                                icon={<MinusOutlined />} />
                                            <span>{quantity}</span>
                                            <ButtonSmallStyled
                                                onClick={handleIncrease}
                                                disabled={quantity === book.stockQuantity || book.stockQuantity < 1}
                                                color="#9387d9"
                                                type='text'
                                                size='small'
                                                icon={<PlusOutlined />} />
                                        </ButtonGroupStyled>
                                    </Col>
                                    <Col span={16}>
                                        <ButtonStyled
                                            onClick={handleAddToCart}
                                            loading={isAdding}>ADD TO CART</ButtonStyled>
                                    </Col>
                                    <Col span={3}>
                                        <ButtonSmallStyled
                                            size="large"
                                            borderColor="#9387d9"
                                            bgcolor="#9387d9"
                                            shape="circle"
                                            icon={<HeartOutlined />}>
                                        </ButtonSmallStyled>
                                    </Col>
                                </Row>
                                <ButtonStyled
                                    loading={isAddingCheckOut}
                                    onClick={handleBuyNow}
                                    bgcolor="#9387d9">
                                    BUY NOW
                                </ButtonStyled>
                                <Divider />
                                <InfoStyled>
                                    <div>
                                        <span style={{ display: 'inline-block', width: 70 }}>Category:</span>
                                        <span
                                            style={{ marginLeft: '0.5rem', fontWeight: 'bold', color: "#000" }}>
                                            {book.category?.name}
                                        </span>
                                    </div>
                                    <div>
                                        <span style={{ display: 'inline-block', width: 70 }}>Author:</span>
                                        <span
                                            style={{ marginLeft: '0.5rem', fontWeight: 'bold', color: "#000" }}>
                                            {book.author}
                                        </span>
                                    </div>
                                </InfoStyled>
                            </Col>
                        </Row>
                    )}
                <ReviewStyled>
                    <SkeletonStyled
                        loading={isFeedBackLoading}
                        active={true}
                        avatar={true} >
                        <ProductComment
                            feedBack={feedBack} />
                    </SkeletonStyled>
                    <SendFeedBack bookId={bookId} />
                </ReviewStyled>
                <Divider />
                {isRelatedLoading ? <Spin /> : <ProductRelated products={relatedBook} />}
            </WrapperShadowStyled>
            <BackTop >
                <ButtonBackTopStyled icon={<ArrowUpOutlined />} />
            </BackTop>
        </Wrapper>
    );
}

export default ProductDetailPage;