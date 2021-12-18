import React from 'react';
import DeliverTitle from './DeliverTitle';
import styled from 'styled-components';
import { Slider, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { filterBy } from 'features/Product/productSlice';
import { DollarCircleOutlined, SwapOutlined } from '@ant-design/icons';


const PriceChoosenStyled = styled.div`
    margin-bottom :2.5rem;
`;

const SliderStyled = styled(Slider)`
    margin-bottom:1.5rem;
    vertical-align:middle;

    .ant-slider-track{
        background-color:#111;
        height:1px;
    }

    &:hover .ant-slider-track {
        background-color:#111;
    }

    &:hover .ant-slider-handle:not(.ant-tooltip-open) {
        border-color:#111;
    }

    .ant-slider-handle{
        border-color:#001f3f;
        border-radius:0;
        margin-top:-6px;
        height:12px;
        width:12px;
        cursor:w-resize;
        
        &:focus{
            border-color:#111;
        }
    }

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
            <div style={{ marginLeft: '0.75rem', marginTop: '1.5rem' }}>
                <SliderStyled
                    tooltipVisible={false}
                    range
                    defaultValue={[1, 100]}
                    min={1}
                    max={100}
                    onChange={handleChange} />
                <Typography.Text>
                    <span style={{ color: '#969696', fontWeight: 'bold', marginRight: 15 }}>Range :</span>
                    <span style={{ fontSize: 18, color: "#111", fontWeight: "bold" }}>
                        <DollarCircleOutlined style={{ fontSize: 13 }} /> {`${Math.floor(rangeValue[0] * rangeStep)} `}
                    </span>
                    <SwapOutlined style={{ margin: "0 0.5rem" }} />
                    <span style={{ fontSize: 18, color: "#111", fontWeight: "bold" }}>
                        <DollarCircleOutlined style={{ fontSize: 13 }} /> {`${Math.ceil(rangeValue[1] * rangeStep)}`}
                    </span>
                </Typography.Text>
            </div>
        </PriceChoosenStyled>
    );
}

export default PriceChoosen;