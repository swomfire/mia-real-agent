/* eslint-disable indent */
import styled, { css } from 'styled-components';

export const LeftSideBarAdmin = styled.div`
  height: 100vh;
  width: 100%;  
  background-color: ${props => props.theme.colorStyled.ColorBlack};
  ${({ isToggle }) => isToggle && css`
      width: 3.125em;      
  `};
`;

export const SidebarBlockAdmin = styled.ul``;

export const LogoWrapper = styled.div.attrs({
  className: 'logo-admin',
})`
  border-bottom: 1px solid ${props => props.theme.colorStyled.ColorXLightGrey};
  height: 100%;
  width: 100%;
  display: flex;
  padding: .5em 1em;
  align-items: center;
`;

export const Logo = styled.img`
  width: 6.500em;
  object-position: left;
  height: 100%;
  margin: auto 0;
  object-fit: contain;
  cursor: pointer;
`;
export const DescLogo = styled.div`
  color: ${props => props.theme.colorStyled.ColorWhite};
  display: flex;
  flex-direction: column;  
  height: 100%;
  justify-content: flex-end;
  span{
    font-size: ${props => props.theme.fontSize.SmallFontSize};
  }
`;

export const IconToggle = styled.i`
  position: fixed;
  opacity: 0;
  left: 16.25em;
  top: 1em;
  background-color: ${props => props.theme.colorStyled.ColorWhite};
  padding: 8px;
  box-shadow: ${props => props.theme.boxShandow.loginPage};
  border: 1px solid ${props => props.theme.colorStyled.ColorBorder};
  border-left: none;
  border-radius: 0px 50% 50% 0px;
  z-index: 2;
  &:hover {
    border-color: #bbb;
  }
`;

export const SidebarToggleButton = styled.div`
  height:  ${props => props.theme.heightSite.heightHeadAdmin};
  background-color: ${props => props.theme.colorStyled.ColorOverLay};
  cursor: pointer;
  position: relative;
  ${({ isToggle }) => isToggle && css`
    display: flex;
    align-items: center;
    justify-content: center;
    .logo-admin {
      display: none;
    }
    i {
      position: unset;
      background-color: transparent;
      border: none;
      box-shadow: none;
      color: ${props => props.theme.colorStyled.ColorWhite};
    }
  `};
`;


export const SidebarItem = styled.li`
  color: ${props => props.theme.colorStyled.ColorWhite};
  height: 2.500em;
  width: calc(100% - 2em);
  margin: 0.5em 1em;
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 0 1em;
  background: transparent;
  border-radius: ${props => props.theme.borderRadius.borderBtnSmall};
  border: none;
  transition: all 300ms ease;
  .menu-text{
    line-height: 1em;
    margin-left: .75em;
    font-size: ${props => props.theme.fontSize.MediumFontSize}
  }
  &:hover {
    background-color: ${props => props.theme.colorStyled.ColorBgDefault};
  }
  ${({ isActive }) => isActive && css`
      background-color: ${props => props.theme.colorStyled.ColorBgDefault};
      color: ${props => props.theme.colorStyled.ColorWhite};
  `};
  ${({ isToggle }) => isToggle && css`
    width: auto;
    margin: .5em 0;
    border: 0;
    justify-content: center;
    span {
      display: none;
    }
  `};
`;
