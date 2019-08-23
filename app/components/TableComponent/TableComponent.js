import React from 'react';
import PropTypes from 'prop-types';
import { TableHead, TableRow } from './TableComponent.styled';

export const TableHeader = ({ value, children, ...props }) => (
  <TableHead {...props}>{value || children}</TableHead>
);

export const TableContent = ({ value, children, ...props }) => (
  <TableRow {...props}>{value || children}</TableRow>
);

TableHeader.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape(),
  ]),
  children: PropTypes.node,
};

TableContent.propTypes = {
  value: PropTypes.string,
  children: PropTypes.node,
};
