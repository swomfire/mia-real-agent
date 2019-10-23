/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';
import {
  HeaderAdminWrapper,
  TitleAdminHead,
  HeaderActionWrapper,
  TitleAdminMain,
  ActionStyledWrapper,
} from '../Generals/TableHeader.styled';
import { ButtonPrimary } from '../../stylesheets/Button.style';
import FilterPopover from './FilterPopover';

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
      <TitleAdminHead>
        <TitleAdminMain>{title}</TitleAdminMain>
      </TitleAdminHead>
    );
  };

  renderHeaderAction = () => {
    const {
      url = '',
      handleFilter,
      filterItems,
      onClickAddButton,
    } = this.props;
    return (
      <HeaderActionWrapper>
        <ActionStyledWrapper>
          <FilterPopover onFilterChange={handleFilter} options={filterItems} />
        </ActionStyledWrapper>
        {onClickAddButton && (
          <ButtonPrimary data-tip="Create Ticket" onClick={onClickAddButton}>
            <i className="mia-add" />
            <span>Add New</span>
          </ButtonPrimary>
        )}
        {/* <ButtonPrimary data-tip="Export Excel">
          <i className="mia-hr-export" />
          <span>Export Excel</span>
        </ButtonPrimary> */}
      </HeaderActionWrapper>
    );
  };

  render() {
    return (
      <HeaderAdminWrapper>
        {this.renderHeaderLeftWithoutFilter()}
        {this.renderHeaderAction()}
      </HeaderAdminWrapper>
    );
  }
}

HeaderContainer.propTypes = {
  url: PropTypes.string,
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape(),
  ]),
  openModal: PropTypes.func,
  onClickAddButton: PropTypes.func,
  handleFilter: PropTypes.func,
  filterItems: PropTypes.arrayOf(PropTypes.shape()),
};

export default HeaderContainer;
