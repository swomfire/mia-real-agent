import React, { Component } from 'react';
import {
  Form, Row, Col, Button, Icon, notification,
} from 'antd';
import {
  func, shape, bool, string,
} from 'prop-types';
import { Formik } from 'formik';
import * as Yup from 'yup';
import FormInput from '../FormInput/FormInput';
import { toI18n } from '../../utils/func-utils';
import { ModalStyled, ErrorMessage } from './styles';

const initialValues = {
  en: '',
  vn: '',
  parameters: [],
};
const initialParameterValues = {
  parameterId: '',
  value: '',
};

const parameterSchema = Yup.object().shape({
  parameterId: Yup.string().trim().required(toI18n('FORM_REQUIRED')),
  value: Yup.string().trim().required(toI18n('FORM_REQUIRED')),
});

const responseSchema = Yup.object().shape({
  en: Yup.string().trim().required(toI18n('FORM_REQUIRED')),
  vn: Yup.string().trim().required(toI18n('FORM_REQUIRED')),
  parameters: Yup.array().of(parameterSchema).required(toI18n('FORM_REQUIRED')),
});

const initialState = {
  isAdding: false,
  choosedParameterId: null,
  selectedParameters: [],
};

class AddResponseModal extends Component {
  state = initialState

  static propTypes = {
    createResponse: func.isRequired,
    handleClose: func.isRequired,
    isOpen: bool.isRequired,
    isCreating: bool.isRequired,
    createError: string,
    currentIntent: shape(),
  }

  componentDidUpdate = ({ isCreating: prevIsCreating }) => {
    const { isCreating, createError } = this.props;
    if (prevIsCreating && !isCreating) {
      if (!createError) {
        notification.success({ message: toI18n('ADMIN_RESPONSE_ADD_SUCCESS') });
        this.handleCancel();
      } else {
        notification.error({ message: createError });
      }
    }
  }

  handleCancel = () => {
    const { handleClose } = this.props;
    handleClose();
    this.responseFormik.getFormikContext().resetForm();
    this.setState(initialState);
  }

  toggleAddParameter = (isAdding) => {
    this.setState({
      isAdding,
    });
  }

  handleParameterOption = () => {
    const { selectedParameters } = this.state;
    const { currentIntent } = this.props;
    const { parameters = [] } = currentIntent || {};
    const filtered = parameters.filter(
      ({ parameterId }) => !selectedParameters.find(
        param => parameterId === param.parameterId
      )
    );
    return filtered.map(({ displayName, parameterId }) => ({
      label: displayName,
      value: parameterId,
    }));
  }

  handleParameterValue = () => {
    const { currentIntent } = this.props;
    const { choosedParameterId } = this.state;
    const { parameters = [] } = currentIntent || {};
    const parameter = parameters.find(({ parameterId: itemId }) => itemId === choosedParameterId);
    if (!parameter) {
      return [];
    }
    return parameter.values.map(value => ({
      label: value,
      value,
    }));
  }

  chooseParameter = (parameterId) => {
    const context = this.parameterformik.getFormikContext();
    context.setValues({ parameterId });
    this.setState({
      choosedParameterId: parameterId,
    });
  }

  addParameter = (values) => {
    const { selectedParameters } = this.state;
    const context = this.responseFormik.getFormikContext();
    const formData = context.values;
    const { parameters } = formData;
    context.setValues({
      ...formData,
      parameters: parameters.concat(values),
    });
    this.setState({
      isAdding: false,
      choosedParameterId: null,
      selectedParameters: selectedParameters.concat(values),
    });
  }

  handleRenderAddedParameter = ({ parameters: choosedParams }) => {
    const { currentIntent } = this.props;
    const { parameters = [] } = currentIntent || {};
    return choosedParams.map(
      ({ parameterId, value }) => {
        const { displayName } = parameters.find(({ parameterId: itemId }) => parameterId === itemId);
        return (
          <h2>{`[${displayName}]: ${value}`}</h2>
        );
      }
    );
  }

  renderAddParameters = () => (
    <Formik
      ref={(formik) => { this.parameterformik = formik; }}
      initialValues={initialParameterValues}
      validationSchema={parameterSchema}
      onSubmit={this.addParameter}
    >
      {({ handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <Row gutter={32}>
            <Col sm={10} xs={10}>
              <FormInput
                name="parameterId"
                type="select"
                options={this.handleParameterOption()}
                onChange={this.chooseParameter}
                label={toI18n('ADMIN_INTENT_ADD_PARAMETER_ID')}
                login={1}
              />
            </Col>
            <Col sm={10} xs={10}>
              <FormInput
                name="value"
                type="select"
                options={this.handleParameterValue()}
                label={toI18n('ADMIN_INTENT_ADD_PARAMETER_VALUE')}
                login={1}
              />
            </Col>
            <Col sm={4} xs={4}>
              <Button type="button" onClick={() => this.toggleAddParameter(false)}><Icon type="close" /></Button>
              <Button onClick={handleSubmit}><Icon type="check" /></Button>
            </Col>
          </Row>
        </Form>
      )}
    </Formik>
  )

  handleSubmit = ({ parameters, en, vn }) => {
    const { createResponse, currentIntent } = this.props;
    const { _id: intentId } = currentIntent;
    createResponse({
      parameters,
      intentId,
      response: {
        en,
        vn,
      },
    });
  }

  render() {
    const { isAdding } = this.state;
    const {
      isOpen, currentIntent, isCreating,
    } = this.props;
    const { displayName } = currentIntent || {};
    return (
      <Formik
        ref={(formik) => { this.responseFormik = formik; }}
        initialValues={initialValues}
        validationSchema={responseSchema}
        onSubmit={this.handleSubmit}
        confirmLoading={isCreating}
        okText={toI18n('FORM_SUBMIT')}
      >
        {({ handleSubmit, values, errors: { parameters: paramError } }) => (
          <ModalStyled
            title={`Create Response for ${displayName}`}
            visible={isOpen}
            onOk={handleSubmit}
            onCancel={this.handleCancel}
          >
            {isAdding ? this.renderAddParameters() : (
              <Button onClick={() => this.toggleAddParameter(true)}>
                + Add Parameter
              </Button>
            )}
            <ErrorMessage>{paramError}</ErrorMessage>
            <Form onSubmit={handleSubmit}>
              <Row gutter={32}>
                <Col sm={24} xs={24}>
                  {this.handleRenderAddedParameter(values)}
                </Col>
              </Row>
              <Row gutter={32}>
                <Col sm={24} xs={24}>
                  <FormInput
                    name="en"
                    type="text"
                    label={toI18n('ADMIN_INTENT_ADD_RESPONSE_EN')}
                    login={1}
                  />
                </Col>
              </Row>
              <Row gutter={32}>
                <Col sm={24} xs={24}>
                  <FormInput
                    name="vn"
                    type="text"
                    label={toI18n('ADMIN_INTENT_ADD_RESPONSE_VN')}
                    login={1}
                  />
                </Col>
              </Row>
            </Form>
          </ModalStyled>
        )}
      </Formik>
    );
  }
}

export default AddResponseModal;
