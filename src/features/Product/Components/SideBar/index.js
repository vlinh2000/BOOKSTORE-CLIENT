import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Category from './Components/Category';
import PriceChoosen from './Components/PriceChoosen';
import PickColor from './Components/PickColor';
import { categoryApi } from 'api/CategoryApi';
import { Spin } from 'antd';

SideBar.propTypes = {

};

function SideBar(props) {

    const [categories, setCategories] = React.useState([]);

    const [isLoading, setIsLoading] = React.useState(false);

    React.useEffect(() => {
        //handle fetch Category
        try {
            const fetchCategory = async () => {

                const data = await categoryApi.getAll();
                setCategories(data.categories);
                setIsLoading(false);
            }

            setIsLoading(true);
            fetchCategory();

        } catch (error) {
            setIsLoading(false);
            throw error;
        }
    }, [])



    return (
        <div> {isLoading ? <Spin /> :
            (<>
                <Category categories={categories} />
                <PriceChoosen />
            </>)}

        </div>
    );
}

export default SideBar;