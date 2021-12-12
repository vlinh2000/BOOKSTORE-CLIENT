import React from 'react';
import Category from './Components/Category';
import PriceChoosen from './Components/PriceChoosen';
import { useSelector } from 'react-redux'
import styled from 'styled-components';


const SidebarStyled = styled.div`
    padding:0 1rem;
`;

function SideBar() {

    const { categories } = useSelector(state => state.pageInfo);


    return (
        <SidebarStyled>
            <Category categories={categories} />
            <PriceChoosen />
        </SidebarStyled>
    );
}

export default SideBar;