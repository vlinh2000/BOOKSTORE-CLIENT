import React from 'react';
import { Button, message, Upload } from 'antd';
import { CameraOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { Controller } from 'react-hook-form';

AvatarSelectField.propTypes = {

};

const WrapperStyled = styled.div`
    margin-bottom:0.5rem;       
    .ant-upload-list{
        display:none;
    }
    `;

const ShowAvatarStyled = styled.div`
    position:relative;
    height:80px;
    width:80px;
    z-index:0;
    box-shadow:1px 1px 25px 5px #DDD;
    margin-bottom:1rem;
    border-radius:50%;
    img{
        border-radius:50%;
    }
    `;

const CameraIconStyled = styled(CameraOutlined)`
    color:#888;

`;

const UploadStyled = styled(Upload)`
    position:absolute;
    z-index:1000;
    bottom:0;
`;

function AvatarSelectField(props) {

    const { name, disabled, control, value } = props;

    const [currentAvatar, setCurrentAvatar] = React.useState(value);


    const onReadFile = async file => {
        const src = await new Promise(resolve => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
        });
        setCurrentAvatar(src);
    };
    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => {

                const beforeUpload = (file, fileList) => {
                    const isValid = file.type === ('image/png' || 'image/jpeg');
                    if (!isValid) {
                        message.error("You can only upload JPNG or PNG or JPG file");
                        return true;
                    }
                    onReadFile(file);
                    return false;
                }
                const onChange = (e) => {
                    field.onChange(e.file);
                    field.onBlur(true);
                }

                return <WrapperStyled>
                    <ShowAvatarStyled>
                        <img
                            width={80}
                            height={80}
                            src={currentAvatar} />
                        <UploadStyled
                            {...field}
                            onChange={onChange}
                            disabled={disabled}
                            maxCount={1}
                            beforeUpload={beforeUpload}  >
                            <Button
                                disabled={disabled}
                                ghost
                                shape="circle"
                                type="text"
                                border={false}
                                icon={<CameraIconStyled />} />
                        </UploadStyled>
                    </ShowAvatarStyled>
                </WrapperStyled>
            }}>

        </Controller>

    );
}

export default AvatarSelectField;