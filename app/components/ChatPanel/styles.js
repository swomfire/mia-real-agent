import styled, { css } from 'styled-components';

export const ChatWrapper = styled.div.attrs({
  className: 'panel-chat',
})`
  position: absolute;
  display: flex;
  height: 25em;
  width: 24em;
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
  margin-top: 4em;
  margin-right: -.5em;
  height: calc(85% - 3em);
  width: 100%;
  display: flex;
  background: ${props => props.theme.colorStyled.ColorWhite};
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
  .anticon-ellipsis {
    margin-right: .5em;
    font-size: 1.6em;
  }
`;

export const ActionPanelWrapper = styled.div`
  margin: -10px;
  font-size: 1.4em;
  button {
  }
`;
