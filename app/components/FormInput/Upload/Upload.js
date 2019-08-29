/* eslint-disable react/prop-types */
import React from 'react';
import { getIn } from 'formik';
import { Upload, Button, Icon, message } from 'antd';
import _ from 'lodash';
import { Translation } from 'react-i18next';
import { InputWrapperStyled } from '../styles';
import { UploadError } from './styles';
import { toI18n } from '../../../utils/func-utils';

const beforeUpload = () => false;

const uploadProps = {
  listType: 'picture',
  accept: 'image/*,.pdf',
  beforeUpload,
};


const UploadInput = ({
  field, // { name, value, onChange, onBlur }
  form: { errors },
  form,
  ...props
}) => {
  const {
    label,
    formLayout,
    onChange,
    ...rest
  } = props;

  let errorMessage = '';
  let validateStatus = 'success';

  errorMessage = getIn(errors, field.name);
  if (errorMessage) {
    validateStatus = 'error';
  }
  const handleChange = (e) => {
    if (_.isFunction(onChange)) {
      onChange(e);
    }
    const { file, fileList } = e;
    const { size, type } = file;
    if (size > 10000000) {
      message.error(toI18n('FORM_INPUT_UPLOAD_MAX_SIZE'));
      return;
    }
    if (type.includes('pdf') || type.includes('image')) {
      form.setFieldValue(field.name, fileList);
      return;
    }
    message.error(toI18n('FORM_INPUT_UPLOAD_FILE_TYPE'));
  };
  const fileList = form.values[field.name];
  return (
    <InputWrapperStyled
      label={label}
      validateStatus={validateStatus}
      {...formLayout}
    >
      <Translation>
        {
          t => (
            <div>
              <Upload
                {...uploadProps}
                {...rest}
                onChange={handleChange}
                fileList={fileList}
              >
                <Button>
                  <Icon type="upload" />
                  {t('FORM_INPUT_UPLOAD_PLACEHOLDER')}
                </Button>
              </Upload>
              <UploadError>{errorMessage}</UploadError>
            </div>
          )
        }
      </Translation>
    </InputWrapperStyled>
  );
};

export default UploadInput;
