import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

Banner.propTypes = {
    title: PropTypes.string
};

Banner.propTypes = {
    title: ''
};

const BannerStyled = styled.div`
    text-align:center;
     margin:2rem;
     `;

const TitleStyled = styled.span`
     font-size:40px;
     font-weight:bold;
     font-style:italic
`

function Banner({ title }) {
    return (
        <BannerStyled >
            <TitleStyled>{title}</TitleStyled>
        </BannerStyled>
    );
}

export default Banner;