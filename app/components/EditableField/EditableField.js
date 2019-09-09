import React, { Component } from 'react';
import { Formik } from 'formik';
import {
  func, any, string, object, bool,
} from 'prop-types';
import {
  Form, Row, Col, Tooltip, Icon, notification,
} from 'antd';
import Mustache from 'mustache';
import LoadingSpin from '../Loading';
import FormInput from '../FormInput';
import { ButtonCancel, ButtonPrimary } from '../../stylesheets/Button.style';
import { InputActionWrapper, EditableInputWrapper } from './styles';
import { toI18n } from '../../utils/func-utils';

class EditableField extends Component {
  static propTypes = {
    onSubmit: func.isRequired,
    isSubmitting: bool,
    submitError: string,
    value: any.isRequired,
    type: string,
    schema: object,
    format: string,
  }

  componentDidUpdate = (prevProps) => {
    const { isSubmitting, submitError } = this.props;
    if (prevProps.isSubmitting && !isSubmitting) {
      if (!submitError) {
        this.setState({
          selected: false,
        });
      } else {
        notification.error({ message: submitError });
      }
    }
  }

  state = {
    selected: false,
  }

  handleDoubleClick = () => {
    this.setState({
      selected: true,
    });
  }

  handleCancel = () => {
    this.setState({
      selected: false,
    });
  }

  handleSubmit = ({ value }) => {
    const { onSubmit } = this.props;
    onSubmit(value);
  }

  render() {
    const { selected } = this.state;
    const {
      value, type, schema, isSubmitting,
      format,
    } = this.props;
    if (selected) {
      return (
        <EditableInputWrapper>
          <Formik
            initialValues={{ value }}
            validationSchema={schema}
            onSubmit={this.handleSubmit}
          >
            {({ handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col span={16}>
                    <LoadingSpin loading={isSubmitting}>
                      <FormInput
                        type={type}
                        name="value"
                        login={1}
                      />
                    </LoadingSpin>
                  </Col>
                  <Col span={8}>
                    <InputActionWrapper>
                      <ButtonCancel onClick={this.handleCancel}>
                        {toI18n('FORM_CANCEL')}
                      </ButtonCancel>
                      <ButtonPrimary type="submit">
                        {toI18n('FORM_SAVE')}
                      </ButtonPrimary>
                    </InputActionWrapper>
                  </Col>
                </Row>
              </Form>
            )}
          </Formik>
        </EditableInputWrapper>
      );
    }
    return (
      <EditableInputWrapper onDoubleClick={this.handleDoubleClick}>
        <Tooltip title={toI18n('FORM_DOUBLE_TO_EDIT')}>
          {Mustache.render(format, { value })}
          <Icon type="edit" onClick={this.handleDoubleClick} />
        </Tooltip>
      </EditableInputWrapper>
    );
  }
}

export default EditableField;
