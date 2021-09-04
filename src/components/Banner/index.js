import React from 'react';
// import PropTypes from 'prop-types';
import { Avatar, Breadcrumb, Carousel, Typography } from 'antd';
import styled from 'styled-components';

// Banner.propTypes = {

// };

const BannerStyled = styled.div`
   display:flex;
   flex-direction:column;
   align-items:center;
    margin-top:2rem;
`;

const CarouselStyled = styled(Carousel)`
    margin-top: 0.5rem;
    width:300px;
    background-color:red;
    height: 100px;
`;

function Banner(props) {
    return (
        <BannerStyled>
            <Typography.Title>Shop</Typography.Title>
            <Breadcrumb separator=">">
                <Breadcrumb.Item>Home </Breadcrumb.Item>
                <Breadcrumb.Item>Shop </Breadcrumb.Item>
            </Breadcrumb>
            <CarouselStyled dots={false}>
                <div>
                    <Avatar src="https://wpbingosite.com/wordpress/tikie/wp-content/uploads/2021/05/Image-1.jpg" alt="ok" />
                    <Typography.Text style={{ display: 'block' }}>CHILDREN BOOKS</Typography.Text>
                </div>
            </CarouselStyled    >
        </BannerStyled>
    );
}

export default Banner;