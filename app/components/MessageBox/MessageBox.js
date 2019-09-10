import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { EditorState } from 'draft-js';
import {
  Form, Icon,
} from 'antd';
import _isEmpty from 'lodash/isEmpty';
import { Translation } from 'react-i18next';
import { Formik } from 'formik';
import ShadowScrollbars from 'components/Scrollbar';
import {
  MessageBoxWrapper,
  MessageBoxContent,
  MessageBoxItem,
  ConversationHeaderTitle,
  MessageInputWrapper,
  MessageActionWrapper,
  MessageInput,
  MessageEmpty,
  InputAction,
  ConversationTitle,
  RatingWrapper,
  RatingContent,
  CommentInputWrapper,
  TicketStatus,
  MessageBoxSystemNotification,
  FindAgentButton,
  FindAgentWrapper,
} from './styles';
import LoadingSpin from '../Loading';
import ConversationDetail from '../ConversationDetail/ConversationDetail';
import { REPLY_TYPE, CLOSED_TICKET_STATUSES, TICKET_STATUS } from '../../../common/enums';
import FormInput from '../FormInput/FormInput';
import {
  shouldShowSystemMessage, isAgent, toI18n, combineChat,
} from '../../utils/func-utils';
import { ProfileImageStyled } from '../TopNavBar/TopNavBar.styled';
import {
  userChat, otherChat, otherTyping, botChat, ticketStatus, userAction, ticketRating,
} from '../ChatItem';
import RichEditor from '../FormInput/RichEditor/RichEditor';
import { clearEditorContent } from '../../api/utils';
import { ButtonPrimary } from '../../stylesheets/Button.style';
import CreateFeedbackForm from '../../containers/CreateFeedbackForm';
import TicketPayment from '../../containers/TicketPayment';

const scrollStyle = {
  flex: 'auto',
  width: '100%',
};

const initialValues = {
  content: EditorState.createEmpty(),
};

export default class MessageBox extends Component {
  messagesEndRef = React.createRef();

  static propTypes = {
    cannedResponses: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
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
    fetchCannedResponseForUser: PropTypes.func.isRequired,
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

  state = {
    content: EditorState.createEmpty(),
    feedbackFormIsOpen: false,
  }

  toggleFeedbackForm = (toggle) => {
    this.setState({
      feedbackFormIsOpen: toggle,
    });
  }

  componentDidMount() {
    const { fetchCannedResponseForUser } = this.props;
    fetchCannedResponseForUser({});
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
    <Translation>
      {
        t => (
          <MessageBoxItem left key="solution">
            <ProfileImageStyled
              src="/assets/images/mia-avatar.jpg"
              onClick={this.onToggleUserInfo}
            />
            <FindAgentWrapper>
              <p key="solution">
                {t('CONV_MESSAGE_BOX_NOT_SATISFY')}
              </p>
              <FindAgentButton
                key="button"
                type="primary"
                onClick={this.handleFindAgent}
              >
                <Icon type="search" />
                {t('CONV_MESSAGE_BOX_FIND_AGENT')}
              </FindAgentButton>
            </FindAgentWrapper>
          </MessageBoxItem>
        )
      }
    </Translation>
  )

  renderOtherUserMessageContent = (msgId, contents) => {
    const { userRole } = this.props;
    const src = isAgent(userRole) ? '/assets/images/user-live.jpeg' : '/assets/images/user.svg';
    return otherChat(msgId, contents, src);
  }

  renderOtherUserTypingContent = () => {
    const { otherUserTyping, conversationId } = this.props;
    const { conversationId: _id, messages = '' } = otherUserTyping || {};
    if (!_isEmpty(otherUserTyping)
      && _id === conversationId
      && !_isEmpty(messages.trim())
    ) {
      return otherTyping(messages);
    }
    return false;
  }

  renderMessageContent = () => {
    const {
      replyMessages, userId, userRole,
    } = this.props;
    const refinedMessages = combineChat(replyMessages);
    return [refinedMessages.map(({
      from, _id: msgId, contents, type, params, sentAt,
    }) => {
      switch (type) {
        case REPLY_TYPE.TICKET_STATUS:
          return ticketStatus(msgId, params, sentAt);
        case REPLY_TYPE.USER_ACTION:
          return userAction(msgId, from, params, sentAt);
        case REPLY_TYPE.BOT_RESPONSE:
          return botChat(msgId, contents);
        case REPLY_TYPE.RATING_ACTION:
          return ticketRating(msgId, from, params, sentAt);
        case REPLY_TYPE.USER_NORMAL:
          if (from._id === userId) {
            return userChat(msgId, contents, false, isAgent(userRole));
          }
          return this.renderOtherUserMessageContent(msgId, contents, from);
        default: return null;
      }
    }),
    this.renderOtherUserTypingContent(),
    ];
  }

  renderPendingMessageContent = () => {
    const { sendingMessages } = this.props;
    if (!sendingMessages || !sendingMessages.length) return null;

    return combineChat(sendingMessages).map(({ id: msgId, contents }) => userChat(msgId, contents, true));
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

  handleChatSubmit = () => {
    const {
      sendReplyMessage, conversationId, userTyping, userRole,
    } = this.props;
    const { content } = this.state;
    const trimmedContent = content.getCurrentContent().getPlainText().trim();
    if (trimmedContent) {
      sendReplyMessage(conversationId, trimmedContent);
      if (!isAgent(userRole)) {
        userTyping(conversationId, '');
      }
      this.formik.getFormikContext().resetForm();
      this.setState({
        content: clearEditorContent(content),
      });
    }
  }

  handleFindAgent = () => {
    const { findAgentRequest, conversationId } = this.props;

    findAgentRequest(conversationId);
  }

  handleTyping = (content) => {
    const { userTyping, conversationId, userRole } = this.props;
    if (!isAgent(userRole)) {
      const textValue = content.getCurrentContent().getPlainText();
      userTyping(conversationId, textValue);
    }
  }

  handleChangeContent = (content) => {
    this.setState({
      content,
    });
    this.handleTyping(content);
  }

  renderMessageInput = () => {
    const { cannedResponses } = this.props;
    const { content } = this.state;
    return (
      <Formik
        ref={(formik) => { this.formik = formik; }}
        initialValues={initialValues}
        onSubmit={this.handleChatSubmit}
      >
        {({ handleSubmit }) => (
          <Form
            onSubmit={handleSubmit}
          >
            <MessageInputWrapper>
              <RichEditor
                mentions={cannedResponses.map(({ shortcut: title, content: name }) => ({
                  title,
                  name,
                }))}
                onChange={this.handleChangeContent}
                editorState={content}
                handleReturn={handleSubmit}
              />
              {this.renderGroupAction()}
              <InputAction onClick={handleSubmit} className="mia-enter" />
            </MessageInputWrapper>
          </Form>
        )}
      </Formik>
    );
  }


  renderMessageHeader = () => {
    const { currentTicket } = this.props;
    const { title, status } = currentTicket || {};
    return (
      <ConversationHeaderTitle>
        <ConversationTitle>
          <TicketStatus status={status} />
          <span>{title}</span>
          <ButtonPrimary
            type="primary"
            onClick={() => this.toggleFeedbackForm(true)}
          >
            <Icon type="form" />
            Feedback
          </ButtonPrimary>
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
    const { submitRating, currentTicket } = this.props;
    const { _id } = currentTicket;
    submitRating(_id, values);
  }

  renderRating = () => {
    const { currentConversation } = this.props;
    const { rating } = currentConversation;
    return (
      <RatingWrapper>
        <RatingContent>
          <h2>
            {toI18n('CONV_MESSAGE_BOX_RATE_YOUR_EXPERIENCE')}
          </h2>
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

  renderMessageBoxFooter = () => {
    const {
      currentTicket, userRole,
    } = this.props;
    const { status, rating, assignee } = currentTicket || {};
    if (CLOSED_TICKET_STATUSES.includes(status)) {
      if (!isAgent(userRole) && !rating && assignee) {
        return this.renderRating();
      }
      return (
        <MessageBoxSystemNotification>
          {toI18n('CONV_MESSAGE_BOX_TICKET_CLOSED')}
        </MessageBoxSystemNotification>
      );
    }
    return this.renderMessageInput();
  }

  renderMessageBoxContent = () => {
    const {
      otherUserTyping,
      replyMessages, currentTicket, systemMessage,
      conversationId, solutionFound, userRole,
    } = this.props;
    const hasChatData = !_isEmpty(replyMessages)
      || shouldShowSystemMessage(systemMessage, conversationId)
      || !_isEmpty(otherUserTyping);
    const { assignee, status } = currentTicket || {};
    return (
      <>
        <ShadowScrollbars
          autoHide
          style={scrollStyle}
        >
          {!hasChatData
            ? <MessageEmpty>{toI18n('CONV_MESSAGE_BOX_NO_CHAT_DATA')}</MessageEmpty>
            : this.renderMessageContent()
          }
          {solutionFound
            && status === TICKET_STATUS.OPEN
            && !isAgent(userRole)
            && _isEmpty(assignee)
            && this.renderFindAgentForSolution()}
          {this.renderPendingMessageContent()}
          <div ref={this.messagesEndRef} />
        </ShadowScrollbars>
        {this.renderMessageBoxFooter()}
      </>
    );
  }


  render() {
    const { feedbackFormIsOpen } = this.state;
    const {
      isFetchingReplies, isFindingAgent, currentTicket,
    } = this.props;
    const { _id } = currentTicket || {};
    return (
      <LoadingSpin loading={isFetchingReplies || isFindingAgent}>
        {this.renderMessageHeader()}
        <MessageBoxWrapper>
          <MessageBoxContent>
            {this.renderMessageBoxContent()}
          </MessageBoxContent>
          <ConversationDetail ticket={currentTicket} />
          <CreateFeedbackForm
            ticketId={_id}
            isOpen={feedbackFormIsOpen}
            handleCancel={() => this.toggleFeedbackForm(false)}
          />
        </MessageBoxWrapper>
        <TicketPayment isOpen />
      </LoadingSpin>
    );
  }
}
