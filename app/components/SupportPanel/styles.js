import styled, { css } from 'styled-components';

export const SupportPanelWrapper = styled.div`
  width: 20.5%;
  position: absolute;
  border-right: 1px solid ${props => props.theme.colorStyled.ColorBorder};
  ${({ visiable }) => !visiable && {
    width: 0,
    paddingLeft: 0,
    paddingRight: 0,
  }}
  bottom: 0;
  right: 7em;
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
  }
`;

export const SupportChatWrapper = styled.div`
  position: absolute;
  display: flex;
  height: 25em;
  width: 24em;
  right: -6em;
  bottom: -.05em;
  overflow: hidden;
  white-space: nowrap;
  z-index: 1;
  box-shadow: 0px 0px 10px ${props => props.theme.colorStyled.ColorBorder};
  ${props => !props.visiable && css`
  height: 3.5em;
  `}
`;

export const ChatContentWrapper = styled.div`
  margin-top: 3em;
  padding-left: -.5em;
  margin-right: -.5em;
  height: calc(85% - 3em);
  width: 100%;
  display: flex;
`;

export const MessageInputContent = styled.div`
  position: absolute;
  width: 100%;
  bottom: 0;
`;

export const SupporterWrapper = styled.div`
  background: ${props => props.theme.colorStyled.ColorPrimary};
  display: flex;
  width: 100%;
  position: absolute;
  height: 3.5em;
  z-index: 2;
  border-radius: .5em .5em 0 0;
  color:  ${props => props.theme.colorStyled.ColorWhite};
  align-items: center;
  padding: 0 1em;
  justify-content: flex-end;
`;

export const SupporterName = styled.div`
  flex: 0 0 80%;
`;

export const SupportPanelActionGroup = styled.div`
  flex: 0 0 20%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;
