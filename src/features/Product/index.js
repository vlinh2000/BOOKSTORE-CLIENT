import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'antd';
import SideBar from './Components/SideBar';
import TopControl from './Components/TopControl';
import ProductList from './Components/ProductList';
import styled from 'styled-components';

MainPage.propTypes = {

};

const MainPageStyled = styled.div`
    width:90%;
    margin:3rem auto;
`;

function MainPage(props) {
    return (
        <MainPageStyled>
            <Row gutter={[48, 0]} >
                <Col xs={{ span: 24 }} sm={{ span: 5 }}>
                    <SideBar />
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 19 }}>
                    <TopControl />
                    <ProductList />
                </Col>
            </Row>
        </MainPageStyled>
    );
}

export default MainPage;