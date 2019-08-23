import React, { Component } from 'react';
import { shape, arrayOf } from 'prop-types';
import { ResponseItemWrapper, ResponseParameterWrapper, ResponseValueWrapper } from './styles';

export class ResponseItem extends Component {
  static propTypes = {
    response: shape().isRequired,
    parameters: arrayOf(shape()),
  }

  renderResponse = () => {
    const { response: item } = this.props;
    const { response } = item;
    return (<h2>{response.en}</h2>);
  }

  renderParameters = () => {
    const { response: item, parameters = [] } = this.props;
    return item.parameters.map(({ parameterId, value }) => {
      const { displayName } = parameters.find(({ parameterId: itemId }) => itemId === parameterId) || {};
      return (
        <h2 key={parameterId}>{`[${displayName}]: ${value}`}</h2>
      );
    });
  }

  render() {
    return (
      <ResponseItemWrapper>
        <ResponseParameterWrapper>
          {this.renderParameters()}
        </ResponseParameterWrapper>
        <ResponseValueWrapper>
          {this.renderResponse()}
        </ResponseValueWrapper>
      </ResponseItemWrapper>
    );
  }
}

export default ResponseItem;
