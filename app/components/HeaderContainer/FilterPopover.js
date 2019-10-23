import React, { PureComponent } from 'react';
import { Select, Popover, Icon } from 'antd';
import { func, arrayOf, shape } from 'prop-types';
const { Option, OptGroup } = Select;

const styleStyled = {
  width: '200px',
};

class FilterPopover extends PureComponent {
  static propTypes = {
    onFilterChange: func,
    options: arrayOf(shape()),
  }

  onSelect = (values) => {
    const { onFilterChange } = this.props;
    if (onFilterChange) {
      let filter = {};
      values.forEach((valueString) => {
        const split = valueString.split('.');
        const key = split[0];
        const value = split[1];
        const filterValues = (filter[key] || {}).$in || [];
        filter = {
          [key]: { $in: filterValues.concat(value) },
        };
      });
      onFilterChange({ query: filter });
    }
  }

  renderOption = (option) => {
    const { label, key, values } = option;
    return (
      <OptGroup label={label}>
        {values.map(({ label: optionLabel, value }) => (
          <Option value={`${key}.${value}`}>{optionLabel}</Option>
        ))}
      </OptGroup>
    );
  }

  renderSelectPanel = () => {
    const { options = [] } = this.props;
    return (
      <Select
        style={styleStyled}
        placeholder="Filter"
        mode="multiple"
        onChange={this.onSelect}
      >
        {
          options.map(this.renderOption)
        }
      </Select>
    );
  }

  render() {
    return (
      <Popover placement="bottomRight" trigger="click" content={this.renderSelectPanel()}>
        <Icon type="filter" theme="filled" />
      </Popover>
    );
  }
}

export default FilterPopover;
