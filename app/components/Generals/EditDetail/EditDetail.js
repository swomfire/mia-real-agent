import React, { Component } from 'react';
import { Formik } from 'formik';
import { Form, Row, Col } from 'antd';
import {
  shape, arrayOf, func, object, bool, string,
} from 'prop-types';
import FormInput from '../../FormInput';
import { ButtonCancel, ButtonSubmit } from '../../../stylesheets/Button.style';
import { toI18n } from '../../../utils/func-utils';
import { EditFormWrapper, EditFormTitle, EditFormActionWrapper } from './styles';
import LoadingSpin from '../../Loading';

class EditDetail extends Component {
  static propTypes = {
    fields: arrayOf(shape()).isRequired,
    initialValues: shape().isRequired,
    additionalSubmitValues: shape().isRequired,
    validationSchema: shape.isRequired,
    title: object.isRequired,
    onSubmit: func.isRequired,
    onCancel: func.isRequired,
    onComplete: func.isRequired,
    isLoading: bool.isRequired,
    submitError: string,
  }

  componentDidUpdate = (prevProps) => {
    const { isLoading, submitError, onComplete } = this.props;
    if (prevProps.isLoading && !isLoading && !submitError) {
      onComplete();
    }
  }

  renderFieldInput = () => {
    const { fields } = this.props;
    return fields.map(
      ({ name, type, ...rest }) => (
        <Row gutter={32}>
          <Col sm={24} xs={24}>
            <FormInput
              name={name}
              type={type}
              {...rest}
            />
          </Col>
        </Row>
      )
    );
  }

  handleSubmit = (values) => {
    const { onSubmit, additionalSubmitValues } = this.props;
    onSubmit({ ...additionalSubmitValues, ...values });
  }

  handleCancel = () => {
    const { onCancel } = this.props;
    onCancel();
  }

  renderForm = () => {
    const { initialValues, validationSchema } = this.props;
    return (
      <Formik
        ref={(formik) => { this.educationformik = formik; }}
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={this.handleSubmit}
      >
        {({ handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            {this.renderFieldInput()}
            <EditFormActionWrapper>
              <ButtonCancel
                onClick={this.handleCancel}
              >
                {toI18n('FORM_CANCEL')}
              </ButtonCancel>
              <ButtonSubmit type="submit">
                {toI18n('FORM_SAVE')}
              </ButtonSubmit>
            </EditFormActionWrapper>
          </Form>
        )}
      </Formik>
    );
  }

  render() {
    const { title, isLoading } = this.props;
    return (
      <EditFormWrapper>
        <EditFormTitle>{title}</EditFormTitle>
        <LoadingSpin loading={isLoading}>
          {this.renderForm()}
        </LoadingSpin>
      </EditFormWrapper>
    );
  }
}

export default EditDetail;
