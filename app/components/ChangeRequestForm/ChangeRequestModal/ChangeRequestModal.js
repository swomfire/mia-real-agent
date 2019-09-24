import React, { Component } from 'react';
import {
  Modal, Form, Row, Col,
} from 'antd';
import { Formik } from 'formik';
import {
  shape, bool, func, any, number,
} from 'prop-types';
import FormInput from '../../FormInput/FormInput';
import { ButtonCancel, ButtonSubmit } from '../../../stylesheets/Button.style';
import { toI18n } from '../../../utils/func-utils';
import { ActionGroup } from './styles';

class ChangeRequestModal extends Component {
  static propTypes = {
    fields: shape().isRequired,
    schema: shape().isRequired,
    title: any.isRequired,
    isOpen: bool.isRequired,
    isEdit: bool.isRequired,
    onCancel: func.isRequired,
    onSubmit: func.isRequired,
    onEdit: func.isRequired,
    selectedIndex: number,
    initValue: shape(),
  }

  handleInitialValues = () => {
    const { fields, initValue } = this.props;
    let initialValues = {};
    Object.keys(fields).forEach((field) => {
      initialValues = { ...initialValues, [field]: '' };
    });
    return initValue || initialValues;
  }

  renderFormInput = (values) => {
    const { fields } = this.props;

    return Object.keys(fields).map((key) => {
      const {
        label, type, skip, ...rest
      } = fields[key];
      return (
        <div
          key={key}
        >
          {!values[skip] && (
            <FormInput
              label={label}
              name={key}
              type={type}
              login={1}
              {...rest}
            />
          )}
        </div>
      );
    });
  }

  handleSubmit = (values) => {
    const { onSubmit, onEdit, selectedIndex } = this.props;
    if (selectedIndex != null) {
      onEdit(values, selectedIndex);
      return;
    }
    onSubmit(values);
  }

  render() {
    const {
      isOpen, onCancel, title, schema, isEdit = false,
    } = this.props;
    return (
      <Modal
        title={(
          <span>
            Add
            {' '}
            {title}
          </span>
        )}
        visible={isOpen}
        onCancel={onCancel}
        footer={null}
      >
        <Formik
          validationSchema={schema}
          initialValues={this.handleInitialValues()}
          onSubmit={this.handleSubmit}
        >
          {({ handleSubmit, values }) => (
            <Form onSubmit={handleSubmit}>
              {this.renderFormInput(values)}
              <Row gutter={32}>
                <Col sm={24} xs={24}>
                  <ActionGroup>
                    <ButtonCancel
                      onClick={onCancel}
                    >
                      {toI18n('FORM_CANCEL')}
                    </ButtonCancel>
                    <ButtonSubmit type="submit">
                      {isEdit >= 0 ? toI18n('FORM_SAVE') : toI18n('FORM_ADD')}
                    </ButtonSubmit>
                  </ActionGroup>
                </Col>
              </Row>
            </Form>
          )}
        </Formik>
      </Modal>
    );
  }
}

export default ChangeRequestModal;
