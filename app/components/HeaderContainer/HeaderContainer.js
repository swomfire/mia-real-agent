/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';
import SortContainer from 'containers/HeaderContainer/SortContainer';
import FilterContainer from './FilterContainer';
import {
  TableHeaderWrapper,
  TableHeaderLeftWrapper,
  TableHeaderRightWrapper,
  TableHeaderAddNewButton,
  TableHeaderSortButton,
  TableHeaderLeftTitle,
} from '../Generals/TableHeader.styled';
import { PopupOverlayStyled } from '../Generals/General.styled';

class HeaderContainer extends PureComponent {
  state = {
    isSortOpen: false,
    isFilterOpen: false,
  };

  onToggleSort = () => {
    const { isSortOpen } = this.state;
    this.setState({
      isSortOpen: !isSortOpen,
    });
  };

  onToggleFilter = () => {
    this.setState(prevState => ({
      isFilterOpen: !prevState.isFilterOpen,
    }));
  };

  openSendEmailModal = () => {
    const { openModal } = this.props;

    openModal();
  };

  renderHeaderLeftWithoutFilter = () => {
    const { title } = this.props;

    return (
      <TableHeaderLeftWrapper>
        <TableHeaderLeftTitle>{title}</TableHeaderLeftTitle>
      </TableHeaderLeftWrapper>
    );
  };

  renderHeaderLeftWithFilter = () => {
    const { filterItems, handleFilter, filtering } = this.props;
    const { isFilterOpen } = this.state;
    const { title } = filtering;

    return (
      <TableHeaderLeftWrapper>
        <TableHeaderLeftTitle onClick={this.onToggleFilter}>
          {title}
          <i className="icon-caret-down" />
        </TableHeaderLeftTitle>
        {isFilterOpen && (
          <React.Fragment>
            <PopupOverlayStyled onClick={this.onToggleFilter} />
            <FilterContainer
              filterItems={filterItems}
              handleFilter={handleFilter}
            />
          </React.Fragment>
        )}
      </TableHeaderLeftWrapper>
    );
  };

  renderOrderHeaderRight = () => {
    const { isSortOpen } = this.state;
    const {
      sorting,
      handleSort,
      sortItem,
      url = '',
      shouldRenderNewButton = true,
      shouldRenderSendEmailButton = false,
    } = this.props;
    return (
      <TableHeaderRightWrapper>
        <ReactTooltip effect="solid" />
        {shouldRenderNewButton && (
          <Link to={url}>
            <TableHeaderAddNewButton data-tip="Create Ticket">
              <i className="icon-add" />
              New
            </TableHeaderAddNewButton>
          </Link>
        )}
        {shouldRenderSendEmailButton && (
          <TableHeaderAddNewButton
            onClick={this.openSendEmailModal}
            data-tip="Send Emails"
          >
            Send Email
          </TableHeaderAddNewButton>
        )}
        <TableHeaderSortButton className="mia-menu" onClick={this.onToggleSort}>
          {isSortOpen && (
            <React.Fragment>
              <PopupOverlayStyled onClick={this.onToggleSort} />
              <SortContainer
                sortItem={sortItem}
                sorting={sorting}
                handleSort={handleSort}
              />
            </React.Fragment>
          )}
        </TableHeaderSortButton>
      </TableHeaderRightWrapper>
    );
  };

  render() {
    const { shouldRenderFilter = false } = this.props;
    return (
      <TableHeaderWrapper>
        {shouldRenderFilter
          ? this.renderHeaderLeftWithFilter()
          : this.renderHeaderLeftWithoutFilter()}
        {this.renderOrderHeaderRight()}
      </TableHeaderWrapper>
    );
  }
}

HeaderContainer.propTypes = {
  sorting: PropTypes.object,
  handleSort: PropTypes.func,
  sortItem: PropTypes.array,
  url: PropTypes.string,
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape(),
  ]),
  shouldRenderNewButton: PropTypes.bool,
  shouldRenderSendEmailButton: PropTypes.bool,
  openModal: PropTypes.func,
  handleFilter: PropTypes.func,
  filterItems: PropTypes.array,
  filtering: PropTypes.object,
  shouldRenderFilter: PropTypes.bool,
};

export default HeaderContainer;
