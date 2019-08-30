import React from 'react';
import PropTypes from 'prop-types';
import {
  ItemDetailListItem,
  ItemDetailName,
  ItemStatus,
  ItemsListsName,
} from 'components/Generals/ItemDetail.styled';
import history from 'utils/history';

class UserListItem extends React.PureComponent {
  onClick = () => {
    const {
      item: { _id },
    } = this.props;

    history.push(`/admin/applications/${_id}`);
  };

  render() {
    const { item: application, active } = this.props;
    const { firstName, lastName, status } = application;

    return (
      <ItemDetailListItem active={active} onClick={this.onClick}>
        <ItemDetailName>
          <ItemsListsName>
            {`${firstName} ${lastName}`}
          </ItemsListsName>
          <ItemStatus status={status}>
            {status}
          </ItemStatus>
        </ItemDetailName>
      </ItemDetailListItem>
    );
  }
}

UserListItem.propTypes = {
  active: PropTypes.bool.isRequired,
  item: PropTypes.object.isRequired,
};

export default UserListItem;
