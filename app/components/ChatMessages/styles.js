import styled from 'styled-components';

export const EmptyMessageNotify = styled.div`
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ChatMessageWrapper = styled.div`
  background: ${props => props.theme.colorStyled.ColorWhite};
  .line-divider{
    flex: 0 0 10%;
  }
`;
