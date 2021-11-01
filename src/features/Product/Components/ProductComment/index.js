import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import styled from 'styled-components';

import { Avatar, Comment, Empty, Pagination, Rate, Tabs, Tooltip, } from 'antd';

import moment from 'moment';
import { TitleStyled } from 'assets/styles/globalStyle';

const { TabPane } = Tabs;

ProductComment.propTypes = {
    feedBack: PropTypes.array
};

ProductComment.defaultProps = {
    feedBack: []
};

const ProductCommentStyled = styled.div`
    line-height:20px;
`;

const CommentStyled = styled(Comment)`
    border-bottom:1px solid #eee;
`;

const CommentWrapper = styled.div`
    min-height:300px;
`;

function ProductComment({ feedBack }) {

    const listFeedBack = React.useMemo(() => {
        const list = [[], [], [], [], []];

        feedBack.forEach(fb => {
            list[5 - fb.voted].push(fb);
        });
        return list;
    }, [feedBack])

    const { starVoted } = useSelector(state => state.pageInfo);
    return (
        <div>
            <TitleStyled>Reviews</TitleStyled>
            <CommentWrapper>
                <Tabs defaultActiveKey={`${starVoted}`} >
                    {
                        listFeedBack?.map((feedBack, index) => (<TabPane tab={<Rate />} tab={` ${5 - index} Sao (${feedBack?.length || 0})`} key={`${5 - index}`}>
                            {

                                feedBack?.map(eva => (<CommentStyled
                                    key={eva.uid}
                                    author={<span>{eva.user[0].name}</span>}
                                    avatar={
                                        <Avatar
                                            style={!eva.user[0].avatar && { backgroundColor: '#f56a00' }}
                                            alt={eva.user[0].name}
                                            src={eva.user[0].avatar || ''}>
                                            {eva.user[0].avatar ? '' : eva.user[0].avatar?.charAt(0)?.toUpperCase() || ''}
                                        </Avatar>
                                    }
                                    content={
                                        <div>
                                            <p>{eva.message}</p>
                                            <Rate style={{ fontSize: 12 }} disabled defaultValue={5 - index} value={5 - index} />
                                        </div>}
                                    datetime={
                                        <Tooltip title={moment(eva.createAt).format("DD/MM/YYYY")}>
                                            <span>{moment(eva.createAt).calendar()}</span>
                                        </Tooltip>
                                    }
                                >
                                </CommentStyled>))
                            }
                            {feedBack.length < 1 && <Empty />}
                        </TabPane>))

                    }

                </Tabs>
            </CommentWrapper>
        </div>
    );
}

export default ProductComment;