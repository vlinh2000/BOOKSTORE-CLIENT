import React from 'react';
import PropTypes from 'prop-types';
import { Button, Drawer, Modal, Space, Tabs } from 'antd';

LoginModal.propTypes = {

};

function LoginModal(props) {
    return (
        <div>
            <Drawer
                title="Đăng nhập"
                visible={true}
                width={400}
            >
            </Drawer>
        </div>
    );
}

export default LoginModal;