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
  response: {
    en: '',
    vn: '',
  },
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
  response: Yup.object().shape({
    en: Yup.string().trim().required(toI18n('FORM_REQUIRED')),
    vn: Yup.string().trim().required(toI18n('FORM_REQUIRED')),
  }).required(toI18n('FORM_REQUIRED')),
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
    submitAction: func.isRequired,
    handleClose: func.isRequired,
    isOpen: bool.isRequired,
    isCreating: bool.isRequired,
    createError: string,
    title: shape(),
    initialValues: shape(),
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

  removeParameter = (parameterId) => {
    const { selectedParameters } = this.state;
    const context = this.responseFormik.getFormikContext();
    const formData = context.values;
    const { parameters } = formData;
    context.setValues({
      ...formData,
      parameters: parameters.filter(({ parameterId: itemId }) => itemId !== parameterId),
    });
    this.setState({
      selectedParameters: selectedParameters.filter(({ parameterId: itemId }) => itemId !== parameterId),
    });
  }

  handleRenderAddedParameter = ({ parameters: choosedParams }) => {
    const { currentIntent } = this.props;
    const { parameters = [] } = currentIntent || {};
    return choosedParams.map(
      ({ parameterId, value }) => {
        const { displayName } = parameters.find(({ parameterId: itemId }) => parameterId === itemId);
        return (
          <h2>
            {`[${displayName}]: ${value}`}
            <Button onClick={() => this.removeParameter(parameterId)}>
              <Icon type="close" />
            </Button>
          </h2>
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

  handleOnSubmit = (values) => {
    const { submitAction, currentIntent } = this.props;
    const { _id: intentId } = currentIntent;
    submitAction({
      ...values,
      intentId,
    });
  }

  render() {
    const { isAdding } = this.state;
    const {
      isOpen, currentIntent, isCreating, title,
      initialValues: reponse,
    } = this.props;
    const { displayName } = currentIntent || {};
    return (
      <Formik
        ref={(formik) => { this.responseFormik = formik; }}
        initialValues={reponse || initialValues}
        validationSchema={responseSchema}
        onSubmit={this.handleOnSubmit}
        confirmLoading={isCreating}
      >
        {({ handleSubmit, values, errors: { parameters: paramError } }) => (
          <ModalStyled
            title={(
              <div>
                {title}
                {' '}
                {displayName}
              </div>
            )}
            visible={isOpen}
            onOk={handleSubmit}
            onCancel={this.handleCancel}
            okText={toI18n('FORM_SUBMIT')}
          >
            {isAdding ? this.renderAddParameters() : (
              <Button onClick={() => this.toggleAddParameter(true)}>
                + Add Parameter
              </Button>
            )}
            <ErrorMessage>{paramError}</ErrorMessage>
            <Form>
              <Row gutter={32}>
                <Col sm={24} xs={24}>
                  {this.handleRenderAddedParameter(values)}
                </Col>
              </Row>
              <Row gutter={32}>
                <Col sm={24} xs={24}>
                  <FormInput
                    name="response.en"
                    type="text"
                    label={toI18n('ADMIN_INTENT_ADD_RESPONSE_EN')}
                    login={1}
                  />
                </Col>
              </Row>
              <Row gutter={32}>
                <Col sm={24} xs={24}>
                  <FormInput
                    name="response.vn"
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
