import React from 'react';
// import PropTypes from 'prop-types';
import { FacebookOutlined, InstagramOutlined, ShoppingCartOutlined, TwitterOutlined, UserOutlined, YoutubeOutlined } from '@ant-design/icons'
import { Button, Col, Popover, Row } from 'antd';
import styled from 'styled-components';
import { NavLink, useHistory } from 'react-router-dom';
import FormSearch from 'components/FormSearch';
import CartModal from 'modals/CartModal';
import { Logo } from 'constants/Global';
import { useDispatch, useSelector } from 'react-redux';
import { switchLoginModal } from 'app/modalSlice';
import LoginModal from 'modals/LoginModal';
import RegisterModal from 'modals/RegisterModal';

// Header.propTypes = {

// };

const HeaderStyled = styled.div`
    height: 150px;
    border-bottom: 2px solid #eee;
`;

const TopnavStyled = styled.div`
    padding: 0 4rem;
    background: #f5f5f5;
    color: #969696;
    height: 40px;
    font-weight: 500;    
    line-height: 40px;
    letter-spacing: 3px;
    .hotline{
        font-size:11px;
        text-transform: uppercase;
    };

    .social-media{
        list-style:none;
        display:flex;
            
            & > li > a{
                color:#969696;
            }

            & > li {
                cursor: pointer;
                margin-right: 1.5rem;
            };

            & > li :hover {
                color: #9387d9;
            };
        }
    }
`;


const HeaderMainStyled = styled.div`
    padding: 0 4rem;
    height: 110px;

    .logo > img {
        width: 100px;
    }
`;

const InfoCartStyled = styled.div`
    display: flex;
    align-items: center;
    height:110px;
    .info{
        margin-left: 0.3rem;
        font-size: 12px;
        font-weight: 500;

        .price {
                color: #9387d9;
            }
    }


`;

const ButtonStyled = styled(Button)`
    border-width:2px;

    &:hover{
        color:#FFF ;
        border-color:#9387d9 ;
        background:#9387d9;
    }
`;


function Header(props) {

    const dispatch = useDispatch();
    const { isAuth, user: { name } } = useSelector((state) => state.user.currentUser);
    const history = useHistory();

    const handleSwitchLoginModal = () => {
        //isAuth
        if (isAuth) {
            history.push('/cart');
            return;
        }

        const action = switchLoginModal(true);
        dispatch(action);
    }

    // const handleSwitchCartModal = ()=>{
    //     const action = switchLoginModal(true);
    //     dispatch(action);
    // }


    return (
        <HeaderStyled>
            <TopnavStyled>
                <Row justify="space-between" align="middle" style={{ height: '100%' }}>
                    <Col xs={{ span: 0 }} sm={{ span: 12 }}  >
                        <div className="hotline" >
                            hotline: +84-( 38 )-774-6557
                        </div>
                    </Col>
                    <Col xs={{ span: 0 }} sm={{ span: 4 }} push={1}>
                        <div className="social-media">
                            <li><a href="https://twitter.com" target='_blank' rel="noopener noreferrer"><TwitterOutlined /></a></li>
                            <li><a href="https://instagram.com" target='_blank' rel="noopener noreferrer"><InstagramOutlined /></a></li>
                            <li><a href="https://facebook.com" target='_blank' rel="noopener noreferrer"><FacebookOutlined /></a></li>
                            <li><a href="https://youtube.com" target='_blank' rel="noopener noreferrer"><YoutubeOutlined /></a></li>
                        </div>
                    </Col>
                </Row>
            </TopnavStyled>
            <HeaderMainStyled>
                <Row justify="space-between" align="middle" >
                    <Col xs={{ span: 24 }} sm={{ span: 4 }} >
                        <Row align='middle' justify='center'>
                            <NavLink
                                className="logo"
                                exact
                                to='/'>
                                <img src={Logo} alt="logo" />
                            </NavLink>
                        </Row>
                    </Col>
                    <Col xs={{ span: 0 }} sm={{ span: 6 }} md={{ span: 10 }}>
                        <FormSearch />
                    </Col>
                    <Col xs={{ span: 0 }} sm={{ span: 10 }} md={{ span: 6 }}>
                        <Row justify="space-around">
                            <Col span={10} >
                                <InfoCartStyled>
                                    <ButtonStyled onClick={handleSwitchLoginModal} shape='circle' size='large' icon={<UserOutlined />}></ButtonStyled>
                                    <div className='info'>
                                        <div> {isAuth ? name : 'Sign in'} </div>
                                        <div> My account </div>
                                    </div>
                                </InfoCartStyled>
                            </Col>
                            <Col span={10} >
                                <InfoCartStyled>
                                    <Popover
                                        trigger='click'
                                        visible={false}
                                        content={<CartModal />}
                                    >
                                        <ButtonStyled shape='circle' size='large' icon={<ShoppingCartOutlined />}></ButtonStyled>
                                    </Popover>
                                    <div className='info'>
                                        <div> My cart</div>
                                        <div className="price" > $ 00.00 </div>
                                    </div>
                                </InfoCartStyled>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </HeaderMainStyled>
            <LoginModal />
            <RegisterModal />
        </HeaderStyled>
    );
}

export default Header;