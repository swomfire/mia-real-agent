/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import {
  Modal, Col, Row, Steps, Tabs, Icon,
} from 'antd';
import Numeral from 'numeral';
import { func, shape, bool } from 'prop-types';
import {
  PaymentWrapper, OptionWrapper, PaymentBlock, AddCreditCard,
  ActionGroup, TicketPaymentSuccess, CreditTimeWrapper,
  TicketTimeWrapper, RemainingCreditTimeWrapper, CreditTimeLabelWrapper, EquivalentToWrapper,
} from './styles';
import LoadingSpin from '../Loading';
import { toI18n } from '../../utils/func-utils';
import CreditCard from '../CreditCard/CreditCard';
import {
  ButtonSubmit, ButtonCancel, ButtonPrimary, ButtonDefault,
} from '../../stylesheets/Button.style';
import TopUp from '../TopUp';

const { Step } = Steps;
const { TabPane } = Tabs;

class TicketPayment extends Component {
  static propTypes = {
    fetchUser: func.isRequired,
    user: shape().isRequired,
    isFetching: bool.isRequired,
    isOpen: bool.isRequired,
  }

  state = {
    step: 0,
    option: '',
    topUpModalIsOpen: false,
  }

  toggleTopUpModal = (toggle) => {
    this.setState({
      topUpModalIsOpen: toggle,
    });
  }

  componentDidMount = () => {
    const { fetchUser } = this.props;
    fetchUser();
  }

  renderCreditTime = () => {
    return (
      <div>
        <CreditTimeWrapper>
          <CreditTimeLabelWrapper>
            {toI18n('TICKET_PAYMENT_CURRENT_CREDIT_TIME')}
            <span>{Numeral(3214).format('00:00:00')}</span>
          </CreditTimeLabelWrapper>
          <ButtonDefault
            onClick={() => this.toggleTopUpModal(true)}
          >
            <Icon type="arrow-up" />
            {toI18n('PROFILE_PAYMENT_INFO_TOP_UP')}
          </ButtonDefault>
        </CreditTimeWrapper>
        <TicketTimeWrapper>
          {toI18n('TICKET_PAYMENT_TICKET_TIME')}
          <span>{Numeral(3214).format('00:00:00')}</span>
        </TicketTimeWrapper>
        <RemainingCreditTimeWrapper>
          {toI18n('TICKET_PAYMENT_REMAINING_CREDIT_TIME')}
          <span>{Numeral(3214).format('00:00:00')}</span>
        </RemainingCreditTimeWrapper>
        <ActionGroup>
          <ButtonCancel onClick={this.handlePrevStep}>
            {toI18n('FORM_BACK')}
          </ButtonCancel>
          <ButtonSubmit onClick={this.handleNextStep}>
            {toI18n('FORM_PAYOUT')}
          </ButtonSubmit>
        </ActionGroup>
      </div>
    );
  }

  renderDirectCharge = () => {
    const { user } = this.props;
    const { creditCard } = user || {};
    return (
      <div>
        <TicketTimeWrapper>
          {toI18n('TICKET_PAYMENT_TICKET_TIME')}
          <span>{Numeral(3214).format('00:00:00')}</span>
        </TicketTimeWrapper>
        <EquivalentToWrapper>
          {toI18n('TICKET_PAYMENT_REMAINING_EQUIVALENT_TO')}
          <span>{Numeral(3214).format('$0,0.00')}</span>
        </EquivalentToWrapper>
        <CreditCard
          card={creditCard}
          type="select-list"
        />
        <AddCreditCard>
          {toI18n('TOP_UP_SUCCESS_ADD_CREDIT_CARD')}
        </AddCreditCard>
        <ActionGroup>
          <ButtonCancel onClick={this.handlePrevStep}>
            {toI18n('FORM_BACK')}
          </ButtonCancel>
          <ButtonSubmit onClick={this.handleNextStep}>
            {toI18n('FORM_PAYOUT')}
          </ButtonSubmit>
        </ActionGroup>
      </div>
    );
  }

  renderSelectMethod = () => (
    <Row gutter={32}>
      <Col span={12}>
        <OptionWrapper onClick={() => this.handleChoosePayment('Credit')}>
          <Icon type="wallet" />
          {toI18n('TICKET_PAYMENT_CREDIT_TIME')}
        </OptionWrapper>
      </Col>
      <Col span={12}>
        <OptionWrapper onClick={() => this.handleChoosePayment('Direct')}>
          <Icon type="money-collect" />
          {toI18n('TICKET_PAYMENT_DIRECT_CHARGE')}
        </OptionWrapper>
      </Col>
    </Row>
  );

  handleChoosePayment = (method) => {
    this.setState({
      step: 1,
      option: method,
    });
  }

  handleNextStep = () => {
    const { step } = this.state;
    this.setState({
      step: step + 1,
    });
  }

  handlePrevStep = () => {
    const { step } = this.state;
    this.setState({
      step: step - 1,
    });
  }

  render() {
    const { step, option, topUpModalIsOpen } = this.state;
    const { user, isFetching, isOpen = false } = this.props;
    const { creditCard } = user || {};
    return (
      <Modal
        closable={false}
        title={toI18n('TICKET_PAYMENT_TITLE')}
        footer={null}
        visible={isOpen}
        width="700px"
      >
        <LoadingSpin loading={isFetching}>
          <PaymentWrapper>
            <PaymentBlock>
              <Steps current={step}>
                <Step title={toI18n('TICKET_PAYMENT_CHOOSE_PAYMENT_METHOD')} />
                <Step title={toI18n('TICKET_PAYMENT_VERIFY_INFORMATION')} />
                <Step title={toI18n('TICKET_PAYMENT_FINISH')} />
              </Steps>
              <Tabs activeKey={`${step}`}>
                <TabPane tab={null} key="0">
                  {this.renderSelectMethod()}
                </TabPane>
                <TabPane tab={null} key="1">
                  {option === 'Credit'
                    ? this.renderCreditTime()
                    : this.renderDirectCharge()}
                </TabPane>
                <TabPane tab={null} key="2">
                  <TicketPaymentSuccess>
                    <h2>
                      <Icon type="check" />
                      {toI18n('TICKET_PAYMENT_SUCCESS')}
                    </h2>
                    <ButtonPrimary type="button" onClick={this.handleClose}>
                      {toI18n('FORM_RETURN')}
                    </ButtonPrimary>
                  </TicketPaymentSuccess>
                </TabPane>
              </Tabs>
            </PaymentBlock>
          </PaymentWrapper>
        </LoadingSpin>
        <TopUp
          isOpen={topUpModalIsOpen}
          onCancel={() => this.toggleTopUpModal(false)}
          creditCard={creditCard}
        />
      </Modal>
    );
  }
}

export default TicketPayment;
