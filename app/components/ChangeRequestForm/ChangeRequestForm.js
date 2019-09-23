import React, { Component } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Form } from 'antd';
import ShadowScrollbars from 'components/Scrollbar';
import { shape, func } from 'prop-types';
import ChangeRequestField from './ChangeRequestField/ChangeRequestField';
import { ChangeRequestFormHeader, ChangeRequestFormRequestChangeWrapper, ChangeRequestFormActionGroupRight } from './styles';
import { ButtonPrimary } from '../../stylesheets/Button.style';
import { toI18n } from '../../utils/func-utils';

class ChangeRequestForm extends Component {
  static propTypes = {
    onSubmit: func.isRequired,
    fields: shape(),
    scrollStyle: shape(),
  }

  mapInitialValues = () => {
    const { fields } = this.props;
    let initialValues = {};
    Object.keys(fields).forEach((field) => {
      const { ref } = fields[field];
      initialValues = { ...initialValues, [field]: '' };
      if (ref) {
        Object.keys(ref).forEach(
          (key) => {
            initialValues = { ...initialValues, [key]: ref[key].value };
          }
        );
      }
    });
    return initialValues;
  }

  mapValidationSchema = () => {
    const { fields } = this.props;
    let validationSchema = {};
    Object.keys(fields).forEach((field) => {
      const { schema } = fields[field];
      validationSchema = { ...validationSchema, [field]: schema };
    });
    return Yup.object().shape(validationSchema);
  }

  renderFields = () => {
    const { fields } = this.props;
    return Object.keys(fields).map((field) => {
      const {
        label, comment, type, value, ...rest
      } = fields[field];
      return (
        <ChangeRequestField
          name={field}
          label={label}
          comment={comment}
          type={type}
          value={value}
          additional={rest}
        />
      );
    });
  }

  renderActionGroup = () => (
    <ChangeRequestFormActionGroupRight>
      <ButtonPrimary
        type="submit"
      >
        {toI18n('FORM_SUBMIT')}
      </ButtonPrimary>
    </ChangeRequestFormActionGroupRight>
  );

  handleSubmit = (values) => {
    const { onSubmit } = this.props;
    onSubmit(values);
  }

  render() {
    const { fields, scrollStyle } = this.props;
    const totalRequest = Object.keys(fields).length || 0;
    return (
      <Formik
        ref={(formik) => { this.formik = formik; }}
        initialValues={this.mapInitialValues()}
        validationSchema={this.mapValidationSchema()}
        onSubmit={this.handleSubmit}
      >
        {({ handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <ChangeRequestFormHeader>
              <ChangeRequestFormRequestChangeWrapper>
                <span>
                  {toI18n('APPLICATION_REVIEW_CHANGE_REQUESTED')}
                </span>
                <span className="value">
                  {totalRequest}
                </span>
              </ChangeRequestFormRequestChangeWrapper>
              {this.renderActionGroup()}
            </ChangeRequestFormHeader>
            <ShadowScrollbars autoHide style={scrollStyle}>
              {this.renderFields()}
            </ShadowScrollbars>
          </Form>
        )}
      </Formik>
    );
  }
}

export default ChangeRequestForm;