import React, { Component } from 'react';
import {
  CardElement, injectStripe,
} from 'react-stripe-elements';
import { shape, func } from 'prop-types';
import { ButtonSubmit } from '../../stylesheets/Button.style';
import { AddCreditCardWrapper, ErrorWrapper } from './styles';

class AddCreditForm extends Component {
  static propTypes = {
    stripe: shape(),
    onSubmit: func.isRequired,
  }

  state = {
    card: null,
  }

  handleChange = (card) => {
    this.setState({ card });
  }

  handleSubmit = () => {
    const { card } = this.state;
    const { stripe, onSubmit } = this.props;
    stripe.createToken(card).then((token) => {
      onSubmit(token);
    });
  }

  render() {
    const { card } = this.state;
    const { complete, error } = card || {};
    const { message } = error || {};
    return (
      <div>
        <AddCreditCardWrapper gutter={32}>
          <CardElement onReady={el => el.focus()} onChange={this.handleChange} />
          <ButtonSubmit disabled={!complete} type="button" onClick={this.handleSubmit}>
            Submit
          </ButtonSubmit>
        </AddCreditCardWrapper>
        <ErrorWrapper>{message}</ErrorWrapper>
      </div>
    );
  }
}

export default injectStripe(AddCreditForm);
