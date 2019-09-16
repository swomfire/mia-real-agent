import React, { Component } from 'react';
import _isEmpty from 'lodash/isEmpty';
import {
  Modal, Steps, Tabs, Form, Icon, Row, Col,
} from 'antd';
import Numeral from 'numeral';
import {
  bool, func, arrayOf, shape, string,
} from 'prop-types';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {
  TopUpBlock, ActionGroup,
  ExchangeRateWrapper, TopUpTitle, TopUpSuccess, AddCreditCard, ExchangeValue,
} from './styles';
import { ButtonCancel, ButtonPrimary } from '../../stylesheets/Button.style';
import CreditCard from '../CreditCard/CreditCard';

import FormInput from '../FormInput/FormInput';
import { toI18n } from '../../utils/func-utils';
import AddCreditCardModal from '../Stripe/AddCreditCardModal';
import LoadingSpin from '../Loading';

const { TabPane } = Tabs;
const { Step } = Steps;

const initialValues = {
  amount: 5,
};

const validationSchema = Yup.object().shape({
  amount: Yup.number().min(1).required(toI18n('FORM_REQUIRED')),
});

const initialState = {
  step: 0,
};

class TopUp extends Component {
  state = {
    ...initialState,
    selectedCard: '',
    isAddCreditCardModalVisiable: false,
    submitted: false,
  }

  static propTypes = {
    isOpen: bool.isRequired,
    isUpdating: bool.isRequired,
    creditCard: arrayOf(shape()).isRequired,
    updateError: string,
    onCancel: func.isRequired,
    topUp: func.isRequired,
    addCreditCard: func.isRequired,
    removeCreditCard: func.isRequired,
    system: shape().isRequired,
  }


  componentDidUpdate = (prevProps) => {
    const { updateError, isUpdating } = this.props;
    const { submitted } = this.state;
    if (submitted && prevProps.isUpdating && !isUpdating) {
      this.setState({ submitted: false });
      if (!updateError) {
        this.handleStep(1);
      }
      return;
    }
    if (prevProps.isUpdating && !isUpdating && !updateError) {
      this.toggleAddCreditCard(false);
    }
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

  toggleAddCreditCard = (isOpen) => {
    this.setState({
      isAddCreditCardModalVisiable: isOpen,
    });
  }

  handleAddCreditCard = ({ token }) => {
    const { addCreditCard } = this.props;
    addCreditCard(token);
  }

  handleRemoveCreditCard = (cardId) => {
    const { selectedCard } = this.state;
    const { removeCreditCard } = this.props;
    removeCreditCard(cardId);
    if (selectedCard === cardId) {
      this.setState({
        selectedCard: null,
      });
    }
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
            onAdd={() => this.toggleAddCreditCard(true)}
            onRemove={this.handleRemoveCreditCard}
          />
        </div>
        <AddCreditCard onClick={() => this.toggleAddCreditCard(true)}>
          {toI18n('TOP_UP_SUCCESS_ADD_CREDIT_CARD')}
        </AddCreditCard>
        <ActionGroup>
          <ButtonCancel type="button" onClick={this.handleClose}>
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

  handleSubmit = (values) => {
    const { amount } = values;
    const { selectedCard } = this.state;
    const { topUp } = this.props;
    topUp(selectedCard, amount);
    this.setState({
      submitted: true,
    });
  }

  renderInputAmount = () => {
    const { system } = this.props;
    const { exchangeRate } = system || {};
    return (
      <Formik
        ref={(formik) => { this.formik = formik; }}
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={this.handleSubmit}
      >
        {({ handleSubmit, values }) => (
          <Form onSubmit={handleSubmit}>
            <Row gutter={32}>
              <Col span={18}>
                <FormInput
                  type="number"
                  formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={value => value.replace(/\$\s?|(,*)/g, '')}
                  name="amount"
                  login={1}
                />
              </Col>
              <Col span={6}>
                <ExchangeValue>
                  <Icon type="arrow-right" />
                  {Numeral(values.amount * exchangeRate * 60).format('00:00:00')}
                </ExchangeValue>
              </Col>
            </Row>
            <ExchangeRateWrapper>
              {`1$ = ${exchangeRate} minutes`}
            </ExchangeRateWrapper>
            <ActionGroup>
              <ButtonCancel type="button" onClick={() => this.handleStep(-1)}>
                {toI18n('FORM_BACK')}
              </ButtonCancel>
              <ButtonPrimary type="submit" disabled={!system}>
                {toI18n('FORM_SUBMIT')}
              </ButtonPrimary>
            </ActionGroup>
          </Form>
        )}
      </Formik>
    );
  }

  render() {
    const { step, isAddCreditCardModalVisiable } = this.state;
    const { isOpen, isUpdating } = this.props;
    return (
      <Modal
        width="800px"
        visible={isOpen}
        onCancel={this.handleClose}
        footer={null}
      >
        <LoadingSpin loading={isUpdating}>
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
              <TabPane tab={null} key="0">
                {this.renderSelectCreditCard()}
              </TabPane>
              <TabPane tab={null} key="1">
                {this.renderInputAmount()}
              </TabPane>
              <TabPane tab={null} key="2">
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
        </LoadingSpin>
        <AddCreditCardModal
          isLoading={isUpdating}
          isOpen={isAddCreditCardModalVisiable}
          onCancel={() => this.toggleAddCreditCard(false)}
          onSubmit={this.handleAddCreditCard}
        />
      </Modal>
    );
  }
}

export default TopUp;
