/* eslint-disable react/style-prop-object */
import React, { Component } from 'react';
import { objectOf, any } from 'prop-types';
import { Scrollbars } from 'react-custom-scrollbars';

class ShadowScrollbars extends Component {
  static propTypes = {
    style: objectOf(any).isRequired,
  };

  constructor(props, ...rest) {
    super(props, ...rest);
    this.state = {};
  }

  render() {
    const { style, ...props } = this.props;
    const containerStyle = {
      ...style,
      position: 'relative',
    };
    return (
      <div style={containerStyle} className="shadow-scrollbars-container">
        <Scrollbars {...props} />
      </div>
    );
  }
}

export default ShadowScrollbars;
