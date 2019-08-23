import React, { Component } from 'react';
import { shape, arrayOf, func } from 'prop-types';
import { Tabs, Button, Icon } from 'antd';
import { ResponseItemWrapper, ResponseParameterWrapper, ResponseValueWrapper, ResponseActionWrapper } from './styles';

const { TabPane } = Tabs;

export class ResponseItem extends Component {
  static propTypes = {
    response: shape().isRequired,
    onEdit: func.isRequired,
    parameters: arrayOf(shape()),
  }

  renderResponse = () => {
    const { response: item } = this.props;
    const { response } = item;
    return (
      <Tabs defaultActiveKey="1">
        <TabPane tab="EN" key="1">
          <h2>{response.en}</h2>
        </TabPane>
        <TabPane tab="VN" key="2">
          <h2>{response.vn}</h2>
        </TabPane>
      </Tabs>
    );
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
    const { onEdit } = this.props;
    return (
      <ResponseItemWrapper>
        <ResponseParameterWrapper>
          {this.renderParameters()}
        </ResponseParameterWrapper>
        <ResponseValueWrapper>
          {this.renderResponse()}
        </ResponseValueWrapper>
        <ResponseActionWrapper>
          <Button onClick={onEdit}>
            <Icon type="edit" />
          </Button>
          <Button>
            <Icon type="delete" />
          </Button>
        </ResponseActionWrapper>
      </ResponseItemWrapper>
    );
  }
}

export default ResponseItem;
