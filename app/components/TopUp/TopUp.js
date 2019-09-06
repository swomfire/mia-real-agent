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

const { TabPane } = Tabs;
const { Step } = Steps;

const initialValues = {
  amount: 0,
};

const validationSchema = Yup.object().shape({
  amount: Yup.number().min(1).required('Required'),
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
          Add Credit Card
        </AddCreditCard>
        <ActionGroup>
          <ButtonCancel onClick={this.handleClose}>
            Cancel
          </ButtonCancel>
          <ButtonPrimary
            disabled={_isEmpty(selectedCard)}
            onClick={() => this.handleStep(1)}
          >
            Next
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
                Back
              </ButtonCancel>
              <ButtonPrimary type="submit">
                Submit
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
          <TopUpTitle>Top-up your credit time</TopUpTitle>
          <Steps current={step}>
            <Step title="Select Credit Card" />
            <Step title="Input Amount" />
            <Step title="Finish" />
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
                  Top up success
                </h2>
                <ButtonPrimary type="button" onClick={this.handleClose}>
                  Return
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
