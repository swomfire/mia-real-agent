import React from 'react';
import Numeral from 'numeral';
import _keyBy from 'lodash/keyBy';
import {
  TableContentItem,
  TableContentItemGroup,
  TableContentWrapper,
} from 'components/TableComponent/TableComponent.styled';
import TableRow from '../TableManagement/TableRow';
import { BILLING_TYPE } from '../../../common/enums';
import { NUMERAL_MONEY_FORMAT, COLUMN_TYPE } from '../../utils/constants';
import {
  AddText, MinusText, BoldText, MoneyText,
} from './styles';
import { toI18n, getHourMinutes } from '../../utils/func-utils';

export class BillingRow extends TableRow {
  renderCharge = () => {
    const { item, columns } = this.props;
    const { total, content } = item;
    const { ticketId } = content;
    const { usedCreditTime, chargeAmount } = total;
    const renders = [];
    const time = getHourMinutes(usedCreditTime);
    const keyColumns = _keyBy(columns, 'dataKey');
    if (usedCreditTime > 0) {
      const { title } = keyColumns;
      const amount = keyColumns['total.amount'];
      const convertedColumns = {
        ...keyColumns,
        title: {
          ...title,
          type: null,
          value: (
            <span>
              {toI18n('BILLING_INFO_ROW_TIME_FOR_TICKET')}
              <BoldText>
                (
                {ticketId}
                )
              </BoldText>
            </span>),
        },
        'total.amount': {
          ...amount,
          type: null,
          value: (<MinusText>{`- ${Numeral(time.hours).format('00')}:${Numeral(time.minutes).format('00')}`}</MinusText>),
        },
      };
      renders.push(
        {
          columns: Object.keys(convertedColumns).map(key => convertedColumns[key]),
        }
      );
    }
    if (chargeAmount > 0) {
      const { title } = keyColumns;
      const amount = keyColumns['total.amount'];
      const convertedColumns = {
        ...keyColumns,
        title: {
          ...title,
          type: null,
          value: (
            <span>
              {toI18n('BILLING_INFO_ROW_CHARGED_FOR_TICKET')}
              <BoldText>
                (
                {ticketId}
                )
              </BoldText>
            </span>),
        },
        'total.amount': {
          ...amount,
          type: null,
          value: (<MinusText>{`- ${Numeral(chargeAmount).format(NUMERAL_MONEY_FORMAT)}`}</MinusText>),
        },
      };
      renders.push(
        {
          columns: Object.keys(convertedColumns).map(key => convertedColumns[key]),
        }
      );
    }
    return renders;
  }

  renderTitleColumn = () => {
    const { item } = this.props;
    const { type } = item;
    switch (type) {
      case BILLING_TYPE.TICKET_SUPPORT: {
        const { content } = item;
        const { ticketId } = content;
        return (
          <span>
            {toI18n('BILLING_INFO_ROW_CREDIT_FOR_SUPPORT_TICKET')}
            <BoldText>
              (
              {ticketId}
              )
            </BoldText>
          </span>
        );
      }
      case BILLING_TYPE.TICKET_FULFILL: {
        const { content } = item;
        const { ticketId } = content;
        return (
          <span>
            {toI18n('BILLING_INFO_ROW_CREDIT_FOR_TICKET')}
            <BoldText>
              (
              {ticketId}
              )
            </BoldText>
          </span>
        );
      }

      case BILLING_TYPE.TICKET_CHARGE:
      case BILLING_TYPE.TOPUP:
      default: {
        const { total } = item;
        const { amount } = total;
        return (
          <span>
            {toI18n('BILLING_INFO_ROW_TOPUP')}
            <BoldText>
              (
              <MoneyText>
                {Numeral(amount).format(NUMERAL_MONEY_FORMAT)}
              </MoneyText>
              )
            </BoldText>
          </span>
        );
      }
    }
  }

  renderAmountColumn = () => {
    const { item } = this.props;
    const { type } = item;
    switch (type) {
      case BILLING_TYPE.TICKET_SUPPORT: {
        const { total } = item;
        const { supportFee } = total;
        return <AddText>{`+ ${Numeral(supportFee).format(NUMERAL_MONEY_FORMAT)}`}</AddText>;
      }
      case BILLING_TYPE.TICKET_FULFILL: {
        const { total } = item;
        const { agentFee } = total;
        return <AddText>{`+ ${Numeral(agentFee).format(NUMERAL_MONEY_FORMAT)}`}</AddText>;
      }

      case BILLING_TYPE.TICKET_CHARGE:
      case BILLING_TYPE.TOPUP:
      default: {
        const { total, content } = item;
        const { exchangeRate } = content;
        const { amount } = total;
        const time = getHourMinutes(amount * exchangeRate);
        return <AddText>{`+ ${Numeral(time.hours).format('00')}:${Numeral(time.minutes).format('00')}`}</AddText>;
      }
    }
  }

  renderColumnContent = (column) => {
    const { type } = column;
    switch (type) {
      case COLUMN_TYPE.DATE:
        return this.renderDateColumn(column);
      case COLUMN_TYPE.LINK:
        return this.renderLinkColumn(column);
      case COLUMN_TYPE.ARRAY:
        return this.renderArrayColumn(column);
      case COLUMN_TYPE.ACTIONS:
        return this.renderActionsColumn(column);
      case COLUMN_TYPE.ACTIVE:
        return this.renderActiveColumn(column);
      case COLUMN_TYPE.CONSTANT:
        return this.renderConstantColumn(column);
      case COLUMN_TYPE.TOTAL:
        return this.renderTotalColumn(column);
      case COLUMN_TYPE.CURRENCY:
        return this.renderCurrencyColumn(column);
      case COLUMN_TYPE.STATUS:
        return this.renderStatusColumn(column);
      case COLUMN_TYPE.ROLE_BUTTON_GROUP:
        return this.renderRoleButtonGroupColumn(column);
      case COLUMN_TYPE.UPPERCASE:
        return this.renderUppercaseColumn(column);
      case COLUMN_TYPE.BILLING_TITLE:
        return this.renderTitleColumn(column);
      case COLUMN_TYPE.BILLING_AMOUNT:
        return this.renderAmountColumn(column);
      case COLUMN_TYPE.TEXT:
        return this.renderTextColumn(column);
      default:
        return this.renderValueColum(column);
    }
  };

  render() {
    const { columns, isPointer, item } = this.props;
    const { type } = item;
    switch (type) {
      case BILLING_TYPE.TICKET_CHARGE: {
        const chargeRenders = this.renderCharge();
        return chargeRenders.map(({ columns: rowColumns }) => (
          <TableContentWrapper>
            <TableContentItem onClick={this.onClick}>
              <TableContentItemGroup isPointer={isPointer}>
                {rowColumns.map(this.renderColumn)}
              </TableContentItemGroup>
            </TableContentItem>
          </TableContentWrapper>
        ));
      }
      default: return (
        <TableContentWrapper>
          <TableContentItem onClick={this.onClick}>
            <TableContentItemGroup isPointer={isPointer}>
              {columns.map(this.renderColumn)}
            </TableContentItemGroup>
          </TableContentItem>
        </TableContentWrapper>
      );
    }
  }
}

export default BillingRow;
