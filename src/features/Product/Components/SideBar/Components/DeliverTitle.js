import React from 'react';
import PropTypes from 'prop-types';
import { Divider, Typography } from 'antd';

DeliverTitle.propTypes = {
    title: PropTypes.string
};

DeliverTitle.defaultProps = {
    title: ''
};

function DeliverTitle({ title }) {
    return (
        <div>
            <Typography style={{ fontWeight: 'bold', letterSpacing: 0.5, fontSize: 16, textTransform: 'uppercase' }}>{title}</Typography>
            <Divider style={{ marginBottom: '1.5rem', marginTop: "0.75rem", borderWidth: '2px', color: "#bcbcbc" }} />
        </div>
    );
}

export default DeliverTitle;