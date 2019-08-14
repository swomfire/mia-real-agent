import { Divider } from 'antd';
import { DefaultButton } from 'components/Generals/General.styled';
import styled, { css, keyframes } from 'styled-components';
import FormInput from '../FormInput/FormInput';
import { COLOR_BY_STATUS } from '../../../common/enums';

export const MessageBoxWrapper = styled.div`
  display: flex;
  height: calc(100vh - 130px);
  background: ${props => props.theme.secondaryColor};
  position: relative;
`;

export const MessageBoxContent = styled.div`
  flex: 1;
  height: 100%;
  background-color: #f5f6f7;
`;

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
      background-color: #e2e2e2;
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
      color: ${props => props.theme.secondaryColor};
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

export const ConversationHeaderTitle = styled.div`
  display: flex;
  flex-direction: column;
  .ant-breadcrumb-link {
    color: ${props => props.theme.textColor};
  }

`;

export const ConversationTitle = styled.div`
  padding: 1.2em 1em;
  max-height: 60px;
  display: flex;
  background-color: #fff;
  border-bottom: 1px solid #d9d9d9;
  align-items: center;
  justify-content: center;
  button {
    font-size: .85em;
    border-radius: .3em;
  }
`;

export const ConversationTitleInfo = styled.div`
  flex: 1;
  align-items: center;
  justify-content: center;
  display: flex;
  span{
    font-size: 1.3em;
    margin: 0 .5em;
    font-weight: 600;
  }
`;
export const MessageText = styled.div`
  width: fit-content;
  max-width: 60%;
  display: flex;
  flex-direction: column;
`;

export const UserMessage = styled.p`
  background-color: ${({ pending }) => pending && '#f78b5f !important'};
`;

export const MessageInputWrapper = styled.div`
  /* position: absolute; */
  bottom: 0px;
  display: flex;
  align-items: center;
  background-color: ${props => props.theme.secondaryColor};
  border-top: 1px solid #ddd;
  height: 60px;
  width: 100%;
  padding: 0px 1em;

  .ant-form-item{
    width: 100%;
    margin: 0;
    input{
      outline: none !important;
      border: 1px solid transparent !important;
    }
  }
  button{
    margin-left: 10px;
  }
`;

export const MessageActionWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  padding: 12px 0px;
`;

export const MessageInput = styled(FormInput)`
  flex: 1;
  border: none;
  height: 100%;
  &::placeholder {
    font-style: normal;
    color: #ccc;
  }
`;

export const MessageEmpty = styled.div`
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const InputAction = styled.label`
  margin-left: 15px;
  font-size: 22px !important;
  color: #b5b5b5;
  cursor: pointer;
  &:hover {
    color: ${props => props.theme.textColor};
  }
`;

export const InputUpload = styled.input`
  display: none;
`;

export const RatingWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: center;
`;

export const RatingContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
  ul{
    padding-left: 4px; 
  }
`;

export const CommentInputWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: ${props => props.theme.secondaryColor};
  border-top: 1px solid #ddd;
  height: 100px;
  width: 350px;
  padding: 0px 10px;
  margin-top: 10px;
  .ant-form-item{
    width: 100%;
    margin: 0;
    input{
      outline: none !important;
      border: 1px solid transparent !important;
    }
  }
  button{
    margin-left: 10px;
  }
`;

export const TicketStatus = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  display: inline-table;
  background: ${({ status }) => [COLOR_BY_STATUS[status]]};
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
`;
export const LineDivider = styled.span`
    display: flex;
    align-items: center;
    flex: 0 0 20%;
    background-color: #828282;
    justify-content: center;
    font-size: 0.75em;
    color: #828282;
    margin: 0 2em;
    height: 1px;
    opacity: .7;
}
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
  .ant-avatar{
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

export const FindAgentButton = styled(DefaultButton)`
  border-radius: 15px;
  margin-left: 10px;
  margin-right: -8px;
  padding: 3px 10px;
`;
