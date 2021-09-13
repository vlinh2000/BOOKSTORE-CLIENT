import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Avatar, Comment, Empty, Rate, Skeleton, Tabs, Tooltip, } from 'antd';
import moment from 'moment';
import { useSelector } from 'react-redux';

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

function ProductComment({ feedBack }) {

    const voted5 = feedBack?.filter(eva => eva.voted === 5);
    const voted4 = feedBack?.filter(eva => eva.voted === 4);
    const voted3 = feedBack?.filter(eva => eva.voted === 3);
    const voted2 = feedBack?.filter(eva => eva.voted === 2);
    const voted1 = feedBack?.filter(eva => eva.voted === 1);

    const listFeedBack = [voted5, voted4, voted3, voted2, voted1];
    const { starVoted } = useSelector(state => state.pageInfo);

    return (
        <Wrapper>
            <TitleStyled>Reviews</TitleStyled>
            <div>
                <Tabs defaultActiveKey={`${starVoted}`} >
                    {
                        listFeedBack?.map((feedBack, index) => (<TabPane tab={` ${5 - index} Sao (${feedBack?.length || 0})`} key={`${5 - index}`}>
                            {

                                feedBack?.map(eva => (<ConmentStyled
                                    key={eva.uid}
                                    author={<span>{eva.name}</span>}
                                    avatar={
                                        <Avatar alt={eva.name} src={eva?.avatar || ''}>{eva.avatar ? '' : eva.name?.charAt(0)?.toUpperCase() || ''}</Avatar>
                                    }
                                    content={<div><p>{eva.feedBackMessage}</p><Rate style={{ fontSize: 12 }} disabled defaultValue={5 - index} value={5 - index} /></div>}
                                    datetime={
                                        <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                                            <span>{eva.createAt}</span>
                                        </Tooltip>
                                    }
                                >

                                </ConmentStyled>))
                            }
                            {feedBack.length < 1 && <Empty />}
                        </TabPane>))

                    }

                </Tabs>
            </div>
        </Wrapper>
    );
}

export default ProductComment;