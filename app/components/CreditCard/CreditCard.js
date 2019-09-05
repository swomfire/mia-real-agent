import React, { Component } from 'react';
import { arrayOf, func, shape } from 'prop-types';
import { Row, Col } from 'antd';
import { CreditCardWrapper, CreditCardType, AddCreditCardWrapper } from './styles';

// eslint-disable-next-line react/prefer-stateless-function
class CreditCard extends Component {
  static propTypes = {
    card: arrayOf(shape()).isRequired,
    onClick: func,
  }

  render() {
    const { card, onClick = () => { } } = this.props;
    return (
      <Row>
        {card.map(({ last4Digits, type }) => (
          <Col xs={24} sm={24} md={12}>
            <CreditCardWrapper key={last4Digits} onClick={onClick}>
              <CreditCardType type={type} />
              {`**** **** **** ${last4Digits}`}
            </CreditCardWrapper>
          </Col>
        ))}
        <Col xs={16} sm={16} md={8}>
          <AddCreditCardWrapper onClick={onClick}>
            + Add Credit Card
          </AddCreditCardWrapper>
        </Col>
      </Row>
    );
  }
}

export default CreditCard;
