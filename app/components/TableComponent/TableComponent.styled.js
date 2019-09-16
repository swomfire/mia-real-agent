/* eslint-disable no-nested-ternary */
import styled, { css } from 'styled-components';
import { COLOR_BY_STATUS } from '../../../common/enums';

export const TableHeadWrapper = styled.div`  
`;

export const TableHeadItemGroup = styled.div`
  display: flex;  
  /* box-shadow: ${props => props.theme.boxShandow.headerTable}; */
`;

export const TableHead = styled.div`
  display: flex;
  padding: 0 1.5em;
  border: 1px solid ${props => props.theme.colorStyled.ColorWhite};
  color: ${props => props.theme.colorStyled.ColorXXLightGrey};
  min-height: ${props => props.theme.heightSite.heightHeadTable};  
  font-size:  ${props => props.theme.fontSize.MediumFontSize};
  flex: ${props => props.percent || 'auto'};    
  align-items: center;
  font-weight: 600;
  font-size: ${props => props.theme.fontSize.MediumFontSize};
  justify-content: ${props => props.justify || 'auto'};    
`;


export const TableRow = styled(TableHead)`
  text-transform: none;
  border: none;
  min-height: ${props => props.theme.heightSite.heightHeadAdmin};
  color: ${props => props.theme.colorStyled.ColorMidGrey};
  font-weight: normal;  

  ${({ status }) => status && css`
    color: ${[COLOR_BY_STATUS[status]]};
  `};
  ${({ active }) => active && css`
    .icon-dots {
      color: #0095d8;
    }
  `};
  &.text-bold{
    font-weight: 700;
  }
  &.application-cv {
    a {
      color: ${props => props.theme.colorStyled.ColorBgDefault};
    }
    
  }
  &.application-action {
    .anticon {
      border: 1px solid transparent;
      padding: .25em;
      margin-right: 1em;
      font-size: ${props => props.theme.fontSize.HeadingH5FontSize}; 
    }
    .anticon-check{
      color: ${props => props.theme.colorStyled.ColorSusscess}; 
      &:hover{
        opacity: 0.7;
        border: 1px solid ${props => props.theme.colorStyled.ColorSusscess}; 
      }
    }
    .anticon-close{
      color: ${props => props.theme.colorStyled.ColorWarming}; 
      &:hover{
        opacity: 0.7;
        border: 1px solid ${props => props.theme.colorStyled.ColorWarming}; 
      }
    }
  }
`;

export const TableContentItemGroup = styled(TableHeadItemGroup)`
  flex: 1;
  display: flex;
`;

export const TableContentItem = styled.div`
  display: flex;
  flex: 1;
  ${({ ticket }) => ticket && css`
    border: 1px solid ${props => props.theme.colorStyled.ColorBorder};
    margin-bottom: 15px;
    & > div{
      &:first-child{
        flex: 0 0 2em;
        padding: 0;
      }
    }
  `}
`;
export const TicketItemGroup = styled.div.attrs({
  className: 'vienpn-level-1-1',
})`
  font-size: 1.2em;
`;
export const TableContentWrapper = styled.div.attrs({
  className: 'vienpn-level-1',
})`
  border: 1px solid ${props => props.theme.colorStyled.ColorWhite}; 
  background-color: ${props => props.theme.colorStyled.ColorWhite};  
  &:nth-child(odd){
    background-color: ${props => props.theme.colorStyled.ColorXXXLightGrey};   
  }
  &:hover{
    cursor: pointer;
    border-color: ${props => props.theme.colorStyled.ColorPrimary}; 
  }
`;

export const TableDetailWrapper = styled(TableHeadItemGroup)``;

export const TableDetailImages = styled.div`
  flex: 0 0 45px;
  max-height: 45px;
  height: 45px;
  border: 1px solid ${props => props.theme.colorStyled.ColorBorder};
  padding: 5px;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

export const TableUserImages = styled(TableDetailImages)`
  flex: 0 0 60px;
  max-height: 60px;
  height: 60px;
  border-radius: 100%;
  overflow: hidden;
  img {
    object-fit: cover;
  }
`;

export const TableDetailContent = styled.div`
  margin-left: 10px;
  font-size: 15px;
  line-height: 21px;
  color: #206ec5;
  cursor: pointer;
  span {
    display: flex;
    align-items: center;
    p {
      margin-left: 5px;
      font-size: 13px;
      font-weight: 500;
    }
  }
  ${({ colorStatus }) => colorStatus
    && css`
      p {
        color: #388a10;
      }
    `};
`;

export const TableDetailSubContent = styled.div`
  color: #777;
  font-size: 13px;
  text-transform: uppercase;
  ${({ lowercase }) => lowercase
    && css`
      text-transform: lowercase;
    `};
`;

export const MoreAction = styled.div`
  position: relative;
`;

export const MoreActionWrapper = styled.div`
  position: absolute;
  right: 0px;
  top: 20px;
  min-width: 160px;
  padding: 5px 0;
  margin: 2px 0 0;
  background-color: ${props => props.theme.colorStyled.ColorWhite};
  border: 1px solid #ccc;
  border-radius: 2px;
  z-index: 2;
  cursor: pointer;
`;

export const MoreActionItem = styled.div`
  padding: 3px 20px;
  line-height: 1.4;
  font-size: 13px;
  &:hover {
    color: ${props => props.theme.colorStyled.ColorWhite};
  }
`;

export const TableEmptyContent = styled.div`
  text-align: center;
  padding: 20px;
`;

export const TableStatusContent = styled.span`
  display: flex;
  align-items: center;
  font-size:  ${props => props.theme.fontSize.MediumFontSize};
  ${({ status }) => status && css`
      font-style: italic;
      text-transform: uppercase;
      color: ${[COLOR_BY_STATUS[status]]};
  `};
  i {
    display: inline-block;
    width: .65em;
    height: .65em;
    margin-right: 0.5em;
    border-radius: 100%;
    ${({ status }) => status && css`
      background: ${[COLOR_BY_STATUS[status]]};
  `};
  }
`;
