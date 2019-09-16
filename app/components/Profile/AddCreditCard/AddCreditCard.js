import React, { Component } from 'react';
import {
  shape, func, bool, string,
} from 'prop-types';
import { Icon } from 'antd';
import Numeral from 'numeral';
import CreditCard from '../../CreditCard/CreditCard';
import AddCreditCardModal from '../../Stripe/AddCreditCardModal';
import LoadingSpin from '../../Loading';
import { ButtonDefault } from '../../../stylesheets/Button.style';
import { toI18n } from '../../../utils/func-utils';
import TopUp from '../../../containers/TopUp/TopUp';
import { CreditTimeWrapper } from './styles';

// eslint-disable-next-line react/prefer-stateless-function
class AddCreditCard extends Component {
  static propTypes = {
    user: shape().isRequired,
    addCreditCard: func.isRequired,
    removeCreditCard: func.isRequired,
    isUpdating: bool.isRequired,
    updateError: string,
  }

  componentDidUpdate = (prevProps) => {
    const { updateError, isUpdating } = this.props;
    if (prevProps.isUpdating && !isUpdating && !updateError) {
      this.toggleAddCreditCard(false);
    }
  }

  state = {
    isAddCreditCardModalVisiable: false,
    topUpModalIsOpen: false,

  }

  toggleTopUpModal = (toggle) => {
    this.setState({
      topUpModalIsOpen: toggle,
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
    const { removeCreditCard } = this.props;
    removeCreditCard(cardId);
  }

  render() {
    const { user, isUpdating } = this.props;
    const { creditCard, creditTime } = user;
    const { isAddCreditCardModalVisiable, topUpModalIsOpen } = this.state;
    return (
      <div>
        <LoadingSpin loading={isUpdating}>
          <CreditTimeWrapper>
            <span>
              {toI18n('PROFILE_PAYMENT_INFO_TOTAL_CREDIT_TIME')}
              {Numeral(creditTime * 60).format('00:00:00')}
            </span>
            <ButtonDefault
              onClick={() => this.toggleTopUpModal(true)}
            >
              <Icon type="arrow-up" />
              {toI18n('PROFILE_PAYMENT_INFO_TOP_UP')}
            </ButtonDefault>
          </CreditTimeWrapper>
          <CreditCard
            card={creditCard}
            onAdd={() => this.toggleAddCreditCard(true)}
            onRemove={this.handleRemoveCreditCard}
          />
          <AddCreditCardModal
            isLoading={isUpdating}
            isOpen={isAddCreditCardModalVisiable}
            onCancel={() => this.toggleAddCreditCard(false)}
            onSubmit={this.handleAddCreditCard}
          />
          <TopUp
            isOpen={topUpModalIsOpen}
            onCancel={() => this.toggleTopUpModal(false)}
            creditCard={creditCard}
          />
        </LoadingSpin>
      </div>
    );
  }
}

export default AddCreditCard;
