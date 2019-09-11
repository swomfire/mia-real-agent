import React, { Component } from 'react';
import {
  StripeProvider, Elements,
} from 'react-stripe-elements';
import { Modal } from 'antd';
import { func, bool } from 'prop-types';
import AddCreditForm from './AddCreditForm';

// eslint-disable-next-line react/prefer-stateless-function
class AddCreditCardModal extends Component {
  static propTypes = {
    isOpen: bool.isRequired,
    onCancel: func.isRequired,
    onSubmit: func.isRequired,
  }

  render() {
    const { isOpen = false, onCancel, onSubmit } = this.props;
    return (
      <Modal
        title="Add Credit Card"
        visible={isOpen}
        onCancel={onCancel}
        footer={null}
      >
        <StripeProvider apiKey={process.env.REACT_APP_STRIPE_KEY}>
          <Elements>
            <AddCreditForm onSubmit={onSubmit} />
          </Elements>
        </StripeProvider>
      </Modal>
    );
  }
}

export default AddCreditCardModal;
