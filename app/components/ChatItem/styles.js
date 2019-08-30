import styled, { css, keyframes } from 'styled-components';
import { COLOR_BY_STATUS, COLOR_BY_ACTION } from '../../../common/enums';

export const MessageBoxItem = styled.div`
  display: flex;
  align-items: flex-end;
  margin-bottom: 15px;
  p {
    margin-bottom: 0;
    margin-top: 3px;
    width: fit-content;
    border-radius: 20px;
    padding: 5px 12px;
    word-break: break-all;
    clear: left;
  }
  ${({ left }) => left && css`
    justify-content: flex-start;
    padding-left: 10px;
    .ant-avatar {
      margin-right: 10px;
    }
    p {
      float: left;
      background-color: #f5f5f5;
    }
  `}
  ${({ right }) => right && css`
    justify-content: flex-end;
    padding-right: 10px;
    .ant-avatar {
      margin-left: 10px;
    }
    p {
      float: right;
      color: ${props => props.theme.colorStyled.ColorWhite};
      background-color: #ff5504;
    }
    > div{
     align-items: flex-end;
    }
  `}
  &:first-child {
    padding-top: 15px;
  }
`;

export const MessageText = styled.div`
  width: fit-content;
  max-width: 60%;
  display: flex;
  flex-direction: column;
  p{
    margin-left: 10px;  
  }
`;

export const UserMessage = styled.p`
  /* margin-right: 10px; */
  background-color: ${({ pending }) => pending && '#f78b5f !important'};
`;

export const TicketStatus = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  display: inline-block;
      margin-top: 2px;
  margin-right: 10px;
  background: ${({ status }) => [COLOR_BY_STATUS[status]]};
`;

export const TicketActionStatus = styled(TicketStatus)`
  margin: 0 5px;
`;

export const TicketActionStatusTitle = styled.span`
  font-weight: 600;
  font-style: italic;
  color: ${({ status }) => [COLOR_BY_STATUS[status]]};
`;

export const TicketRatingScore = styled.span`
  font-weight: 600;
  font-style: italic;
  color: #ffd400;
  font-size: 1.5em;
  margin: 0 5px;
`;

export const UserAction = styled.span`
  font-weight: 600;
  font-style: italic;
  color: ${({ action }) => [COLOR_BY_ACTION[action]]};
`;

export const MessageBoxSystemNotification = styled.span`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: center;
  padding: 1em;
  font-size: 0.85em;
  color: #828282;
  opacity: .7;
  font-style: italic;
`;
export const LineDivider = styled.span`
    display: flex;
    align-items: center;
    flex: 0 0 20%;
    background-color:  ${({ warning }) => warning ? 'red' : '#b9b9b9'};
    justify-content: center;
    font-size: 0.75em;
    color:  ${({ warning }) => warning ? 'red' : '#b9b9b9'};
    margin: 0 2em;
    height: 1px;
    opacity: .7;
`;

const loading = keyframes`
  0% {
    color: #828282;
  }

  50% {
    color: #ffff;
  }
`;

export const MessageBoxItemIsTyping = styled(MessageBoxItem)`
  img{
    margin-bottom: 20px;
  }
`;

export const IsTypingWrapper = styled.div`
  animation: ${loading} 2s linear infinite;
  margin-left: 5px;
  ::before{
    content: 'Typing...'
  }
`;

export const ProfileImageStyled = styled.img`
  height: 35px;
  cursor: pointer;
  border-radius: 100%;
`;

export const CommentWrapper = styled.div`
  text-align: center;
  color: #7a7a7a;
  font-weight: 600;
`;

export const UserLabelWarning = styled.div`
  font-weight: 600;
  font-style: italic;
  color: #9a9a9a;
  width: 100%;
  text-align: ${({ user }) => user ? 'end' : 'start'};
`;
