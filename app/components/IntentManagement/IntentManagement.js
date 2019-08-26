import React, { Component } from 'react';
import { Icon } from 'antd';
import _isEmpty from 'lodash/isEmpty';
import { shape } from 'prop-types';
import IntentList from '../../containers/IntentList';
import {
  IntentManagementWrapper, IntentPageWrapper,
  IntentDetailWrapper, IntentHeaderWrapper, AddResponseButton, PleaseSelectIntent,
} from './styles';
import IntentDetail from '../../containers/IntentDetail/IntentDetail';
import AddResponseModal from '../../containers/AddResponseModal';
import { toI18n } from '../../utils/func-utils';
class IntentManagementPage extends Component {
  state = {
    createResponseModalVisible: false,
  }

  static propTypes = {
    currentIntent: shape(),
  }

  toggleCreateResponseModal = (isOpen) => {
    this.setState({
      createResponseModalVisible: isOpen,
    });
  }

  render() {
    const { createResponseModalVisible } = this.state;
    const { currentIntent } = this.props;
    return (
      <IntentPageWrapper>
        <IntentManagementWrapper>
          <IntentList />
        </IntentManagementWrapper>
        {_isEmpty(currentIntent) ? (
          <PleaseSelectIntent>{toI18n('ADMIN_INTENT_DETAIL_PLEASE_SELECT_AN_INTENT')}</PleaseSelectIntent>
        )
          : (
            <IntentDetailWrapper>
              <IntentHeaderWrapper>
                <h2>
                  {toI18n('ADMIN_INTENT_DETAIL_TITLE')}
                  {' '}
                  {currentIntent.displayName}
                </h2>
                <AddResponseButton onClick={() => this.toggleCreateResponseModal(true)}>
                  <Icon type="plus" />
                </AddResponseButton>
              </IntentHeaderWrapper>
              <IntentDetail />
            </IntentDetailWrapper>
          )}
        <AddResponseModal
          isOpen={createResponseModalVisible}
          handleClose={() => this.toggleCreateResponseModal(false)}
        />
      </IntentPageWrapper>
    );
  }
}

export default IntentManagementPage;
