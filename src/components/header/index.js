import React from 'react';
import PropTypes from 'prop-types';
import './Header.scss'
import { CarOutlined, FacebookOutlined, InstagramOutlined, ShoppingCartOutlined, ShoppingOutlined, TwitterOutlined, UserOutlined, YoutubeOutlined } from '@ant-design/icons'
import { Button } from 'antd';

Header.propTypes = {

};

function Header(props) {
    return (
        <div className="header">
            <div className="header__topnav">
                <div className="header__topnav__hotline" >
                    hotline: +84-( 38 )-774-6557
                </div>
                <div className="header__topnav__social-media">
                    <li><TwitterOutlined />   </li>
                    <li><InstagramOutlined /></li>
                    <li><FacebookOutlined /></li>
                    <li><YoutubeOutlined /></li>
                </div>
            </div>
            <div className="header__main">
                <div className="header__main__logo">
                    <img src="https://wpbingosite.com/wordpress/tikie/wp-content/uploads/2021/05/logo.png" alt="logo" />
                </div>
                <div className="header__main__search">
                    search
                </div>
                <div className="header__main__info-cart">
                    <div className="header__main__info-cart__info">
                        <div>
                            <Button shape='circle' size='large' icon={<UserOutlined />}></Button>
                        </div>
                        <div>
                            <div> Sign in </div>
                            <div> My account </div>
                        </div>
                    </div>
                    <div className="header__main__info-cart__info">
                        <div>
                            <Button shape='circle' size='large' icon={<ShoppingCartOutlined />}></Button>
                        </div>
                        <div>
                            <div> My cart</div>
                            <div className="header__main__info-cart__info__price" > $ 00.00 </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;