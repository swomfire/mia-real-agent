import React, { Component } from 'react';
import { shape } from 'prop-types';
import _isEmpty from 'lodash/isEmpty';
import numeral from 'numeral';
import { ButtonPrimary } from '../../../stylesheets/Button.style';
import TopUp from '../../TopUp/TopUp';
import {
  PaidMethodWrapper, CreditTimeWrapper, BillingHistoryWrapper, BillingHistory, NoHistoryWrapper,
} from './styles';
import { toI18n } from '../../../utils/func-utils';

class PaidMethods extends Component {
  state = {
    topUpModalIsOpen: false,
  }

  static propTypes = {
    user: shape().isRequired,
  }

  toggleTopUpModal = (toggle) => {
    this.setState({
      topUpModalIsOpen: toggle,
    });
  }

  renderBillingHistory = () => {
    const { user } = this.props;
    const { billingHistory = [] } = user;
    if (_isEmpty(billingHistory)) {
      return (
        <BillingHistoryWrapper>
          <NoHistoryWrapper>
            {toI18n('PROFILE_PAYMENT_INFO_NO_BILLING_HISTORY')}
          </NoHistoryWrapper>
        </BillingHistoryWrapper>
      );
    }
    return (
      <BillingHistoryWrapper>
        {billingHistory.map(history => (
          <BillingHistory>
            {history.date}
          </BillingHistory>
        ))}
      </BillingHistoryWrapper>
    );
  }

  render() {
    const { user } = this.props;
    const { topUpModalIsOpen } = this.state;
    const { creditTime, creditCard } = user;
    return (
      <PaidMethodWrapper>
        <CreditTimeWrapper>
          <span>
            {toI18n('PROFILE_PAYMENT_INFO_TOTAL_CREDIT_TIME')}
            {numeral(creditTime).format('00:00:00')}
          </span>
          <ButtonPrimary
            onClick={() => this.toggleTopUpModal(true)}
          >
            {toI18n('PROFILE_PAYMENT_INFO_TOP_UP')}
          </ButtonPrimary>
        </CreditTimeWrapper>
        {this.renderBillingHistory()}
        <TopUp
          isOpen={topUpModalIsOpen}
          onCancel={() => this.toggleTopUpModal(false)}
          creditCard={creditCard}
        />
      </PaidMethodWrapper>
    );
  }
}

export default PaidMethods;
