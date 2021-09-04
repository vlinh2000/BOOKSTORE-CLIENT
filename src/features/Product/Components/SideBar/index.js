import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Category from './Components/Category';
import PriceChoosen from './Components/PriceChoosen';
import PickColor from './Components/PickColor';

SideBar.propTypes = {

};

function SideBar(props) {
    return (
        <div>
            <Category />
            <PriceChoosen />
            <PickColor />
        </div>
    );
}

export default SideBar;