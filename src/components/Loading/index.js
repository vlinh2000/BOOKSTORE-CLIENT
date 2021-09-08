import React from 'react';
import PropTypes from 'prop-types';
import { Spin } from 'antd';

Loading.propTypes = {

};

function Loading(props) {
    return (
        <div>
            <Spin />
        </div>
    );
}

export default Loading;