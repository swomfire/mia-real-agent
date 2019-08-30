import React from 'react';
import PropTypes from 'prop-types';

import LeftSideBar from 'containers/LeftSideBar';
import {
  AdminPageWrapper,
  AdminContentGroup,
  LeftSiderBarAdmin,
} from './AdminMainLayout.styled';

const AdminMainLayout = ({ children, toggleLeftSideBar }) => (
  <AdminPageWrapper>
    <LeftSiderBarAdmin isToggle={toggleLeftSideBar}>
      <LeftSideBar />
    </LeftSiderBarAdmin>
    <AdminContentGroup>{children}</AdminContentGroup>
  </AdminPageWrapper>
);

AdminMainLayout.propTypes = {
  children: PropTypes.any,
  toggleLeftSideBar: PropTypes.bool,
};

export default AdminMainLayout;
