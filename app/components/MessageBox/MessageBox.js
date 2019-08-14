import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Avatar,
  Button, Form,
} from 'antd';
import _isEmpty from 'lodash/isEmpty';
import { Formik } from 'formik';
import ShadowScrollbars from 'components/Scrollbar';
import {
  MessageBoxWrapper,
  MessageBoxContent,
  MessageBoxItem,
  ConversationHeaderTitle,
  MessageText,
  MessageInputWrapper,
  MessageActionWrapper,
  MessageInput,
  MessageEmpty,
  InputAction,
  UserMessage,
  ConversationTitle,
  ConversationTitleInfo,
  RatingWrapper,
  LineDivider,
  RatingContent,
  CommentInputWrapper,
  TicketStatus,
  MessageBoxSystemNotification,
  IsTypingWrapper,
  MessageBoxItemIsTyping,
  FindAgentButton,
} from './styles';
import LoadingSpin from '../Loading';
import ConversationDetail from '../ConversationDetail/ConversationDetail';
import { TICKET_STATUS } from '../../../common/enums';
import FormInput from '../FormInput/FormInput';
import { insertSystemMessageToRepliesChat, combineChat } from './utils';
import { shouldShowSystemMessage, isAgent } from '../../utils/func-utils';

const scrollStyle = {
  height: 'calc(100% - 60px)',
  width: '100%',
};

const initialValues = {
  content: '',
};

export default class MessageBox extends Component {
  messagesEndRef = React.createRef();

  static propTypes = {
    userId: PropTypes.string.isRequired,
    conversationId: PropTypes.string,
    systemMessage: PropTypes.object,
    currentConversation: PropTypes.object,
    currentTicket: PropTypes.object,
    isFetchingReplies: PropTypes.bool,
    solutionFound: PropTypes.bool,
    isFindingAgent: PropTypes.bool,
    replyMessages: PropTypes.arrayOf(PropTypes.shape()),
    sendingMessages: PropTypes.arrayOf(PropTypes.shape()),
    sendingMessageErrors: PropTypes.objectOf(PropTypes.any),
    otherUserTyping: PropTypes.object,

    findAgentRequest: PropTypes.func.isRequired,
    sendReplyMessage: PropTypes.func.isRequired,
    setCurrentTicket: PropTypes.func.isRequired,
    joinConversation: PropTypes.func.isRequired,
    leftConversation: PropTypes.func.isRequired,
    userTyping: PropTypes.func.isRequired,

    submitRating: PropTypes.func.isRequired,
    userRole: PropTypes.string.isRequired,
  }

  static defaultProps = {
    currentConversation: {},
    currentTicket: {},
    isFetchingReplies: false,
    isFindingAgent: false,
    replyMessages: [],
    conversationId: '',
    sendingMessages: [],
    // sendingMessageErrors: {},
  }

  componentDidUpdate = (prevProps) => {
    this.scrollChatToBottom();
    const {
      conversationId,
      currentConversation, setCurrentTicket, joinConversation, leftConversation,
    } = this.props;
    const { conversationId: prevConversationId } = prevProps;
    if (conversationId !== prevConversationId) {
      joinConversation(conversationId);
      if (prevConversationId) {
        leftConversation(prevConversationId);
      }
    }
    if (!_isEmpty(currentConversation)) {
      const { ticketId: prevTicketId } = prevProps.currentConversation;
      const { ticketId } = currentConversation;
      if (ticketId !== prevTicketId) {
        setCurrentTicket(ticketId);
      }
    }
  }

  renderFindAgentForSolution = () => (
    <MessageBoxItem left key="solution">
      <Avatar icon="user" size={35} />
      <MessageText>
        <p key="solution">
          Not satisfy with MIA solution ?
          <FindAgentButton
            key="button"
            type="primary"
            onClick={this.handleFindAgent}
          >
            Find Agent
          </FindAgentButton>
        </p>
      </MessageText>
    </MessageBoxItem>
  )

  renderOtherUserMessageContent = (msgId, contents) => (
    <MessageBoxItem left key={msgId}>
      <Avatar icon="user" size={35} />
      <MessageText>
        {contents.map(({ _id, messages }) => (<p key={_id}>{messages}</p>))}
      </MessageText>
    </MessageBoxItem>
  )

  renderOtherUserTypingContent = () => {
    const { otherUserTyping, conversationId } = this.props;
    const { conversationId: _id, messages = '' } = otherUserTyping || {};
    if (!_isEmpty(otherUserTyping)
      && _id === conversationId
      && !_isEmpty(messages.trim())
    ) {
      return (
        <MessageBoxItemIsTyping left key={_id}>
          <Avatar icon="user" size={35} />
          <MessageText>
            <p>{messages.trim()}</p>
            <IsTypingWrapper />
          </MessageText>
        </MessageBoxItemIsTyping>
      );
    }
    return false;
  }

  renderUserMessageContent = (msgId, contents, isPending = false) => (
    <MessageBoxItem right key={msgId}>
      <MessageText>
        {contents.map(({ _id, messages }) => (<UserMessage key={_id} pending={isPending}>{messages}</UserMessage>))}
      </MessageText>
      <Avatar icon="user" size={35} />
    </MessageBoxItem>
  )

  renderSystemMessage = () => {
    const { systemMessage, conversationId } = this.props;
    return shouldShowSystemMessage(systemMessage, conversationId) && (
      <MessageBoxSystemNotification>
        <LineDivider />
        {systemMessage.message}
        <LineDivider />
      </MessageBoxSystemNotification>
    );
  }

  renderMessageContent = () => {
    const {
      replyMessages, userId, systemMessage,
    } = this.props;
    const refinedMessages = combineChat(
      insertSystemMessageToRepliesChat(replyMessages, systemMessage)
    );
    return [refinedMessages.map(({
      from, _id: msgId, contents, isSystemMessage,
    }) => {
      if (isSystemMessage) {
        return this.renderSystemMessage();
      }
      if (from === userId) {
        return this.renderUserMessageContent(msgId, contents);
      }
      return this.renderOtherUserMessageContent(msgId, contents);
    }),
    this.renderOtherUserTypingContent(),
    ];
  }

  renderPendingMessageContent = () => {
    const { sendingMessages } = this.props;
    if (!sendingMessages || !sendingMessages.length) return null;

    return combineChat(sendingMessages).map(({ id: msgId, contents }) => this.renderUserMessageContent(msgId, contents, true));
  }

  renderGroupAction = () => (
    <MessageActionWrapper>
      <InputAction className="mia-gallery" htmlFor="file-upload" />
      <InputAction className="mia-folder" htmlFor="file-upload" />
      <InputAction className="mia-camera" />
      <InputAction className="mia-happiness" />
      {/* <InputUpload type="file" id="file-upload" /> */}
    </MessageActionWrapper>
  );

  handleChatSubmit = (values) => {
    const {
      sendReplyMessage, conversationId, userTyping, userRole,
    } = this.props;
    const { content } = values;
    const trimmedContent = content.trim();
    if (trimmedContent) {
      sendReplyMessage(conversationId, trimmedContent);
      if (!isAgent(userRole)) {
        userTyping(conversationId, '');
      }
      this.formik.getFormikContext().resetForm();
    }
  }

  handleFindAgent = () => {
    const { findAgentRequest, conversationId } = this.props;

    findAgentRequest(conversationId);
  }

  handleTyping = (e) => {
    const { userTyping, conversationId, userRole } = this.props;
    if (!isAgent(userRole)) {
      const { value } = e.target;
      userTyping(conversationId, value);
    }
  }

  renderMessageInput = () => (
    <Formik
      ref={(formik) => { this.formik = formik; }}
      initialValues={initialValues}
      onSubmit={this.handleChatSubmit}
    >
      {({ handleSubmit }) => (
        <Form
          onSubmit={handleSubmit}
          onChange={this.handleChangeValues}
        >
          <MessageInputWrapper>
            <MessageInput
              onChange={this.handleTyping}
              type="text"
              name="content"
              placeholder="Type message ..."
              autoComplete="off"
            />
            {this.renderGroupAction()}
            <InputAction onClick={handleSubmit} className="mia-enter" />
          </MessageInputWrapper>
        </Form>
      )}
    </Formik>
  );


  renderMessageHeader = () => {
    const { currentTicket, userRole, isFindingAgent } = this.props;
    const { assignee = {}, title, status } = currentTicket || {};
    return (
      <ConversationHeaderTitle>
        <ConversationTitle>
          <TicketStatus status={status} />
          <span>{title}</span>
        </ConversationTitle>
      </ConversationHeaderTitle>
    );
  }

  scrollChatToBottom() {
    const { current } = this.messagesEndRef;
    if (current) {
      current.scrollIntoView({ behavior: 'smooth' });
    }
  }

  handleSubmitRating = (values) => {
    const { submitRating, currentConversation } = this.props;
    const { _id } = currentConversation;
    submitRating(_id, values);
  }

  renderRating = () => {
    const { currentConversation } = this.props;
    const { rating } = currentConversation;
    return (
      <RatingWrapper>
        <RatingContent>
          <h2>Rate your experience</h2>
          <Formik
            ref={(formik) => { this.ratingFormik = formik; }}
            initialValues={rating}
            onSubmit={this.handleSubmitRating}
          >
            {({ handleSubmit }) => (
              <Form
                onSubmit={handleSubmit}
                onChange={this.handleChangeValues}
              >
                <FormInput type="rate" name="score" />
                <CommentInputWrapper>
                  <MessageInput type="text" name="comment" placeholder="Type comment ..." autoComplete="off" />
                  <InputAction onClick={handleSubmit} className="mia-enter" />
                </CommentInputWrapper>
              </Form>
            )}
          </Formik>
        </RatingContent>
      </RatingWrapper>
    );
  }


  render() {
    const {
      isFetchingReplies, isFindingAgent, otherUserTyping,
      replyMessages, currentTicket, systemMessage,
      conversationId, solutionFound, userRole,
    } = this.props;
    const { status, assignee } = currentTicket || {};
    const hasChatData = !_isEmpty(replyMessages)
      || shouldShowSystemMessage(systemMessage, conversationId)
      || !_isEmpty(otherUserTyping);
    return (
      <LoadingSpin loading={isFetchingReplies || isFindingAgent}>
        {this.renderMessageHeader()}
        <MessageBoxWrapper>
          <MessageBoxContent>
            {/* {status === TICKET_STATUS.CLOSED ? this.renderRating()
              : ( */}
            <>
              <ShadowScrollbars
                autoHide
                style={scrollStyle}
              >
                {!hasChatData
                  ? <MessageEmpty>No Chat Data</MessageEmpty>
                  : this.renderMessageContent()
                }
                {solutionFound && !isAgent(userRole) && _isEmpty(assignee)
                  && this.renderFindAgentForSolution()}
                {this.renderPendingMessageContent()}
                <div ref={this.messagesEndRef} />
              </ShadowScrollbars>
              {status === TICKET_STATUS.CLOSED ? (
                <MessageBoxSystemNotification>
                  Ticket Closed
                </MessageBoxSystemNotification>
              ) : this.renderMessageInput()
              }
            </>
            {/* )} */}
          </MessageBoxContent>
          <ConversationDetail ticket={currentTicket} />
        </MessageBoxWrapper>
      </LoadingSpin>
    );
  }
}
