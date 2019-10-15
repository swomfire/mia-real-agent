import React, { PureComponent } from 'react';
import { func, arrayOf, shape } from 'prop-types';
import _isEmpty from 'lodash/isEmpty';
import SupportItem from '../SupportItem';
import { NoRequestNotify } from './styles';
import { toI18n } from '../../../utils/func-utils';

export class SupportList extends PureComponent {
  static propTypes = {
    supportList: arrayOf(shape()).isRequired,
    onAccept: func.isRequired,
    onCancel: func.isRequired,
  }

  render() {
    const { onAccept, onCancel, supportList } = this.props;
    return (
      <div>
        {
          _isEmpty(supportList) ? (
            <NoRequestNotify>
              {toI18n('DB_NO_REQUEST_AVAIABLE')}
            </NoRequestNotify>
          ) : supportList.map(support => (
            <SupportItem
              support={support}
              onAccept={onAccept}
              onCancel={onCancel}
            />
          ))
        }
      </div>
    );
  }
}

export default SupportList;
