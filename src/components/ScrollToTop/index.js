import React from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
    const { pathname } = useLocation();

    React.useEffect(() => {
        const path = pathname.split("/").pop();
        console.log({ pathname });

        if (path === 'checkout' || path === 'me') {
            window.scrollTo(0, 180);
            return;
        }
        window.scrollTo(0, 0);
    }, [pathname])

    return null
}

export default ScrollToTop;