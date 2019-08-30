import styled, { css } from 'styled-components';
import { SubmitButtonStyled } from './General.styled';

export const ItemDetailWrapper = styled.div`
  height: calc(100vh - 62px);
  overflow: hidden;
  display: flex;
  width: 100%;
`;

export const ItemDetailListWrapper = styled.div`
  flex: 0 0 415px;
  border-right: 1px solid ${props => props.theme.colorStyled.ColorWhite};
`;

export const ItemDetailListItem = styled.div`
  display: flex;
  align-items: center;
  border-top: 1px solid ${props => props.theme.colorStyled.ColorWhite};
  cursor: pointer;
  &:last-child {
    border-bottom: 1px solid ${props => props.theme.colorStyled.ColorWhite};
  }
  &:hover {
    background-color: ${props => props.theme.colorStyled.ColorWhite};
  }
  ${({ active }) => active
    && css`
      background-color: ${props => props.theme.colorStyled.ColorWhite};
    `};
`;

export const ItemDetailInput = styled.div`
  padding: ${props => props.theme.fontSize.MediumFontSize};
  text-align: center;
`;

export const ItemDetailName = styled.div`
  padding: ${props => props.theme.fontSize.MediumFontSize};
  padding-left: 0px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ItemDetailInfoWrapper = styled.div`
  flex: 1;
`;

export const ItemDetailInfoHeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 20px;
  height: 60px;
  .receive-form {
    background-color: ${props => props.theme.colorStyled.ColorWhite};
    border-radius: 7px;
    border: 1px solid ${props => props.theme.colorStyled.ColorWhite};
    box-shadow: 0 3px 9px #00000080;
    position: fixed;
    top: 50px;
    left: calc(50% - 200px);
    width: 460px;
    height: fit-content;
    z-index: 5;
  }
`;

export const ItemDetailInfoHeadTitle = styled.div`  
  font-size: 22px;
`;

export const ItemDetailInfoActionGroup = styled.div`
  display: flex;
  align-items: center;
  .icon-pencil {
    border-radius: 3px;
    border: 1px solid ${props => props.theme.colorStyled.ColorWhite};
    padding: 5px 10px;
    font-size: 18px;
    color: #222;
    &:hover {
      border-color: ${props => props.theme.colorStyled.ColorWhite};
      box-shadow: 0 1px 1px #0000001a;
    }
  }
  .icon-close {
    color: #222;
    font-size: 24px;
    margin-left: 15px;
  }
  a {
    text-decoration: none;
  }
  ${({ noTitle }) => noTitle
    && css`
      .close-action {
        margin-left: auto;
      }
    `};
  button:nth-child(n) {
    margin-right: 10px;
  }
`;

export const ActionButton = styled(SubmitButtonStyled)`
  margin-left: 10px;
  height: 30px;
`;

export const MoreButton = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  height: 30px;
  border: 1px solid ${props => props.theme.colorStyled.ColorWhite};
  border-radius: 3px;
  margin-left: 10px;
  cursor: pointer;
  span {
    padding: 5px 0px 5px 10px;
  }
  i {
    margin-right: 5px;
  }
`;

export const MoreOptionWrapper = styled.div`
  position: absolute;
  top: 35px;
  right: 0;
  z-index: 2;
  min-width: 160px;
  padding: 5px 0;
  margin: 2px 0 0;
  background-color: ${props => props.theme.colorStyled.ColorWhite};
  border: 1px solid ${props => props.theme.colorStyled.ColorWhite};
  border-radius: 2px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
`;

export const MoreOptionItem = styled.div`
  padding: 3px 20px;
  line-height: 1.4;
  &:hover {
    color: ${props => props.theme.colorStyled.ColorWhite};
    background-color: ${props => props.theme.colorStyled.ColoraBtnPrimary};
  }
`;

export const ItemTabListWrapper = styled.div`
  height: 100%;
  overflow: hidden;
  .react-tabs {
    height: 100%;
    position: relative;
  }
  .react-tabs__tab {
    padding: 10px 15px;
    font-size: 11px;
    text-transform: uppercase;
    color: ${props => props.theme.colorStyled.ColoraBtnPrimary};
    border: none;
    &:hover {
      color: #555;
    }
  }
  .react-tabs__tab-list {
    border-color: ${props => props.theme.colorStyled.ColorWhite};
    margin: 0px;
  }
  .react-tabs__tab-panel {
    height: 100%;
  }
  .react-tabs__tab--selected {
    border-radius: 0px;
    border-color: ${props => props.theme.colorStyled.ColorWhite};
    border-bottom: 3px solid ${props => props.theme.colorStyled.ColoraBtnPrimary};
    color: #555;
  }
  ${({ isLarge }) => isLarge
    && css`
      .react-tabs__tab {
        padding: 20px 15px;
      }
    `};
`;

export const InfoOverviewWrapper = styled.div`
  padding: 20px;
  display: flex;
`;

export const InfoOverviewLeft = styled.div`
  flex: 1;
`;

export const InfoContentBlock = styled.div`
  display: block;
  padding: 20px;
`;

export const OverviewLeftSectionWrapper = styled.div`
  flex: 1;
  /* padding-bottom: 30px; */
`;

export const OverviewRightSectionWrapper = styled.div`
  flex: 0 0 30%;
`;

export const OverviewTitle = styled.div`
  font-size: 18px;
  margin-bottom: 15px;
`;

export const OverviewProduct = styled.div`
  display: flex;
  align-items: flex-start;
  line-height: 21px;
  margin-bottom: 10px;
  label {
    color: #666;
    flex: 0 0 35%;
  }
  span {
    flex: 1;
  }

  a {
    text-decoration: unset;
    color: ${props => props.theme.colorStyled.ColoraBtnPrimary};
  }
  ${({ link }) => link
    && css`
      color: ${props => props.theme.colorStyled.ColoraBtnPrimary};
      &:hover {
        color: #154983;
      }
    `};
`;

export const OverviewImageWrapper = styled.div`
  position: relative;
  min-height: 160px;
  width: 237px;
  border: 1px solid ${props => props.theme.colorStyled.ColorWhite};
  border-radius: 4px;
`;

export const OverviewImagePreview = styled.div`
  padding: 5px;
  width: 237px;
  height: 170px;
  position: relative;
  border-radius: 15px;
  img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: block;
    max-height: 120px;
    max-width: 210px;
    height: auto;
  }
`;

export const OverviewImageAction = styled.div`
  padding: 10px;
  padding-top: 0px;
  text-align: right;
  i {
    &:hover {
      color: ${props => props.theme.colorStyled.ColoraBtnPrimary};
    }
  }
`;

export const OverviewImageListWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
  max-width: 237px;
  height: 50px;
`;

export const OverviewImage = styled.div`
  display: inline-block;
  border: 1px solid ${props => props.theme.colorStyled.ColorWhite};
  min-height: 43px;
  min-width: 42px;
  padding: 5px;
  margin: 0 5px 4px;
  position: relative;
  border-radius: 4px;
  cursor: pointer;
  &:first-child {
    margin-left: 0px;
  }
  &:last-child {
    margin-right: 0px;
  }

  img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: block;
    max-width: 35px;
    max-height: 30px;
    height: auto;
  }
  &:hover {
    border: 1px solid ${props => props.theme.colorStyled.ColoraBtnPrimary};
  }
  ${({ active }) => active
    && css`
      border: 1px solid ${props => props.theme.colorStyled.ColoraBtnPrimary};
    `};
`;

export const OverviewAddImage = styled.div`
  border: 1px dashed ${props => props.theme.colorStyled.ColorWhite};
  min-height: 43px;
  min-width: 42px;
  padding: 5px;
  margin: 0 5px 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
  i {
    font-size: 28px;
  }
`;

export const ItemStatus = styled.div`
  text-align: right;
  color: #999;
  font-size: 11px;
  text-transform: uppercase;
  line-height: 1.4;
`;
