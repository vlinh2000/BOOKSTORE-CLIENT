import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styled from 'styled-components';
import { Col, Row, Spin } from 'antd';

import SideBar from '../Components/SideBar';
import TopControl from '../Components/TopControl';
import ProductList from '../Components/ProductList';

import { fetchCategory, fetchPageInfo } from '../productSlice';
import { handleSort } from 'utils/common';


const MainPageStyled = styled.div`
    padding:3rem 3rem;
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
        if (categoryFilter !== -1) {
            newBooks = newBooks.filter(book => book.category[0]._id === categoryFilter)
        }

        // handle range price
        if (rangePrice.length > 0) {
            const [min, max] = rangePrice;
            newBooks = newBooks.filter(book => book.price >= (min * rangeStep) && book.price <= (max * rangeStep));
        }

        //hanlde sort 
        newBooks = handleSort(newBooks, sort);
        setBooks(newBooks);

    }, [filterPattern, products, rangeStep]);



    return (
        <MainPageStyled>
            <Row gutter={[48, 0]} justify='center'>
                <Col xs={{ span: 24 }} sm={{ span: 10 }} md={{ span: 10 }} lg={{ span: 5 }}>
                    <SideBar />
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 14 }} md={{ span: 14 }} lg={{ span: 19 }}>
                    <TopControl
                        totalProduct={books?.length} />
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