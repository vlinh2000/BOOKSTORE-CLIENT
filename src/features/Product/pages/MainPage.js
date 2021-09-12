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

    const { _page, _limit, _totalPage, products, loading } = useSelector(state => state.pageInfo);
    const dispatch = useDispatch();

    const handleChangePage = (page) => {
        //handle when user change page
        dispatch(changePage(page));
    }

    React.useEffect(() => {
        const params = {
            _page, _limit
        }
        console.log(params);
        dispatch(fetchPageInfo(params));

    }, [_page, _limit, dispatch])

    return (
        <MainPageStyled>
            <Row gutter={[48, 0]} >
                <Col xs={{ span: 24 }} sm={{ span: 5 }}>
                    <SideBar />
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 19 }}>
                    <TopControl />
                    {loading
                        ? <Spin />
                        : <><ProductList products={products} />
                            <PaginationStyled>
                                <Pagination onChange={handleChangePage} defaultCurrent={_page} total={_totalPage} pageSize={1} />
                            </PaginationStyled> </>
                    }

                </Col>
            </Row>
        </MainPageStyled>
    );
}

export default MainPage;