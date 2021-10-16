import React from 'react';
import { Button, message, Upload } from 'antd';
import { CameraOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { Controller } from 'react-hook-form';

AvatarSelectField.propTypes = {

};

const WrapperStyled = styled.div`
    margin-bottom:0.5rem;       
`;

function AvatarSelectField(props) {

    const { name, disabled, control, value } = props;

    const beforeUpload = (file) => {
        const isValid = file.type === ('image/png' || 'image/jpeg');
        if (!isValid) {
            message.error("You can only upload JPNG or PNG or JPG file");
            return true;
        }
        return false;
    }

    const fileDefault = value ?
        [{
            status: 'done',
            url: value,
        }] : [];

    console.log(fileDefault);

    const onPreview = async file => {
        let src = file.url;
        if (!src) {
            src = await new Promise(resolve => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj);
                reader.onload = () => resolve(reader.result);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow.document.write(image.outerHTML);
    };
    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => {
                return <WrapperStyled>
                    <Upload
                        {...field}
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        disabled={disabled}
                        defaultFileList={fileDefault}
                        listType="picture-card"
                        onPreview={onPreview}
                        multiple={true}
                        maxCount={1}
                        beforeUpload={beforeUpload}  >
                        <Button
                            disabled={disabled}
                            ghost
                            type="text"
                            border={false}
                            icon={<CameraOutlined />} />
                    </Upload>
                </WrapperStyled>
            }}>

        </Controller>

    );
}

export default AvatarSelectField;