import React, { Component } from 'react';
import { PageTitle, PageWrapper } from './styles';
import ConvertRate from '../../containers/ConvertRate';
import { toI18n } from '../../utils/func-utils';

// eslint-disable-next-line react/prefer-stateless-function
class System extends Component {
  render() {
    return (
      <PageWrapper>
        <PageTitle>
          {toI18n('SYSTEM_TITLE')}
        </PageTitle>
        <ConvertRate />
      </PageWrapper>
    );
  }
}

export default System;
