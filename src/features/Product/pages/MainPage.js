import React from 'react';
import { Col, Row, Spin } from 'antd';
import SideBar from '../Components/SideBar';
import TopControl from '../Components/TopControl';
import ProductList from '../Components/ProductList';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategory, fetchPageInfo } from '../productSlice';
import Banner from 'components/Banner';


const MainPageStyled = styled.div`
    width:90%;
    margin:3rem auto;
`;


function MainPage(props) {

    const { filterPattern, rangeStep, products, loading } = useSelector(state => state.pageInfo);

    const [books, setBooks] = React.useState([]);

    const dispatch = useDispatch();

    //handle fetch all products , category
    React.useEffect(() => {

        dispatch(fetchPageInfo());
        dispatch(fetchCategory());

    }, [])


    //handle search , filter category , range Price ,sort 
    React.useEffect(() => {

        //handle form search 
        const { categoryFilter, searchValue, sort, rangePrice } = filterPattern;
        let newBooks = products.filter(book => book.name.toLowerCase().includes(searchValue?.toLowerCase()));

        //handle category filter 
        newBooks = newBooks.filter(book => {
            //check if category fiter = []
            if (categoryFilter.length < 1) return book;
            //find book in list category filter 
            return categoryFilter.find(con => con === book.categoryId) && book;
        })

        // handle range price
        if (rangePrice.length > 0) {
            const [min, max] = rangePrice;
            newBooks = newBooks.filter(book => book.price >= (min * rangeStep) && book.price <= (max * rangeStep));
        }

        //hanlde sort 
        newBooks = handleSort(newBooks, sort);
        setBooks(newBooks);

    }, [filterPattern, products, rangeStep]);

    //handle sort 
    const handleSort = (products, values) => {
        switch (values) {
            case 'min-to-max': return products.sort((book1, book2) => book1.price - book2.price);
            case 'max-to-min': return products.sort((book1, book2) => book2.price - book1.price);
            default: return products;
        }

    }

    return (
        <MainPageStyled>
            <Row gutter={[48, 0]} >
                <Col xs={{ span: 24 }} sm={{ span: 5 }}>
                    <SideBar />
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 19 }}>
                    <TopControl totalProduct={books?.length} handleSort={handleSort} />
                    {loading
                        ? <Spin />
                        : <ProductList products={books} />
                    }
                </Col>
            </Row>
        </MainPageStyled>
    );
}

export default MainPage;