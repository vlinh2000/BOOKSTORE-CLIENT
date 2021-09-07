import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Avatar, Comment, Empty, Tabs, Tooltip, } from 'antd';
import moment from 'moment';

const { TabPane } = Tabs;

ProductComment.propTypes = {

};

const Wrapper = styled.div`
    padding:0 7rem;
    margin:2rem;
    line-height:20px;
`;

const TitleStyled = styled.div`

    font-size:20px;
    font-weight:500;
    text-transform:uppercase;
    text-align:center;
    
    &:after{
        content: ' ';
        display:block;
        height:10px;
        border-bottom:3px solid #9387d9;
        width:50px;
        margin:0 auto;
    }

`;

const ConmentStyled = styled(Comment)`
    border-bottom:1px solid #eee;

`;

function ProductComment(props) {

    return (
        <Wrapper>
            <TitleStyled>Reviews</TitleStyled>
            <div>
                <Tabs defaultActiveKey="1" >
                    <TabPane tab="5 Sao (2)" key="1">
                        <ConmentStyled
                            author={<a>Han Solo</a>}
                            avatar={
                                <Avatar
                                    src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                                    alt="Han Solo"
                                />
                            }
                            content={
                                <p>
                                    We supply a series of design principles, practical patterns and high quality design
                                    resources (Sketch and Axure).
                                </p>
                            }
                            datetime={
                                <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                                    <span>{moment().fromNow()}</span>
                                </Tooltip>
                            }
                        >
                        </ConmentStyled>
                    </TabPane>
                    <TabPane tab="4 Sao (0)" key="2">
                        <Empty />
                    </TabPane>
                    <TabPane tab="3 Sao (0)" key="3">
                        <Empty />
                    </TabPane>
                    <TabPane tab="2 Sao (0)" key="4">
                        <Empty />
                    </TabPane>
                    <TabPane tab="1 Sao (0)" key="5">
                        <Empty />
                    </TabPane>
                </Tabs>
            </div>
        </Wrapper>
    );
}

export default ProductComment;