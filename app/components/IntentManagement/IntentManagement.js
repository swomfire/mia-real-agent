import React, { Component } from 'react';
import _isEmpty from 'lodash/isEmpty';
import { shape } from 'prop-types';
import IntentList from '../../containers/IntentList';
import {
  IntentPageWrapper,
  IntentDetailWrapper, PleaseSelectIntent,
} from './styles';
import {
  ItemDetailListWrapper,
  AdminDetailsContainer,
  TitleDetailsHead,
  AdminHeadActionGroup,
  HeaderTextDetails,
} from '../Generals/ItemDetail.styled';
import { ButtonApprove } from '../../stylesheets/Button.style';
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
        <ItemDetailListWrapper>
          <IntentList />
        </ItemDetailListWrapper>
        <AdminDetailsContainer>
          {_isEmpty(currentIntent) ? (
            <PleaseSelectIntent>{toI18n('ADMIN_INTENT_DETAIL_PLEASE_SELECT_AN_INTENT')}</PleaseSelectIntent>
          )
            : (
              <div>
                <TitleDetailsHead>
                  <HeaderTextDetails>
                    <span>
                      {toI18n('ADMIN_INTENT_DETAIL_TITLE')}
                      {' '}
                      {currentIntent.displayName}
                    </span>
                  </HeaderTextDetails>
                  <AdminHeadActionGroup>
                    <ButtonApprove
                      onClick={() => this.toggleCreateResponseModal(true)}
                    >
                      <i className="mia-add" />
                      <span>Add New</span>
                    </ButtonApprove>
                  </AdminHeadActionGroup>
                </TitleDetailsHead>
                <IntentDetailWrapper>
                  <IntentDetail />
                </IntentDetailWrapper>
              </div>
            )}
          <AddResponseModal
            isOpen={createResponseModalVisible}
            handleClose={() => this.toggleCreateResponseModal(false)}
          />
        </AdminDetailsContainer>
      </IntentPageWrapper>
    );
  }
}

export default IntentManagementPage;
