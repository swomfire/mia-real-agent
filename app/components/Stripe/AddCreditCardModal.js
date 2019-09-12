import React, { Component } from 'react';
import {
  StripeProvider, Elements,
} from 'react-stripe-elements';
import { Modal } from 'antd';
import { func, bool } from 'prop-types';
import AddCreditForm from './AddCreditForm';
import LoadingSpin from '../Loading';

// eslint-disable-next-line react/prefer-stateless-function
class AddCreditCardModal extends Component {
  static propTypes = {
    isOpen: bool.isRequired,
    isLoading: bool.isRequired,
    onCancel: func.isRequired,
    onSubmit: func.isRequired,
  }

  render() {
    const {
      isOpen = false, isLoading, onCancel, onSubmit,
    } = this.props;
    return (
      <Modal
        title="Add Credit Card"
        visible={isOpen}
        onCancel={onCancel}
        footer={null}
      >
        <LoadingSpin loading={isLoading}>
          <StripeProvider apiKey={process.env.REACT_APP_STRIPE_KEY}>
            <Elements>
              <AddCreditForm onSubmit={onSubmit} />
            </Elements>
          </StripeProvider>
        </LoadingSpin>
      </Modal>
    );
  }
}

export default AddCreditCardModal;
