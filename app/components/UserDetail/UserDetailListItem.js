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

    history.push(`/admin/user/${_id}`);
  };

  render() {
    const { item: user, active } = this.props;
    const { username, role } = user;

    return (
      <ItemDetailListItem active={active} onClick={this.onClick}>
        <ItemDetailName>
          <ItemsListsName>
            {username}
          </ItemsListsName>
          <ItemStatus>
            {role}
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
