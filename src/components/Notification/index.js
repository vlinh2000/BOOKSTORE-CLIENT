import React from 'react';
import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';


function Notification(props) {

    return (
        <div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={true}
                newestOnTop={true}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    );
}

export default Notification;