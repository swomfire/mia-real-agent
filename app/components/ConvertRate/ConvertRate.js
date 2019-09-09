import React, { Component } from 'react';
import {
  shape, func, bool, string,
} from 'prop-types';
import EditableField from '../EditableField';
import {
  ContentLabel, ContentWrapper,
  ContentValue, ConvertRateWrapper,
} from './styles';
import { toI18n } from '../../utils/func-utils';

class ConvertRate extends Component {
  static propTypes = {
    system: shape().isRequired,
    updateSystem: func.isRequired,
    isUpdating: bool,
    updateError: string,
  }

  onEditConvertRate = (value) => {
    const { updateSystem } = this.props;
    updateSystem({ exchangeRate: value });
  }

  render() {
    const { system, isUpdating, updateError } = this.props;
    const { exchangeRate } = system;
    return (
      <ConvertRateWrapper>
        <ContentWrapper>
          <ContentLabel>
            {toI18n('CONVERT_RATE_EXCHANGE_RATE')}
          </ContentLabel>
          <ContentValue>
            <EditableField
              value={exchangeRate}
              isSubmitting={isUpdating}
              submitError={updateError}
              format="$1 = {{value}}m"
              type="number"
              onSubmit={this.onEditConvertRate}
            />
          </ContentValue>
        </ContentWrapper>
      </ConvertRateWrapper>
    );
  }
}

export default ConvertRate;
