import React, { Component } from 'react';
import { shape } from 'prop-types';
import CreditCard from '../../CreditCard/CreditCard';

// eslint-disable-next-line react/prefer-stateless-function
class AddCreditCard extends Component {
  static propTypes = {
    user: shape().isRequired,
  }

  render() {
    const { user } = this.props;
    const { creditCard } = user;
    return (
      <CreditCard card={creditCard} />
    );
  }
}

export default AddCreditCard;
