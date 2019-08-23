import React, { Component } from 'react';
import { Icon } from 'antd';
import IntentManagement from '../../containers/IntentManagement';
import {
  IntentManagementWrapper, IntentPageWrapper,
  IntentDetailWrapper, IntentHeaderWrapper, AddResponseButton,
} from './styles';
import IntentDetail from '../../containers/IntentDetail/IntentDetail';
import AddResponseModal from '../../containers/AddResponseModal';
class IntentManagementPage extends Component {
  state = {
    createResponseModalVisible: false,
  }

  toggleCreateResponseModal = (isOpen) => {
    this.setState({
      createResponseModalVisible: isOpen,
    });
  }

  render() {
    const { createResponseModalVisible } = this.state;
    return (
      <IntentPageWrapper>
        <IntentManagementWrapper>
          <IntentManagement />
        </IntentManagementWrapper>
        <IntentDetailWrapper>
          <IntentHeaderWrapper>
            <h2>RESPONSES</h2>
            <AddResponseButton onClick={() => this.toggleCreateResponseModal(true)}>
              <Icon type="plus" />
            </AddResponseButton>
          </IntentHeaderWrapper>
          <IntentDetail />
        </IntentDetailWrapper>
        <AddResponseModal
          isOpen={createResponseModalVisible}
          handleClose={() => this.toggleCreateResponseModal(false)}
        />
      </IntentPageWrapper>
    );
  }
}

export default IntentManagementPage;
