import React from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';

ScrollToTop.propTypes = {

};

function ScrollToTop() {
    const { pathname } = useLocation();
    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname])

    return null
}

export default ScrollToTop;