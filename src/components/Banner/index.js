import React from 'react';
// import PropTypes from 'prop-types';
import { Breadcrumb, Typography } from 'antd';
import styled from 'styled-components';
import { HomeOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom'

// Banner.propTypes = {

// };

const BannerStyled = styled.div`
        text-align:center;
     padding: 30px 0;
     margin-bottom:3rem;
     `;

const TitleStyled = styled.span`
     
     font-size:30px;
     font-weight:bold;
     border-bottom: 2px solid #9387d9;

`

function Banner({ title }) {



    return (
        <BannerStyled >
            <TitleStyled>{title}</TitleStyled>
        </BannerStyled>
    );
}

export default Banner;