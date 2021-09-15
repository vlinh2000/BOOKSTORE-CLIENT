import React from 'react';
import Category from './Components/Category';
import PriceChoosen from './Components/PriceChoosen';
import { useSelector } from 'react-redux'


function SideBar() {

    const { categories } = useSelector(state => state.pageInfo);


    return (
        <div>
            <Category categories={categories} />
            <PriceChoosen />
        </div>
    );
}

export default SideBar;