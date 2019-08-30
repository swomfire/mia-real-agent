import React from 'react';
import PropTypes from 'prop-types';
import {
  ItemDetailListItem,
  ItemDetailInput,
  ItemDetailName,
  ItemStatus,
} from 'components/Generals/ItemDetail.styled';
import history from 'utils/history';

class UserListItem extends React.PureComponent {
  onClick = () => {
    const {
      item: { _id },
    } = this.props;

    history.push(`/admin/tickets-warning/${_id}`);
  };

  render() {
    const { item: ticket, active } = this.props;
    const { title, status } = ticket;

    return (
      <ItemDetailListItem active={active} onClick={this.onClick}>
        <ItemDetailInput>
          <input type="checkbox" />
        </ItemDetailInput>
        <ItemDetailName>
          {title}
          <ItemStatus>
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
