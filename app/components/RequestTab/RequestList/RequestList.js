import React, { PureComponent } from 'react';
import { func, arrayOf, shape } from 'prop-types';
import _isEmpty from 'lodash/isEmpty';
import RequestItem from '../RequestItem/RequestItem';
import { NoRequestNotify } from './styles';
import { toI18n } from '../../../utils/func-utils';

export class RequestList extends PureComponent {
  static propTypes = {
    requestList: arrayOf(shape()).isRequired,
    onAccept: func.isRequired,
    onCancel: func.isRequired,
  }

  render() {
    const { onAccept, onCancel, requestList } = this.props;
    return (
      <div>
        {_isEmpty(requestList) ? (
          <NoRequestNotify>
            {toI18n('DB_NO_REQUEST_AVAIABLE')}
          </NoRequestNotify>
        ) : requestList.map((request, index) => (
          <RequestItem
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            request={request}
            onAccept={onAccept}
            onCancel={onCancel}
          />
        ))}

      </div>
    );
  }
}

export default RequestList;
