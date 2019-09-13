import styled from 'styled-components';
import { ButtonDefault } from '../../stylesheets/Button.style';


export const PaymentBlock = styled.div`
  padding: 0 .5em;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${props => props.theme.colorStyled.ColorWhite};
  position: relative;
  z-index: 1;
  .ant-tabs-nav-wrap{
    display: none;
  }
  .ant-steps {
    margin-bottom: 35px;
  }
  .ant-steps-item {
    height: 38px;
    display: flex;
    align-items: center;
    overflow: unset;
    margin-right: 8px !important;
    &:before {
      position: absolute;
      content: '';
      left: 3px;
      top: 0;
      width: 100%;
      height: 50.5%;
      z-index: 1;
      transform: skew(20deg);
      border-radius: 2px 2px 0 0;
      background-color: #eee;
    }
    &:after {
      position: absolute;
      content: '';
      left: 3px;
      bottom: 0;
      width: 100%;
      height: 50.5%;
      z-index: 1;
      background-color: #eee;
      transform: skew(-20deg);
      border-radius: 0 0 2px 2px;
    }
    &:last-child {
      margin-right: 8px !important;
      .ant-steps-item-title {
        padding-right: 16px !important;
      }
    }
  }
  .ant-steps-item-icon {
    position: relative;
    z-index: 2;
    background: transparent !important;
    border: none !important;
    margin-right: 0px;
    margin-left: 8px;
    span {
      color: #aaa !important;
      font-size: ${props => props.theme.fontSize.MediumFontSize};
    }
  }
  .ant-steps-item-finish, .ant-steps-item-wait{
    .ant-steps-item-content {
      border-left: 0;
      padding-left: 0;
  }
  }
  .ant-steps-item-content {
    position: relative;
    z-index: 2;
    border-left: 1px solid white;
    margin-top: -3px;
    margin-bottom: -3px;
    height: 38px;
    padding-left: 10px;
  }
  .ant-steps-item-title {
    color: #aaa !important;
    font-size: ${props => props.theme.fontSize.MediumFontSizePx};
    margin-top: 3px;
    &:after {
      content: none;
    }
  }
  .ant-steps-item.ant-steps-item-process,
  .ant-steps-item.ant-steps-item-finish {
    &:before,
    &:after {
      background-color: ${props => props.theme.colorStyled.ColorBgDefault} !important;
    }
    .ant-steps-item-icon {
      span {
        color: ${props => props.theme.colorStyled.ColorWhite} !important;
      }
    }
    .ant-steps-item-title {
      color: ${props => props.theme.colorStyled.ColorWhite} !important;
    }
  }
  .ant-tabs-bar {
    display: none;
  }
  .ant-input-number{
    height: 55px;
  }
  .ant-input-number-input {
    font-size: 1.5em;
    height: 50px;
  }
`;


export const PaymentWrapper = styled.div`
  display: flex;
  .ant-row {
    width: 100%;
  }
`;

export const OptionWrapper = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 1.5em;
  margin: 10px;
  border-radius: 2px;
  border: 1px solid  ${props => props.theme.colorStyled.ColorBorder};
  flex-direction: column;
  :hover {
    background-color: ${props => props.theme.colorStyled.ColorXXXLightGrey};
  }
  i {
    font-size: 2.2em;
    margin-bottom: .1em;
  }
`;

export const AddCreditCard = styled(ButtonDefault)`
    font-size: 1em;
    position: absolute;
    bottom: .5em;
    left: .5em;
`;

export const ActionGroup = styled.div`
  margin-top: 2em;
  display: flex;
  justify-content: flex-end;
  button {
    width: 7.250em;
    height: 2.438em;
    margin-left: 10px;
    font-size: 1em;
  }
`;

export const TicketPaymentSuccess = styled.div`
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-size: 1.4em;
  h2 {
    color: ${props => props.theme.colorStyled.ColorSusscess};
    margin-bottom: .5em;
  }
  i {
      margin-right: .4em;
  }
`;

export const CreditTimeWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: .6em;
  button {
    font-size: 1em;
    margin-left: .5em;
  }
`;

export const CreditTimeLabelWrapper = styled.div`
  font-size: 1.2em;
  width: 100%;
  span {
    font-weight: 600;
    font-size: 1.2em;
    color: ${props => props.theme.colorStyled.ColorLabel};
    margin-left: .5em;
  }
`;

export const TicketTimeWrapper = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.2em;
  margin-bottom: .6em;
  span {
    font-weight: 600;
    font-size: 1.2em;
    color: ${props => props.theme.colorStyled.ColorIconHover};
    margin-left: .5em;
  }
`;

export const RemainingCreditTimeWrapper = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.2em;
  margin-bottom: .6em;
  span {
    font-weight: 600;
    font-size: 1.2em;
    color: ${props => props.theme.colorStyled.ColorSusscess};
    margin-left: .5em;
  }
`;

export const EquivalentToWrapper = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.2em;
  margin-bottom: .6em;
  span {
    font-weight: 600;
    font-size: 1.2em;
    color: ${props => props.theme.colorStyled.ColorWarming};
    margin-left: .5em;
  }
`;
