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