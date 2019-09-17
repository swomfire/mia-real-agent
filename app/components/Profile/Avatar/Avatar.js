import React, { Component } from 'react';
import { Upload, Icon } from 'antd';
import { bool, string, func } from 'prop-types';
import { AvatarWrapper } from './styles';

function beforeUpload() {
  return false;
}

export class Avatar extends Component {
  static propTypes = {
    updateAvatar: func.isRequired,
    isLoading: bool,
    avatar: string,
  }

  handleChange = ({ file }) => {
    const { updateAvatar } = this.props;
    const { name, type } = file;
    updateAvatar({ name, type, originFileObj: file });
  };

  render() {
    const { isLoading = false, avatar } = this.props;
    const uploadButton = (
      <div>
        <Icon type={isLoading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <AvatarWrapper>
        <Upload
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          beforeUpload={beforeUpload}
          onChange={this.handleChange}
        >
          {avatar
            ? <img src={avatar} alt="avatar" style={{ width: '100%' }} />
            : uploadButton}
        </Upload>
      </AvatarWrapper>
    );
  }
}

export default Avatar;
