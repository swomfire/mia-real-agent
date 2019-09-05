import React, { PureComponent } from 'react';
import {
  Modal, Form, Row,
  Col,
  notification,
} from 'antd';
import { bool, func, string } from 'prop-types';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { DefaultButton } from 'components/Generals/General.styled';
import FormInput from '../FormInput/FormInput';
import { ActionBar, DescriptionTextAreaStyled, ModalCustomize } from './styles';
import LoadingSpin from '../Loading';
import { toI18n } from '../../utils/func-utils';

const initialValues = {
  title: '',
  feedbacks: '',
};

const validationSchema = Yup.object().shape({
  title: Yup.string().trim().required(toI18n('FORM_REQUIRED')),
  feedbacks: Yup.string().trim().required(toI18n('FORM_REQUIRED')),
});

export default class CreateFeedbackForm extends PureComponent {
  static propTypes = {
    isOpen: bool.isRequired,
    isCreating: bool.isRequired,
    createError: string.isRequired,
    ticketId: string,
    submitFeedback: func.isRequired,
    handleCancel: func.isRequired,
  }

  componentDidUpdate = (prevProps) => {
    const { isCreating, createError } = this.props;
    if (prevProps.isCreating && !isCreating) {
      if (!createError) {
        notification.success({ message: toI18n('CREATE_FEEDBACK_SUCCESS') });
        this.handleCancelConfirm();
      } else {
        notification.error({ message: createError });
      }
    }
  }

  handleCancelConfirm = () => {
    const { handleCancel } = this.props;
    handleCancel();
    this.formik.getFormikContext().resetForm();
  }

  handleSubmit = (values) => {
    const { submitFeedback, ticketId } = this.props;
    const { title, feedbacks } = values;
    submitFeedback(ticketId, title, feedbacks);
  }

  render() {
    const { isOpen, isCreating } = this.props;
    return (
      <ModalCustomize>
        <Modal
          centered
          visible={isOpen}
          onCancel={this.handleCancelConfirm}
          footer={[]}
          title={toI18n('CREATE_FEEDBACK_MODAL_TITLE')}
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
                >
                  <Row gutter={32}>
                    <Col sm={24} xs={24}>
                      <FormInput
                        name="title"
                        type="text"
                        className="vienpn-input"
                        label={toI18n('CREATE_FEEDBACK_TITLE')}
                        style={DescriptionTextAreaStyled}
                      />
                    </Col>
                  </Row>
                  <Row gutter={32}>
                    <Col sm={24} xs={24}>
                      <FormInput
                        name="feedbacks"
                        type="textarea"
                        className="vienpn-input"
                        label={toI18n('CREATE_FEEDBACK_FEEDBACKS')}
                        style={DescriptionTextAreaStyled}
                      />
                    </Col>
                  </Row>
                  <Row gutter={32}>
                    <ActionBar>
                      <DefaultButton type="button" cancel onClick={this.handleCancelConfirm}>
                        {toI18n('FORM_CANCEL')}
                      </DefaultButton>
                      <DefaultButton onClick={handleSubmit}>
                        {toI18n('FORM_SUBMIT')}
                      </DefaultButton>
                    </ActionBar>
                  </Row>
                </Form>
              )}
            </Formik>
          </LoadingSpin>
        </Modal>
      </ModalCustomize>
    );
  }
}
