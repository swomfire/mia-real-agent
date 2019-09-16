import React, { PureComponent } from 'react';
import {
  Modal, Form, Row,
  Col,
  Popconfirm,
  notification,
} from 'antd';
import { bool, func, string } from 'prop-types';
import * as Yup from 'yup';
import { Formik } from 'formik';
import FormInput from '../FormInput/FormInput';
import { ActionBar, DescriptionTextAreaStyled, ModalCustomize } from './styles';
import { CATEGORY_OPTIONS } from '../../../common/enums';
import LoadingSpin from '../Loading';
import { toI18n } from '../../utils/func-utils';
import { ButtonCancel, ButtonSubmit } from '../../stylesheets/Button.style';

const initialValues = {
  title: '',
  description: '',
  category: [],
};

const validationSchema = Yup.object().shape({
  title: Yup.string().trim().required(toI18n('FORM_REQUIRED')),
  description: Yup.string().trim().required(toI18n('FORM_REQUIRED')),
  category: Yup.array().of(Yup.string()).required(toI18n('FORM_REQUIRED')),
});

export default class CreateTicketForm extends PureComponent {
  state = {
    formHasValue: false,
    popconfirmVisible: false,
  }

  static propTypes = {
    isOpen: bool.isRequired,
    isCreating: bool.isRequired,
    createError: string.isRequired,
    handleCancel: func.isRequired,
    createTicket: func.isRequired,
  }

  componentDidUpdate = (prevProps) => {
    const { isCreating, createError } = this.props;
    if (prevProps.isCreating && !isCreating) {
      if (!createError) {
        notification.success({ message: toI18n('TICKET_CREATE_FORM_CREATE_SUCCESS') });
        this.handleCancelConfirm();
      } else {
        notification.error({ message: createError });
      }
    }
  }

  handleCancelConfirm = () => {
    const { handleCancel } = this.props;
    handleCancel();
    this.setState({
      popconfirmVisible: false,
      formHasValue: false,
    });
    this.formik.getFormikContext().resetForm();
  }

  handleCancel = () => {
    const { formHasValue } = this.state;
    if (formHasValue) {
      this.setState({
        popconfirmVisible: true,
      });
    } else {
      this.handleCancelConfirm();
    }
  }

  handlePopconfirmCancel = () => {
    this.setState({
      popconfirmVisible: false,
    });
  }

  handleSubmit = (values) => {
    const { createTicket } = this.props;
    createTicket(values);
  }

  handleChangeValues = () => {
    const { formHasValue } = this.state;
    if (!formHasValue) {
      this.setState({
        formHasValue: true,
      });
    }
  }

  render() {
    const { isOpen, isCreating } = this.props;
    return (
      <ModalCustomize>
        <Modal
          centered
          visible={isOpen}
          onCancel={this.handleCancel}
          footer={[]}
          title="Create Ticket"
          transitionName="zoom"
          wrapClassName="modal-customize"
          width="720px"
          forceRender
        >
          <LoadingSpin loading={isCreating}>
            <Formik
              ref={(formik) => { this.formik = formik; }}
              validationSchema={validationSchema}
              initialValues={initialValues}
              onSubmit={this.handleSubmit}
            >
              {({ handleSubmit }) => (
                <Form
                  onSubmit={handleSubmit}
                  onChange={this.handleChangeValues}
                >
                  <Row gutter={32}>
                    <Col sm={24} xs={24}>
                      <FormInput
                        name="title"
                        type="text"
                        className="vienpn-input"
                        label={toI18n('TICKET_CREATE_FORM_TITLE')}
                      />
                    </Col>
                    <Col sm={24} xs={24}>
                      <FormInput
                        name="category"
                        type="select"
                        mode="multiple"
                        options={CATEGORY_OPTIONS}
                        label={toI18n('TICKET_CREATE_FORM_CATEGORY')}
                      />
                    </Col>
                    <Col sm={24} xs={24}>
                      <FormInput
                        name="description"
                        type="textarea"
                        className="vienpn-input"
                        label={toI18n('TICKET_CREATE_FORM_DESCRIPTION')}
                        style={DescriptionTextAreaStyled}
                      />
                    </Col>
                  </Row>
                  <Row gutter={32}>
                    <ActionBar>
                      <ButtonSubmit onClick={handleSubmit}>
                        {toI18n('TICKET_CREATE_FORM_SUBMIT')}
                      </ButtonSubmit>
                      <ButtonCancel type="button" cancel onClick={this.handleCancel}>
                        {toI18n('TICKET_CREATE_FORM_CANCEL')}
                      </ButtonCancel>
                    </ActionBar>
                  </Row>
                </Form>
              )}
            </Formik>
            <Popconfirm
              title={toI18n('TICKET_CREATE_FORM_WARNING')}
              visible={this.state.popconfirmVisible}
              onConfirm={this.handleCancelConfirm}
              onCancel={this.handlePopconfirmCancel}
              okText={toI18n('TICKET_CREATE_FORM_WARNING_YES')}
              cancelText={toI18n('TICKET_CREATE_FORM_WARNING_NO')}
            />
          </LoadingSpin>
        </Modal>
      </ModalCustomize>
    );
  }
}
