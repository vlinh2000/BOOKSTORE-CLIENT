import React from 'react';
import { Avatar, Button, Col, Form, Rate, Row } from 'antd';
import InputField from 'custom-fields/InputFields';
import styled from 'styled-components';

const Wrapper = styled.div`
    padding:0 9rem;
`;

const RaitingStyled = styled.div`
    color:#969696;
    font-size:15px;
    font-weight:bold;
    margin-bottom:1rem;

`;

function ProductEvaluateForm(props) {
    return (
        <Wrapper>
            <Form>
                <RaitingStyled><span>Your rating:</span>  <Rate /></RaitingStyled>
                <Row gutter={20}>
                    <Avatar>L</Avatar>
                    <Col span={10}>
                        <InputField
                            name="evaluate"
                            type="textarea"
                            placeholder="Your Reviews"
                        />
                    </Col>
                </Row>
                <Button type="primary">
                    Submit
                </Button>
            </Form>

        </Wrapper>
    );
}

export default ProductEvaluateForm;

