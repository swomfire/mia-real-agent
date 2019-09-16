import styled from 'styled-components';
import { ButtonDefault } from '../../stylesheets/Button.style';

export const TopUpBlock = styled.div`
  padding: 0 .5em;
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

export const ExchangeRateWrapper = styled.div`
  padding: 5px 20px;
  text-align: center;
  font-size: 1.3em;
`;

export const TopUpTitle = styled.div`
  text-align: center;
  font-size: 2em;
  margin-bottom: 1em;
`;

export const TopUpSuccess = styled.div`
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

export const ExchangeValue = styled.div`
  height: 2.5em;
  display: flex;
  align-items: center;
  font-size: 1.5em;
  color: ${props => props.theme.colorStyled.ColorSusscess};
  i {
    margin-right: .4em;
  }
`;
