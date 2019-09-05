import React, { Component } from 'react';
import { shape } from 'prop-types';
import _isEmpty from 'lodash/isEmpty';
import { ButtonPrimary } from '../../../stylesheets/Button.style';
import TopUp from '../../TopUp/TopUp';
import {
  PaidMethodWrapper, CreditTimeWrapper, BillingHistoryWrapper, BillingHistory, NoHistoryWrapper,
} from './styles';

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
            No Billing History
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
            {`Total credit time: ${creditTime}`}
          </span>
          <ButtonPrimary
            onClick={() => this.toggleTopUpModal(true)}
          >
            Top up
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
