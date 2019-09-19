import styled, { css } from 'styled-components';
import { SubmitButtonStyled } from './General.styled';
import { COLOR_BY_STATUS } from '../../../common/enums';

export const ItemDetailWrapper = styled.div`
  height: calc(100vh);
  display: flex;
  width: 100%;
  
`;

export const ItemDetailListWrapper = styled.div`
  flex: 0 0 415px;
  .main-content-admin{
    padding: 0;
    border-top: 1px solid ${props => props.theme.colorStyled.ColorBorder};
    background-color: ${props => props.theme.colorStyled.ColorWhite};
  }
  .title-header-admin{
    flex: 1;
    margin-right: 0.5em;
    span{
      font-size: ${props => props.theme.fontSize.HeadingH5FontSize};
    }
  }
`;
export const ItemsListsName = styled.div`
  font-weight: 600;
  font-size:  ${props => props.theme.fontSize.MediumFontSize};
`;

export const ItemDetailListItem = styled.div`
  display: flex;
  align-items: center;  
  padding: 0em 1em;
  cursor: pointer;
  border: 1px solid ${props => props.theme.colorStyled.ColorWhite};
  &:nth-child(odd) {
    background-color: ${props => props.theme.colorStyled.ColorXXXLightGrey};
}
  &:hover {
    border: 1px solid ${props => props.theme.colorStyled.ColorBgDefault};
  }
  ${({ active }) => active
    && css`
      background-color: ${props => props.theme.colorStyled.ColorWhite};
  `};
`;


export const ItemDetailName = styled.div`
  padding: ${props => props.theme.fontSize.MediumFontSize};
  padding-left: 0px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

`;

export const AdminDetailsContainer = styled.div`
  flex: 1;
  border-left: 1px solid ${props => props.theme.colorStyled.ColorBorder};
`;

export const TitleDetailsHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1em;
  border-bottom: 1px solid ${props => props.theme.colorStyled.ColorBorder};
  height:  ${props => props.theme.heightSite.heightHeadAdmin};
`;

export const HeaderTextDetails = styled.div`  
  font-size: ${props => props.theme.fontSize.HeadingH4FontSize};
  display: flex;
  align-items: center;
  font-weight: 600;
  .type-status{
    font-size: ${props => props.theme.fontSize.HeadingH6FontSize};
    text-transform: capitalize;
    margin-left: 0.2em;
  }
  i{
    margin-right: .5em;
    &:hover{
      color: ${props => props.theme.colorStyled.ColorBgDefault};
    }
  }
`;

export const AdminHeadActionGroup = styled.div`
  display: flex;
  align-items: center;  
  a {
    text-decoration: none;
  }  
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

export const AdminInfoContentBlock = styled.div`
  padding: 1em 1.5em;
`;

export const AdminUserDetailsRight = styled.div`
  flex: 1;
`;

export const AdminUserDetailsLeft = styled.div`
  flex: 1;
`;

export const AdminUserDetailsGroup = styled.div`
    display: flex;
`;

export const OverviewLeftSectionWrapper = styled.div`
  flex: 1;
  /* padding-bottom: 30px; */
`;

export const OverviewRightSectionWrapper = styled.div`
  flex: 0 0 30%;
`;

export const OverviewTitle = styled.div`
  font-size: ${props => props.theme.fontSize.HeadingH6FontSize};
  margin-bottom: 1em;
  font-weight: 600;

  :nth-of-type(n+2) {
    margin-top: 2em;
  }
`;

export const OverviewProduct = styled.div`
  display: flex;
  margin-bottom: .5em;
  align-items: center;
  a {
    text-decoration: unset;
    color: ${props => props.theme.colorStyled.ColoraBtnPrimary};
  }
  ${({ link }) => link
    && css`
      color: ${props => props.theme.colorStyled.ColorPrimary};
      &:hover {
        opacity: 0.7;
      }
    `};
`;
export const OverviewLabel = styled.span`
  color: ${props => props.theme.colorStyled.ColorLabel};
  flex: 0 0 10em;
  font-size:  ${props => props.theme.fontSize.MediumFontSize};
`;
export const OverviewValue = styled.span`
  flex: 1;
  color: ${props => props.theme.colorStyled.ColorBlack};
  font-size:  ${props => props.theme.fontSize.BaseFontSize};
  overflow: hidden;
  overflow-wrap: break-word;
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
  font-style: italic;
  margin: .3em .2em 0 .4em;
  font-size:  ${props => props.theme.fontSize.SmallFontSize};
   ${({ status }) => status && css`      
      color: ${[COLOR_BY_STATUS[status]]};
  `};
`;

export const ItemDescription = styled.div`
  font-style: italic;
  font-size:  ${props => props.theme.fontSize.SmallFontSize};
  margin: 0.2em  0 0 .2em;
`;

export const PleaseSelect = styled.div`
  height: calc(100vh - 150px);
  display: flex;
  align-items: center;
  justify-content: center;
`;
