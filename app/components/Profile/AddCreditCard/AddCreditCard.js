import React, { Component } from 'react';
import { shape, func, bool, string } from 'prop-types';
import CreditCard from '../../CreditCard/CreditCard';
import AddCreditCardModal from '../../Stripe/AddCreditCardModal';
import LoadingSpin from '../../Loading';

// eslint-disable-next-line react/prefer-stateless-function
class AddCreditCard extends Component {
  static propTypes = {
    user: shape().isRequired,
    addCreditCard: func.isRequired,
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

  render() {
    const { user, isUpdating } = this.props;
    const { creditCard } = user;
    const { isAddCreditCardModalVisiable } = this.state;
    return (
      <div>
        <LoadingSpin loading={isUpdating}>
          <CreditCard card={creditCard} onAdd={() => this.toggleAddCreditCard(true)} />
          <AddCreditCardModal
            isLoading={isUpdating}
            isOpen={isAddCreditCardModalVisiable}
            onCancel={() => this.toggleAddCreditCard(false)}
            onSubmit={this.handleAddCreditCard}
          />
        </LoadingSpin>
      </div>
    );
  }
}

export default AddCreditCard;
