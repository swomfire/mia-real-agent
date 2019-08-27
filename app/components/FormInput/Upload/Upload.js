/* eslint-disable react/prop-types */
import React from 'react';
import { getIn } from 'formik';
import { Upload, Button, Icon } from 'antd';
import _ from 'lodash';
import { Translation } from 'react-i18next';
import { InputWrapperStyled } from '../styles';
import { UploadError } from './styles';

const beforeUpload = () => false;

const uploadProps = {
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
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
    const { fileList } = e;
    form.setFieldValue(field.name, fileList);
  };
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
              <Upload {...uploadProps} {...rest} onChange={handleChange}>
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
