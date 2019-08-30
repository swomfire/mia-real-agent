import styled from 'styled-components';
import { COLOR_BY_STATUS } from '../../../common/enums';

export const TicketTabWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
`;

export const TicketFilterWrapper = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const FilterItem = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  border-radius: 3px;
  height: 32px;
  flex: auto;
  font-size: 13px;
  > * {
    height: 100%;
  }
  background-color: ${props => props.theme.colorStyled.ColorBlackSecondary};
  input {
    border: 1px solid ${props => props.theme.colorStyled.ColorBorder};
    border-left: none;
    background-color: ${props => props.theme.colorStyled.ColorWhite};
    box-shadow: inset 0 1px 2px rgba(27,31,35,.075);
    border-radius: 0px 3px 3px 0px;
    padding: 0px 8px;
    flex: 1;
    &::placeholder {
      opacity: 0.6;
    }
  }
  .ant-menu {
    position: absolute;
    left: 0px;
    top: 35px;
    background-color: ${props => props.theme.colorStyled.ColorWhite};
    border-radius: 3px;
    border: 1px solid ${props => props.theme.colorStyled.ColorBorder};
    width: 220px;
    height: fit-content;
    box-shadow: 0 3px 12px #1b1f2326 !important;
    overflow: hidden;
    .ant-menu-item {
      cursor: pointer;
      margin: 0px !important;
      border-bottom: 1px solid ${props => props.theme.colorStyled.ColorBorder};
      height: 32px;
      line-height: 32px;
      font-size: 13px;
      &:last-child {
        border-bottom: none !important;
      }
      &:hover {
        background-color: #ff5402;
        border-bottom: 1px solid #ff5402;
        color: ${props => props.theme.colorStyled.ColorWhite};
      }
    }
    .ant-menu-item.ant-menu-item-selected {
      background-color: #ff5402;
      border-bottom: 1px solid #ff5402;
      color: ${props => props.theme.colorStyled.ColorWhite};
    }
  }
`;

export const Filter = styled.div`
  overflow: hidden;
  display: flex;
  align-items: center;
  a {
    border: 1px solid ${props => props.theme.colorStyled.ColorBorder};
    background-color: ${props => props.theme.colorStyled.ColorWhite};
    background-image: linear-gradient(-180deg,#fff,#eff3f6 90%);
    background-position: -1px -1px;
    background-repeat: repeat-x;
    background-size: 110% 110%;
    font-weight: 700;
    color: #444d56;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px 12px;
    height: 100%;
    &:first-child {
      border-right: 1px solid transparent;
      border-radius: 3px 0px 0px 3px;
    }
    &:hover {
      color: ${props => props.theme.colorStyled.ColorBlack};
      border-color: #1b1f2359;
    }
  }
  i {
    margin-left: 5px;
    font-size: 12px;
  }
`;

export const CreateItem = styled.div`
  margin-left: 20px;
`;

export const TicketWrapper = styled.div`
  height: calc(100vh - 300px);
  margin-bottom: 20px;
`;
export const TicketFrontWrapper = styled.div`
  height: calc(100vh - 300px);
`;

export const TicketPaginationWrapper = styled.div`
  padding: 0 16px;
  text-align: center;
  .ant-pagination-item.ant-pagination-item-active a {
    color: ${props => props.theme.colorStyled.ColorBlack};
  }
  .ant-pagination-item-active {
    border-color: #d9d9d9;
  }
  @media (max-width: 768px) {
    display: none;
  }
`;

export const TicketStatus = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-top: 2px;
  margin-right: 10px;
  display: inline-block;
  background: ${({ status }) => [COLOR_BY_STATUS[status]]};
`;
