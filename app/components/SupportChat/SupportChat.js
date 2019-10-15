import ShadowScrollbars from 'components/Scrollbar';
import _isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { toI18n, isAgent, combineChat } from '../../utils/func-utils';
import { EmptyMessageNotify, SupportChatMessageWrapper } from './styles';
import { REPLY_TYPE } from '../../../common/enums';
import { userAction, userChat, otherChat } from '../ChatItem';

const scrollStyle = {
  flex: 'auto',
  width: '100%',
};

const own = {
  type: 'USER_NORMAL',
  status: 'PENDING',
  _id: '5da42b7808bceb36cbbf1944',
  from: {
    profile: {
      companyFields: [],
      firstName: 'agent',
      lastName: 'mia',
    },
    role: 'Dedicated',
    _id: '5da3e860c40fd8229e8f79fa',
    username: 'agent@gmail.com',
    application: {
      billingRate: 0,
      _id: '5da3e4dc7e6e8d1394ddb93b',
      nickname: 'the only one',
    },
  },
  conversationId: '5da3e87bc40fd8229e8f79fd',
  messages: 'dmm',
  sentAt: '2019-10-14T08:02:00.601Z',
};

const msg = {
  type: 'USER_NORMAL',
  status: 'PENDING',
  _id: '5da3ead55518702b462adc6b',
  from: {
    profile: {
      companyFields: [],
      firstName: 'Genevieve',
      lastName: 'Edwards',
      company: 'Castillo and Talley Plc',
      position: '',
      dateOfBirth: '1997-09-08T00:00:00.000Z',
      address: 'Odio mollitia sed te',
      phone: '+1 (496) 773-3448',
    },
    role: 'individual',
    _id: '5d9f0b546becf624b9973b0d',
    username: 'user',
  },
  conversationId: '5da3e87bc40fd8229e8f79fd',
  messages: 'yo',
  sentAt: '2019-10-14T03:26:13.276Z',
};

const action = {
  type: 'USER_ACTION',
  status: 'PENDING',
  _id: '5da422e308bceb36cbbf1926',
  conversationId: '5da3e87bc40fd8229e8f79fd',
  from: {
    profile: {
      companyFields: [],
      firstName: 'Genevieve',
      lastName: 'Edwards',
      company: 'Castillo and Talley Plc',
      position: '',
      dateOfBirth: '1997-09-08T00:00:00.000Z',
      address: 'Odio mollitia sed te',
      phone: '+1 (496) 773-3448',
    },
    role: 'individual',
    _id: '5d9f0b546becf624b9973b0d',
    username: 'user',
  },
  messages: 'User Action',
  params: {
    action: 'Request Agent',
  },
  sentAt: '2019-10-14T07:25:23.308Z',
};

const list = [
  msg,
  action,
  msg,
  msg,
  own,
  own,
  msg,
  msg,
  msg,
];

class SupportChat extends Component {
  messagesAnchor = React.createRef();

  // state = {
  //   otherProfile: null,
  // }

  static propTypes = {
    userId: PropTypes.string.isRequired,
    // currentTicket: PropTypes.shape(),
    // conversationId: PropTypes.string,
    messages: PropTypes.arrayOf(PropTypes.shape()),
    // sendingMessages: PropTypes.arrayOf(PropTypes.shape()),
    userRole: PropTypes.string.isRequired,
    // solutionFound: PropTypes.bool,
  }

  scrollChatToBottom = () => {
    const { current } = this.messagesAnchor || {};
    if (current) {
      current.scrollIntoView({ behavior: 'smooth' });
    }
  }

  componentDidMount = () => {
    this.scrollChatToBottom();
  }

  // componentDidUpdate = (prevProps) => {
  //   const {
  //     replyMessages, sendingMessages,
  //   } = this.props;

  //   if (prevProps.replyMessages.length !== replyMessages.length
  //     || prevProps.sendingMessages.length !== sendingMessages.length) {
  //     this.scrollChatToBottom();
  //   }
  // }

  renderOtherUserMessageContent = (msgId, contents) => otherChat(msgId, contents);

  renderMessageContent() {
    const {
      messages = list, userId, userRole,
    } = this.props;
    const refinedMessages = combineChat(messages);
    return [refinedMessages.map(({
      from, _id: msgId, contents, type, params, sentAt,
    }) => {
      const id = `message[${msgId}]`;
      switch (type) {
        case REPLY_TYPE.USER_ACTION:
          return userAction(id, from, params, sentAt);
        case REPLY_TYPE.USER_NORMAL:
          if (from._id === userId) {
            return userChat(id, contents, false, isAgent(userRole));
          }
          return this.renderOtherUserMessageContent(id, contents);
        default: return null;
      }
    }),
    ];
  }

  render = () => {
    const {
      messages = list,
    } = this.props;
    return (
      <ShadowScrollbars
        autoHide
        style={scrollStyle}
      >
        {_isEmpty(messages)
          ? <EmptyMessageNotify>{toI18n('CONV_MESSAGE_BOX_NO_CHAT_DATA')}</EmptyMessageNotify>
          : (
            <SupportChatMessageWrapper>
              {this.renderMessageContent()}
            </SupportChatMessageWrapper>
          )
        }
        <div ref={this.messagesAnchor} />
      </ShadowScrollbars>
    );
  }
}

export default SupportChat;
