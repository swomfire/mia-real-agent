import React, { Component } from 'react';
import _isEmpty from 'lodash/isEmpty';
import {
  Modal, Steps, Tabs, Form, Icon,
} from 'antd';
import {
  bool, func, arrayOf, shape,
} from 'prop-types';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { TopUpBlock, ActionGroup, ExchangeRateWrapper, TopUpTitle, TopUpSuccess, AddCreditCard } from './styles';
import { ButtonCancel, ButtonPrimary } from '../../stylesheets/Button.style';
import CreditCard from '../CreditCard/CreditCard';

import FormInput from '../FormInput/FormInput';
import { toI18n } from '../../utils/func-utils';

const { TabPane } = Tabs;
const { Step } = Steps;

const initialValues = {
  amount: 0,
};

const validationSchema = Yup.object().shape({
  amount: Yup.number().min(1).required(toI18n('FORM_REQUIRED')),
});

const initialState = {
  step: 0,
  exchangeRate: 20,
};

class TopUp extends Component {
  state = {
    ...initialState,
    selectedCard: '',
  }

  static propTypes = {
    isOpen: bool.isRequired,
    creditCard: arrayOf(shape()).isRequired,
    onCancel: func.isRequired,
  }

  handleClose = () => {
    const { onCancel } = this.props;
    this.setState(initialState);
    onCancel();
  }

  handleStep = (step) => {
    const { step: curStep } = this.state;
    if (curStep + step < 0) {
      return;
    }
    this.setState({
      step: curStep + step,
    });
  }

  handleSelectCard = (card) => {
    this.setState({
      selectedCard: card,
    });
  }

  renderSelectCreditCard = () => {
    const { selectedCard } = this.state;
    const { creditCard } = this.props;
    return (
      <div>
        <div>
          <CreditCard
            card={creditCard}
            type="select-list"
            onClick={this.handleSelectCard}
          />
        </div>
        <AddCreditCard>
          {toI18n('TOP_UP_SUCCESS_ADD_CREDIT_CARD')}
        </AddCreditCard>
        <ActionGroup>
          <ButtonCancel onClick={this.handleClose}>
            {toI18n('FORM_CANCEL')}
          </ButtonCancel>
          <ButtonPrimary
            disabled={_isEmpty(selectedCard)}
            onClick={() => this.handleStep(1)}
          >
            {toI18n('FORM_NEXT')}
          </ButtonPrimary>
        </ActionGroup>
      </div>
    );
  }

  handleSubmit = () => {
    this.handleStep(1);
  }

  renderInputAmount = () => {
    const { exchangeRate } = this.state;
    return (
      <Formik
        ref={(formik) => { this.formik = formik; }}
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={this.handleSubmit}
      >
        {({ handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <FormInput
              name="amount"
              type="number"
              login={1}
            />
            <ExchangeRateWrapper>
              {`1$ = ${exchangeRate} minutes`}
            </ExchangeRateWrapper>
            <ActionGroup>
              <ButtonCancel onClick={() => this.handleStep(-1)}>
                {toI18n('FORM_BACK')}
              </ButtonCancel>
              <ButtonPrimary type="submit">
                {toI18n('FORM_SUBMIT')}
              </ButtonPrimary>
            </ActionGroup>
          </Form>
        )}
      </Formik>
    );
  }

  render() {
    const { step } = this.state;
    const { isOpen } = this.props;
    return (
      <Modal
        width="800px"
        visible={isOpen}
        onCancel={this.handleClose}
        footer={null}
      >
        <TopUpBlock>
          <TopUpTitle>
            {toI18n('TOP_UP_YOUR_CREDIT_TIME')}
          </TopUpTitle>
          <Steps current={step}>
            <Step title={toI18n('TOP_UP_SELECT_CREDIT_CARD')} />
            <Step title={toI18n('TOP_UP_INPUT_AMOUNT')} />
            <Step title={toI18n('TOP_UP_FINISH')} />
          </Steps>
          <Tabs activeKey={`${step}`}>
            <TabPane key="0">
              {this.renderSelectCreditCard()}
            </TabPane>
            <TabPane key="1">
              {this.renderInputAmount()}
            </TabPane>
            <TabPane key="2">
              <TopUpSuccess>
                <h2>
                  <Icon type="check" />
                  {toI18n('TOP_UP_SUCCESS')}
                </h2>
                <ButtonPrimary type="button" onClick={this.handleClose}>
                  {toI18n('FORM_RETURN')}
                </ButtonPrimary>
              </TopUpSuccess>
            </TabPane>
          </Tabs>
        </TopUpBlock>
      </Modal>
    );
  }
}

export default TopUp;
