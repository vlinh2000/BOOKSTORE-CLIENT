import React from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router';
import styled from 'styled-components';
import { Breadcrumb, Button, Col, Divider, Row, Skeleton, Spin, Typography } from 'antd';
import { BookOutlined, HeartOutlined, HomeOutlined, MinusOutlined, PlusOutlined, UserOutlined } from '@ant-design/icons';
import ProductRelated from '../Components/ProductRelated';
import ProductComment from '../Components/ProductComment';
import ProductEvaluateForm from '../Components/ProductEvaluateForm';
import { productApi } from 'api/ProductApi';
import { feedBackApi } from 'api/feedBackApi';
import { useSelector } from 'react-redux';

ProductDetailPage.propTypes = {

};

const Wrapper = styled.div`
    line-height:55px;
    padding:2rem 2rem
`;


const TitleStyled = styled.div`
    font-size:30px;
    font-weight:bold;
`;

const PriceStyled = styled.div`

    font-weight:500;
    color:#9387d9; 
    font-size:25px;

`;

const DecriptionStyled = styled.div`

    font-size:13px;
    color:#969696;
    line-height:20px;
    letter-spacing:0.5px;
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

    &:hover{
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
    margin:2rem;
    
    & img{
        margin-right:1rem;
    }
`;

const SkeletonStyled = styled(Skeleton)`
    padding:0 7rem;
    margin:2rem;
`;


function ProductDetailPage(props) {
    const { bookId } = useParams();

    const [book, setBook] = React.useState({});

    const [category, setCategory] = React.useState({});

    const [comments, setComments] = React.useState([]);

    const [isBookLoading, setIsBookLoading] = React.useState(false);

    const [isFeedBackLoading, setIsFeedBackLoading] = React.useState(false);

    const [isRelatedLoading, setIsRelatedLoading] = React.useState(false);

    const [relatedBook, setRelatedBook] = React.useState([]);

    const { isNewFeed } = useSelector(state => state.pageInfo)

    const [quantity, setQuantity] = React.useState(1);

    console.log(isFeedBackLoading)

    React.useEffect(() => {
        //handle fetch book with book id
        try {
            const fetchBook = async () => {

                const data = await productApi.get(bookId);
                setBook(data.book);
                setCategory(data.category);
                setIsBookLoading(false);

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

    //Handle add to cart -- dispatch to store
    const handleAddToCart = () => {

        const { name, image, price, _id } = book;

        const product = {
            _id,
            name,
            image: image[0],
            price,
            quantity,
            subTotal: (quantity * price)
        };

        //handle dispatch
        console.log(product)
    }


    React.useEffect(() => {
        //handle get Feedback for this book
        try {
            const fetchFeedBack = async () => {
                setIsFeedBackLoading(true);
                const data = await feedBackApi.get(bookId);
                console.log(data);
                setIsFeedBackLoading(false);
                data.feedBack ? setComments(data.feedBack.comments) : setComments([]);

            }
            fetchFeedBack();
        } catch (error) {
            setIsFeedBackLoading(false);
        }

    }, [bookId, isNewFeed])

    React.useEffect(() => {
        //handle get related book
        try {
            const fetchRelatedProduct = async () => {
                const params = {
                    _limit: 4,
                    bookId,
                    categoryId: book.categoryId
                }
                const { books } = await productApi.getAll(params);
                //handle get feedback 
                console.log(books);
                const { feedBack } = await feedBackApi.getAll(); //{ message: {...} , feedBack:{...} }
                //map into products to easy to render
                const products = books.map(book => {
                    //find --  does book have feedBack?    
                    const feedBackOfThisBook = feedBack.find(item => item.bookId === book._id);
                    return { ...book, feedBack: feedBackOfThisBook };
                })
                setRelatedBook(products);
                setIsRelatedLoading(false);
            }
            setIsRelatedLoading(true);
            fetchRelatedProduct();
        } catch (error) {
            setIsRelatedLoading(false);
        }

    }, [bookId, book.categoryId])



    return (
        <Wrapper>
            {isBookLoading ? <Spin />
                : (

                    <Row justify="center" >
                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 10 }}>
                            <img
                                height="550px"
                                width="450px"
                                src={book.image && book.image[0]}
                                alt="mainPhoto" />
                            <GroupImage>
                                {book.image?.map((img, index) => (<img
                                    key={index}
                                    width="100px"
                                    height="120px"
                                    src={img}
                                    alt={index} />))}
                            </GroupImage>
                        </Col>
                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 9 }}>
                            <Breadcrumb separator=">">
                                <Breadcrumb.Item href="/product">
                                    <HomeOutlined />
                                </Breadcrumb.Item>
                                <Breadcrumb.Item >
                                    <BookOutlined />
                                    <span>{book.name}</span>
                                </Breadcrumb.Item>
                            </Breadcrumb>
                            <TitleStyled>{book.name}</TitleStyled>
                            <PriceStyled>${book.price}</PriceStyled>
                            <Divider />
                            <DecriptionStyled>{book.decription}</DecriptionStyled>
                            <NumberInStockStyled>{book.stockQuantity} in stock</NumberInStockStyled>
                            <Row
                                justify="center"
                                gutter={10}
                                align="middle">
                                <Col span={5}>
                                    <ButtonGroupStyled>
                                        <ButtonSmallStyled
                                            onClick={handleDecrease}
                                            disabled={quantity === 1}
                                            color="#9387d9"
                                            type='text'
                                            size='small'
                                            icon={<MinusOutlined />} />
                                        <span>{quantity}</span>
                                        <ButtonSmallStyled
                                            onClick={handleIncrease}
                                            disabled={quantity === book.stockQuantity}
                                            color="#9387d9"
                                            type='text'
                                            size='small'
                                            icon={<PlusOutlined />} />
                                    </ButtonGroupStyled>
                                </Col>
                                <Col span={16}>
                                    <ButtonStyled onClick={handleAddToCart}>ADD TO CART</ButtonStyled>
                                </Col>
                                <Col span={3}>
                                    <ButtonSmallStyled
                                        size="large"
                                        borderColor="#9387d9"
                                        bgcolor="#9387d9"
                                        size='large'
                                        shape="circle"
                                        icon={<HeartOutlined />}>
                                    </ButtonSmallStyled>
                                </Col>
                            </Row>
                            <ButtonStyled
                                bgcolor="#9387d9">
                                BUY NOW
                            </ButtonStyled>
                            <Divider />
                            <InfoStyled>
                                <div>
                                    <span>Category:</span>
                                    <span style={{ marginLeft: '0.5rem', fontWeight: 'bold', color: "#000" }}>{category.name}</span>
                                </div>
                                <div>
                                    <span>Author:</span>
                                    <span style={{ marginLeft: '0.5rem', fontWeight: 'bold', color: "#000" }}>{book.author}</span>
                                </div>
                            </InfoStyled>
                        </Col>
                    </Row>
                )}

            <Divider />
            <SkeletonStyled
                loading={isFeedBackLoading}
                active={true}
                avatar={true} >
                <ProductComment
                    feedBack={comments} />
            </SkeletonStyled>
            <ProductEvaluateForm bookId={bookId} />
            {isRelatedLoading ? <Spin /> : <ProductRelated products={relatedBook} />}

        </Wrapper>
    );
}

export default ProductDetailPage;