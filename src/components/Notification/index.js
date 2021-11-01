import React from 'react';
import { ToastContainer } from 'react-toastify';


function Notification(props) {

    return (
        <div>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                newestOnTop={false}
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