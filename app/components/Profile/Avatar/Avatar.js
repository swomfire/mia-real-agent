import React, { Component } from 'react';
import { Upload, Icon } from 'antd';
import { bool, string, func } from 'prop-types';
import { AvatarWrapper, ClickToEditWrapper } from './styles';
import LoadingSpin from '../../Loading';
import { toI18n } from '../../../utils/func-utils';

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
        <div className="ant-upload-text">
          {toI18n('FORM_UPLOAD')}
        </div>
      </div>
    );
    return (
      <AvatarWrapper>
        <LoadingSpin loading={isLoading}>
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
        </LoadingSpin>
        <ClickToEditWrapper>
          <div>
            <Icon type="camera" theme="filled" />
            {toI18n('FORM_UPDATE')}
          </div>
        </ClickToEditWrapper>
      </AvatarWrapper>
    );
  }
}

export default Avatar;
