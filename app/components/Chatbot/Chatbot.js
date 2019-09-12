/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Translation } from 'react-i18next';
import {
  Layout, Input, Tabs,
} from 'antd';
import _get from 'lodash/get';
import MessageBoxContainer from '../../containers/MessageBox';
import {
  ChatbotWrapper,
  ChatbotContentWrapper,
  ConversationHeaderWrapper,
} from './Chatbot.styled';

const { Content } = Layout;
const { Search } = Input;
const { TabPane } = Tabs;

export default class ChatbotComponent extends Component {
  static propTypes = {
    currentConversation: PropTypes.objectOf(PropTypes.any),
    selectConversation: PropTypes.func.isRequired,
  }

  static defaultProps = {
    currentConversation: null,
  }

  componentDidMount = () => {
    const { currentConversation, selectConversation } = this.props;
    const id = _get(this.props, 'match.params.id', null);

    if (!currentConversation) {
      selectConversation(id);
      return;
    }

    // const ticketId = _get(this.props, 'match.params.ticketId', null);

    // eslint-disable-next-line no-underscore-dangle
    if (id !== currentConversation._id) {
      selectConversation(id);
    }
  }

  renderSearchConversation = () => (
    <ConversationHeaderWrapper search>
      <Translation>
        {
          t => (
            <Search
              placeholder={t('SEARCH')}
            />
          )
        }
      </Translation>
    </ConversationHeaderWrapper>
  );

  renderTabItem = () => (
    <Tabs defaultActiveKey="1">
      <TabPane tab="Detail" key="1" />
      <TabPane tab="List" key="2" />
    </Tabs>
  )

  render() {
    const { currentConversation } = this.props;

    return (
      <ChatbotWrapper>
        <ChatbotContentWrapper>
          <Content>
            <MessageBoxContainer ticket={currentConversation} />
          </Content>
        </ChatbotContentWrapper>
      </ChatbotWrapper>
    );
  }
}
