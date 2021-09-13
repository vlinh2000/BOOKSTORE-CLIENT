import React from 'react';
import PropTypes from 'prop-types';
import { Col, Pagination, Row, Spin } from 'antd';
import SideBar from '../Components/SideBar';
import TopControl from '../Components/TopControl';
import ProductList from '../Components/ProductList';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { changePage, fetchPageInfo } from '../productSlice';



MainPage.propTypes = {

};

const MainPageStyled = styled.div`
    width:90%;
    margin:3rem auto;
`;

const PaginationStyled = styled.div`
    text-align:center;
    margin-top:3rem;

`;

function MainPage(props) {

    const { search, products, loading } = useSelector(state => state.pageInfo);

    const [books, setBooks] = React.useState([]);

    React.useEffect(() => {
        //defaul products
        const filterOrSearch = async () => {
            await setBooks(products);
            //handle form search 
            const { category, value } = search;

            let newBook = products.filter(book => {

                let cateId = category === '-1' ? book.categoryId : category;
                return book.categoryId === cateId && book.name.toLowerCase().includes(value.toLowerCase())

            });

            setBooks(newBook);
        }
        filterOrSearch();

        //handle check category

        //handle range price

        //handle sort 


    }, [search, products]);







    const dispatch = useDispatch();

    // const handleChangePage = (page) => {
    //     //handle when user change page
    //     dispatch(changePage(page));
    // }

    // [  ]

    //handle fetch all products
    React.useEffect(() => {
        dispatch(fetchPageInfo());
        // const params = {
        //     _page, _limit
        // }
    }, [dispatch])

    return (
        <MainPageStyled>
            <Row gutter={[48, 0]} >
                <Col xs={{ span: 24 }} sm={{ span: 5 }}>
                    <SideBar />
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 19 }}>
                    <TopControl totalProduct={books?.length} />
                    {loading
                        ? <Spin />
                        : <ProductList products={books} />
                    }

                    {/* <PaginationStyled>
                                <Pagination onChange={handleChangePage} defaultCurrent={_page} total={_totalPage} pageSize={1} />
                            </PaginationStyled>  */}
                </Col>
            </Row>
        </MainPageStyled>
    );
}

export default MainPage;