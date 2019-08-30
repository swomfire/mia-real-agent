import styled, { css } from 'styled-components';

export const MainConentAdmin = styled.div.attrs({
  className: 'main-content-admin',
})`
  display: flex;
  flex-direction: column;
  padding: 1.5em;
  background: ${props => props.theme.colorStyled.ColorXXXLightGrey};
`;

export const PaginationGroups = styled.div`
  box-shadow: ${props => props.theme.boxShandow.loginPage};
  padding: 0.75em 1em;
  display: flex;
  background: ${props => props.theme.colorStyled.ColorWhite};
  justify-content: flex-end;
  border-top: 1px solid  ${props => props.theme.colorStyled.ColorBorder};
`;

export const TableCustomizeAdmin = styled.div`
  flex: 1;
  position: relative;
   background: ${props => props.theme.colorStyled.ColorWhite};
`;


export const PaginationBlockStyled = styled.div`
  display: flex;
`;

export const TableLoadingStyled = styled.div`
  position: absolute;
  width: 100%;
  height: calc(100% - 40px);
  background: ${props => props.theme.colorStyled.ColorWhite};
  z-index: 1;
  top: 40px;
`;

export const PaginationInfoStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
`;
