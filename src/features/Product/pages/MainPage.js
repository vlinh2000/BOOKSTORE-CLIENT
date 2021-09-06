import React from 'react';
import PropTypes from 'prop-types';
import { Col, Pagination, Row } from 'antd';
import SideBar from '../Components/SideBar';
import TopControl from '../Components/TopControl';
import ProductList from '../Components/ProductList';
import styled from 'styled-components';

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

    const handleChangePage = (page) => {
        //handle when user change page
        console.log(page);
    }

    return (
        <MainPageStyled>
            <Row gutter={[48, 0]} >
                <Col xs={{ span: 24 }} sm={{ span: 5 }}>
                    <SideBar />
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 19 }}>
                    <TopControl />
                    <ProductList />
                    <PaginationStyled>
                        <Pagination onChange={handleChangePage} defaultCurrent={1} total={4} pageSize={1} />
                    </PaginationStyled>
                </Col>
            </Row>
        </MainPageStyled>
    );
}

export default MainPage;