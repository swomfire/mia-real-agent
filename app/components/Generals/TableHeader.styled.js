import styled, { css } from 'styled-components';

export const HeaderAdminWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 1em;
  height:  ${props => props.theme.heightSite.heightHeadAdmin};
`;

export const TitleAdminHead = styled.div.attrs({
  className: 'title-header-admin',
})`
  margin-right: 1.5em;
`;

export const TitleAdminMain = styled.span`
  font-weight: 600;
  font-size: ${props => props.theme.fontSize.HeadingH3FontSize};
`;
export const HeaderActionWrapper = styled.div`
  display: flex;
  align-items: center;
  button{
    margin-right: 0.75em;
    &:last-child{
      margin: 0;
    }
  }
`;

export const TableHeaderSortWrapper = styled.div`
  position: absolute;
  top: 38px;
  right: 0;
  min-width: 260px;
  padding: 5px 0;
  margin: 2px 0 0;
  background-color: ${props => props.theme.colorStyled.ColorWhite};
  border: 1px solid #00000026;
  border-radius: 2px;
  box-shadow: 0 6px 12px #0000002d;
  z-index: 5;
  &:before {
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid;
    border-bottom-color: rgba(0, 0, 0, 0.05);
    top: -10px;
    content: '';
    right: 8px;
    position: absolute;
  }
  &:after {
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-bottom: 8px solid;
    border-bottom-color: ${props => props.theme.colorStyled.ColorWhite};
    top: -8px;
    content: '';
    right: 10px;
    position: absolute;
  }
`;

export const TableHeaderSortTitle = styled.div`
  color: #999;
  font-size: 13px;
  padding: 2px 20px 3px;
`;

export const TableHeaderSortContent = styled.div`
  padding: 5px 20px;
  line-height: 1.4;
  cursor: pointer;
  display: flex;
  align-items: center;
  i {
    margin-left: 7px;
    margin-bottom: 2px;
  }

  .icon-export {
    margin-left: 0px;
    margin-right: 5px;
  }

  &:hover {
    color: ${props => props.theme.colorStyled.ColorWhite};
    background-color: ${props => props.theme.colorStyled.ColoraBtnPrimary};
  }
  ${({ active }) => active
    && css`
      color: ${props => props.theme.colorStyled.ColorWhite};
      background-color: ${props => props.theme.colorStyled.ColoraBtnPrimary};
    `};
`;

export const TableHeaderFilterWrapper = styled(TableHeaderSortWrapper)`
  left: 0px;
  right: unset;
  font-size: 15px;
  &:before {
    top: -10px;
    right: 130px;
    position: absolute;
  }
  &:after {
    top: -8px;
    right: 132px;
    position: absolute;
  }
`;

export const ActionStyledWrapper = styled.div`
  margin-right: .5em;
  font-size: 1.3em;
  color: ${props => props.theme.colorStyled.ColorPrimary};
`;
