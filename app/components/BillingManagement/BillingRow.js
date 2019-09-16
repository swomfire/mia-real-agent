import React from 'react';
import moment from 'moment';
import Numeral from 'numeral';
import {
  TableContentItem,
  TableContentItemGroup,
  TableContentWrapper,
} from 'components/TableComponent/TableComponent.styled';
import { TableContent } from 'components/TableComponent/TableComponent';
import TableRow from '../TableManagement/TableRow';
import { BILLING_TYPE } from '../../../common/enums';
import { DATE_TIME_FORMAT, NUMERAL_MONEY_FORMAT } from '../../utils/constants';
import {
  AddText, MinusText, BoldText, MoneyText,
} from './styles';
import { toI18n } from '../../utils/func-utils';

export class BillingRow extends TableRow {
  renderBillingColumn = (column, index) => {
    const { value, percent, justify } = column;
    return (
      <TableContent percent={percent} justify={justify} key={index}>
        {value}
      </TableContent>
    );
  }

  renderTopUp = () => {
    const { item } = this.props;
    const { createdAt, total, content } = item;
    const { exchangeRate } = content;
    const { amount } = total;
    return [
      {
        value: (<span>
          {toI18n('BILLING_INFO_ROW_TOPUP')}
          <BoldText>
            (
            <MoneyText>
              {Numeral(amount).format(NUMERAL_MONEY_FORMAT)}
            </MoneyText>
            )
          </BoldText>
        </span>),
        percent: 60,
      },
      {
        value: moment(createdAt).format(DATE_TIME_FORMAT.DATE_TIME),
        percent: 25,
      },
      {
        value: (<AddText>{`+ ${amount * exchangeRate}m`}</AddText>),
        percent: 15,
        justify: 'flex-end',
      },
    ].map(this.renderBillingColumn);
  }

  renderCharge = () => {
    const { item } = this.props;
    const { createdAt, total, content } = item;
    const { ticketId } = content;
    const { usedCreditTime, chargeAmount } = total;
    const renders = [];
    if (usedCreditTime > 0) {
      renders.push(
        [
          {
            value: (<span>
              {toI18n('BILLING_INFO_ROW_TIME_FOR_TICKET')}
              <BoldText>
                (
                {ticketId}
                )
              </BoldText>
            </span>),
            percent: 60,
          },
          {
            value: moment(createdAt).format(DATE_TIME_FORMAT.DATE_TIME),
            percent: 25,
          },
          {
            value: (<MinusText>{`- ${usedCreditTime}m`}</MinusText>),
            percent: 15,
            justify: 'flex-end',
          },
        ].map(this.renderBillingColumn)
      );
    }
    if (chargeAmount > 0) {
      renders.push(
        [
          {
            value: (<span>
              {toI18n('BILLING_INFO_ROW_CHARGED_FOR_TICKET')}
              <BoldText>
                (
                {ticketId}
                )
              </BoldText>
            </span>),
            percent: 60,
          },
          {
            value: moment(createdAt).format(DATE_TIME_FORMAT.DATE_TIME),
            percent: 25,
          },
          {
            value: (<MinusText>{`- ${Numeral(chargeAmount).format(NUMERAL_MONEY_FORMAT)}`}</MinusText>),
            percent: 15,
            justify: 'flex-end',
          },
        ].map(this.renderBillingColumn)
      );
    }
    return renders;
  }

  render() {
    const { isPointer, item } = this.props;
    const { type } = item;
    if (type === BILLING_TYPE.TOPUP) {
      return (
        <TableContentWrapper>
          <TableContentItem onClick={this.onClick}>
            <TableContentItemGroup isPointer={isPointer}>
              {this.renderTopUp()}
            </TableContentItemGroup>
          </TableContentItem>
        </TableContentWrapper>
      );
    }
    const chargeRenders = this.renderCharge();
    return chargeRenders.map(value => (
      <TableContentWrapper>
        <TableContentItem onClick={this.onClick}>
          <TableContentItemGroup isPointer={isPointer}>
            {value}
          </TableContentItemGroup>
        </TableContentItem>
      </TableContentWrapper>
    ));
  }
}

export default BillingRow;
