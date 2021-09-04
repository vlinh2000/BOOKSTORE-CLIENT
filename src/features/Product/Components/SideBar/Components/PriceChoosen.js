import React from 'react';
import PropTypes from 'prop-types';
import DeliverTitle from './DeliverTitle';
import styled from 'styled-components';
import { Slider, Typography } from 'antd';
PriceChoosen.propTypes = {

};

const PriceChoosenStyled = styled.div`
margin-bottom : 2.5rem;
`;


function PriceChoosen(props) {
    const [priceFilter, setPriceFilter] = React.useState([0, 100]);

    const handleChange = (e) => {
        setPriceFilter([...e]);
    }

    return (
        <PriceChoosenStyled>
            <DeliverTitle title="price" />
            <Slider tooltipVisible={false} defaultValue={[10, 2000]} min={10} max={2000} range onChange={handleChange} />
            <Typography.Text><span style={{ color: '#969696', fontWeight: 400 }}>Range :</span> {`${priceFilter[0]} $  - ${priceFilter[1]} $`} </Typography.Text>
        </PriceChoosenStyled>
    );
}

export default PriceChoosen;