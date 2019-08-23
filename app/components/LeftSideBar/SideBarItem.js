/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import PropTypes from 'prop-types';
import _startsWith from 'lodash/startsWith';
import { Link } from 'react-router-dom';
import { SidebarItem } from './LeftSidebar.styled';

export default class SideBarItem extends React.PureComponent {
  render() {
    const {
      icon, text, link, isActive, isToggle,
    } = this.props;
    return (
      <Link to={link} key={text}>
        <SidebarItem isActive={isActive} isToggle={isToggle}>
          <i className={icon} />
          <span>{text}</span>
        </SidebarItem>
      </Link>
    );
  }
}

SideBarItem.propTypes = {
  icon: PropTypes.string,
  text: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape(),
  ]).isRequired,
  link: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  isToggle: PropTypes.bool,
};
