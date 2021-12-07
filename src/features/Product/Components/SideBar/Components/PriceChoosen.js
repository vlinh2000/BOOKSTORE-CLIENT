import React from 'react';
import DeliverTitle from './DeliverTitle';
import styled from 'styled-components';
import { Divider, Slider, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { filterBy } from 'features/Product/productSlice';
import { DollarCircleOutlined, SwapOutlined } from '@ant-design/icons';


const PriceChoosenStyled = styled.div`
    margin-bottom :2.5rem;
`;


function PriceChoosen() {
    const { rangeStep } = useSelector(state => state.pageInfo);

    const [rangeValue, setRangeValue] = React.useState([1, 100]);

    const dispatch = useDispatch();

    const handleChange = (values) => {
        setRangeValue(values);
        dispatch(filterBy({ rangePrice: values }));
    }

    return (
        <PriceChoosenStyled>
            <DeliverTitle title="price" />
            <div style={{ marginLeft: '0.75rem' }}>
                <Slider
                    tooltipVisible={false}
                    range
                    defaultValue={[1, 100]}
                    min={1}
                    max={100}
                    onChange={handleChange} />
                <Typography.Text>
                    <span style={{ color: '#969696', fontWeight: 500, marginRight: 15 }}>Range :</span>
                    <span><DollarCircleOutlined /> {`${Math.floor(rangeValue[0] * rangeStep)} `}</span>
                    <Divider type='vertical' />
                    <SwapOutlined />
                    <Divider type='vertical' />
                    <span><DollarCircleOutlined /> {`${Math.ceil(rangeValue[1] * rangeStep)}`}</span>
                </Typography.Text>
            </div>
        </PriceChoosenStyled>
    );
}

export default PriceChoosen;