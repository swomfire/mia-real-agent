import React, { Component } from 'react';
import { StripeProvider, Elements, CardElement } from 'react-stripe-elements';
import { Col } from 'antd';
import { func } from 'prop-types';
import { ButtonSubmit } from '../../stylesheets/Button.style';
import { AddCreditCardWrapper, ErrorWrapper } from './styles';

// eslint-disable-next-line react/prefer-stateless-function
class AddCreditCard extends Component {
  static propTypes = {
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
    const { onSubmit } = this.props;
    onSubmit(card);
  }

  render() {
    const { card } = this.state;
    const { complete, error } = card || {};
    const { message } = error || {};
    return (
      <StripeProvider apiKey={process.env.REACT_APP_STRIPE_KEY}>
        <Elements>
          <div>
            <AddCreditCardWrapper gutter={32}>
              <Col span={16}>
                <CardElement onReady={el => el.focus()} onChange={this.handleChange} />
              </Col>
              <Col span={8}>
                <ButtonSubmit disabled={!complete} type="button" onClick={this.handleSubmit}>
                  Submit
                </ButtonSubmit>
              </Col>
            </AddCreditCardWrapper>
            <ErrorWrapper>{message}</ErrorWrapper>
          </div>
        </Elements>
      </StripeProvider>
    );
  }
}

export default AddCreditCard;
