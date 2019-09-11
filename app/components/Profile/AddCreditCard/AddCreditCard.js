import React, { Component } from 'react';
import { shape, func } from 'prop-types';
import CreditCard from '../../CreditCard/CreditCard';
import AddCreditCardModal from '../../Stripe/AddCreditCardModal';

// eslint-disable-next-line react/prefer-stateless-function
class AddCreditCard extends Component {
  static propTypes = {
    user: shape().isRequired,
    addCreditCard: func.isRequired,
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
    const { user } = this.props;
    const { creditCard } = user;
    const { isAddCreditCardModalVisiable } = this.state;
    return (
      <div>
        <CreditCard card={creditCard} onAdd={() => this.toggleAddCreditCard(true)} />
        <AddCreditCardModal
          isOpen={isAddCreditCardModalVisiable}
          onCancel={() => this.toggleAddCreditCard(false)}
          onSubmit={this.handleAddCreditCard}
        />
      </div>
    );
  }
}

export default AddCreditCard;
