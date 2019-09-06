import React, { Component } from 'react';
import { Formik } from 'formik';
import { Form, Row, Col } from 'antd';
import {
  shape, arrayOf, func, object, bool, string,
} from 'prop-types';
import Scrollbar from 'components/Scrollbar';
import FormInput from '../../FormInput';
import { ButtonCancel, ButtonSubmit } from '../../../stylesheets/Button.style';
import { toI18n } from '../../../utils/func-utils';
import { EditFormWrapper, EditFormTitle, EditFormActionWrapper } from './styles';
import LoadingSpin from '../../Loading';

const scrollStyle = {
  height: 'calc(100vh - 160px)',
  width: '100%',
};


class EditDetail extends Component {
  static propTypes = {
    fields: arrayOf(shape()).isRequired,
    initialValues: shape().isRequired,
    additionalSubmitValues: shape().isRequired,
    validationSchema: shape.isRequired,
    title: object.isRequired,
    onInit: func.isRequired,
    isIniting: bool.isRequired,
    onSubmit: func.isRequired,
    onCancel: func.isRequired,
    onComplete: func.isRequired,
    isLoading: bool.isRequired,
    initParam: string,
    submitError: string,
  }

  componentDidMount = () => {
    const { onInit, initParam } = this.props;
    onInit(initParam);
  }

  componentDidUpdate = (prevProps) => {
    const {
      isLoading, submitError, onComplete,
      initialValues, isIniting,
    } = this.props;
    if (prevProps.isIniting && !isIniting) {
      this.editDetailFormik.getFormikContext().setValues(initialValues);
      return;
    }

    if (prevProps.isLoading && !isLoading && !submitError) {
      onComplete();
    }
  }

  renderFieldInput = () => {
    const { fields } = this.props;
    const colSpan = fields.length < 4 ? 24 : 12;
    return fields.map(
      ({ name, type, ...rest }) => (
        <Col sm={colSpan} xs={colSpan}>
          <FormInput
            name={name}
            type={type}
            {...rest}
          />
        </Col>
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
        ref={(formik) => { this.editDetailFormik = formik; }}
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={this.handleSubmit}
      >
        {({ handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <Scrollbar autoHide style={scrollStyle}>
              <Row gutter={32}>
                {this.renderFieldInput()}
              </Row>
            </Scrollbar>
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
    const { title, isLoading, isIniting } = this.props;
    return (
      <EditFormWrapper>
        <EditFormTitle>{title}</EditFormTitle>
        <LoadingSpin loading={isLoading || isIniting}>
          {this.renderForm()}
        </LoadingSpin>
      </EditFormWrapper>
    );
  }
}

export default EditDetail;
