import styled, { css } from 'styled-components';

export const SupportPanelWrapper = styled.div`
  width: 20.5%;
  position: absolute;
  border-right: 1px solid ${props => props.theme.colorStyled.ColorBorder};
  ${({ visiable }) => !visiable && {
    visibility: 'hidden',
  }}
  bottom: 0;
  right: 7em;
  .panel-chat{
    right: -5em;
  }
`;

export const SupportNotiWrapper = styled.div`
  flex:auto;
  display: flex;
  flex-direction: column;
  align-items: start;
  height: 100%;
  overflow: hidden;
  width: 100%;
  white-space: nowrap;
  padding: 0 .5em;
  button {
    margin-top: .5em;
    font-size: 1em;
  }
`;

export const ToggleSupportPanel = styled.div`
  position: absolute;
  background: ${props => props.theme.colorStyled.ColorPrimary};
  color:  ${props => props.theme.colorStyled.ColorWhite};
  right: -6em;
  bottom: 1em;
  z-index: 1;
  padding: .7em .9em;
  border-radius: .5em;
  display: flex;
  width: 12em;
  i {
    flex: 0 0 17%;
    font-weight: 600;
    font-size: 1.8em;
    display: flex;
    align-items: center;
  }
  span {
    font-size: 0.9em;
  }
  a {
    text-transform: uppercase;
    font-weight: 600;
    color:  ${props => props.theme.colorStyled.ColorWhite};
    :hover {
      color:  ${props => props.theme.colorStyled.ColorWhite};
    }
  }
`;
