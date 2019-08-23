import React from 'react';
import IntentManagement from '../../containers/IntentManagement';
import { IntentManagementWrapper, IntentPageWrapper, IntentDetailWrapper, IntentHeaderWrapper } from './styles';
import IntentDetail from '../../containers/IntentDetail/IntentDetail';

const IntentManagementPage = () => (
  <IntentPageWrapper>
    <IntentManagementWrapper>
      <IntentManagement />
    </IntentManagementWrapper>
    <IntentDetailWrapper>
      <IntentHeaderWrapper>
        <h2>RESPONSES</h2>
      </IntentHeaderWrapper>
      <IntentDetail />
    </IntentDetailWrapper>
  </IntentPageWrapper>
);

export default IntentManagementPage;
