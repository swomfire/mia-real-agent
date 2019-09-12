import React, { Component } from 'react';
import {
  arrayOf, func, shape, string,
} from 'prop-types';
import {
  Row, Col, Icon, Checkbox,
} from 'antd';
import {
  CreditCardWrapper, CreditCardType, AddCreditCardWrapper,
  CreditCardTitleWrapper,
} from './styles';
import { toI18n } from '../../utils/func-utils';
import { ButtonPrimary } from '../../stylesheets/Button.style';

// eslint-disable-next-line react/prefer-stateless-function
class CreditCard extends Component {
  state = {
    selectedCard: '',
  }

  static propTypes = {
    card: arrayOf(shape()).isRequired,
    type: string,
    onClick: func,
    onRemove: func,
    onAdd: func,
  }

  handleOnClick = (_id) => {
    const { onClick = () => { } } = this.props;
    const { selectedCard } = this.state;
    const card = selectedCard === _id ? '' : _id;
    this.setState({
      selectedCard: card,
    });
    onClick(card);
  }

  handleRemove = (_id, e) => {
    const { onRemove } = this.props;
    onRemove(_id);
    e.stopPropagation();
  }

  renderActionreditCard = () => {
    const { selectedCard } = this.state;
    const { card } = this.props;
    return (
      card.map(({ last4Digits, type, _id }) => (
        <Row>
          <CreditCardWrapper key={last4Digits} onClick={() => this.handleOnClick(_id)} selected={selectedCard === _id}>
            <Checkbox onChange={() => this.handleOnClick(_id)} checked={selectedCard === _id} />
            <CreditCardTitleWrapper>
              <CreditCardType type={type} />
              {`**** **** **** ${last4Digits}`}
            </CreditCardTitleWrapper>
            <ButtonPrimary onClick={e => this.handleRemove(_id, e)}>
              <Icon type="delete" />
            </ButtonPrimary>
          </CreditCardWrapper>
        </Row>
      ))
    );
  }

  renderDisplayCreditCard = () => {
    const {
      card, onClick = () => { }, onAdd,
    } = this.props;
    return (
      <div>
        {card.map(({ last4Digits, type, _id }) => (
          <Row>
            <CreditCardWrapper key={last4Digits} onClick={onClick}>
              <CreditCardTitleWrapper>
                <CreditCardType type={type} />
                {`**** **** **** ${last4Digits}`}
              </CreditCardTitleWrapper>
              <ButtonPrimary onClick={e => this.handleRemove(_id, e)}>
                <Icon type="delete" />
              </ButtonPrimary>
            </CreditCardWrapper>
          </Row>
        ))}
        <Col xs={24} sm={24} md={24}>
          <AddCreditCardWrapper onClick={onAdd}>
            <ButtonPrimary>
              {toI18n('CREDIT_CARD_ADD_CREDIT_CARD')}
            </ButtonPrimary>
          </AddCreditCardWrapper>
        </Col>
      </div>
    );
  }

  render() {
    const { type } = this.props;
    switch (type) {
      case 'select-list':
        return this.renderActionreditCard();
      default:
        return this.renderDisplayCreditCard();
    }
  }
}

export default CreditCard;
