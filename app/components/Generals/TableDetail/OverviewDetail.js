import React, { Component } from 'react';
import { object, any, bool } from 'prop-types';
import {
  OverviewProduct,
  OverviewLabel,
  OverviewValue,
} from 'components/Generals/ItemDetail.styled';

// eslint-disable-next-line react/prefer-stateless-function
class OverviewDetail extends Component {
  static propTypes = {
    label: object.isRequired,
    value: any,
    isLink: bool,
  }

  render() {
    const { label, value, isLink = false } = this.props;
    return (
      <OverviewProduct link={isLink}>
        <OverviewLabel>{label}</OverviewLabel>
        <OverviewValue>{value instanceof Array ? value.join(', ') || '-' : (value || '-')}</OverviewValue>
      </OverviewProduct>
    );
  }
}

export default OverviewDetail;
