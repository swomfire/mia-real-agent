import React, { Component } from 'react';
import {
  Row, Col, Tabs,
} from 'antd';
import { shape, string, number } from 'prop-types';
import ShadowScrollbars from 'components/Scrollbar';
import Activity from 'components/ActivityTab';
import TicketTab from 'containers/TicketTab';
import RequestTab from 'components/RequestTab';
import {
  DashboardContainer,
  DashboardItem,
} from './Dashboard.styled';
import { isAgent, toI18n } from '../../utils/func-utils';

const { TabPane } = Tabs;

const scrollStyle = {
  height: 'calc(100vh - 65px)',
  width: '100%',
};

const TAB = {
  // Activity: 'activity',
  Ticket: 'ticket',
  Requests: 'requests',
};

export default class Dashboard extends Component {
  static propTypes = {
    userRole: string.isRequired,
    totalRequest: number.isRequired,
  }

  state = {
    activeTab: '',
  }

  static propTypes = {
    match: shape().isRequired,
    history: shape().isRequired,
  }

  componentDidMount = () => {
    const { match, history, userRole } = this.props;
    const { params } = match;
    const { tab } = params;
    if (!tab || (tab === TAB.Requests && !isAgent(userRole))) {
      history.push(`/dashboard/${TAB.Ticket}/1`);
      return;
    }
    this.setState({
      activeTab: tab,
    });
  }

  componentDidUpdate = (prevProps) => {
    const { match } = this.props;
    const { params } = match;
    const { tab } = params;
    if (prevProps.match.params.tab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

  renderActivityItem = () => (
    <TabPane tab="Activity" key={TAB.Activity}>
      <Activity />
    </TabPane>
  )

  renderTicketItem = () => (
    <TabPane tab="Ticket" key={TAB.Ticket}>
      <TicketTab />
    </TabPane>
  )

  renderRequestItem = () => {
    const { totalRequest } = this.props;
    return (
      <TabPane
        tab={(
          <span>
            {toI18n('DB_REQUEST')}
            {` (${totalRequest})`}
          </span>
        )}
        key={TAB.Requests}
      >
        <RequestTab />
      </TabPane>
    );
  }

  handleChangeTab = (activeTab) => {
    const { history } = this.props;
    history.push(`/dashboard/${activeTab}`);
  }

  render() {
    const { activeTab } = this.state;
    const { userRole } = this.props;
    return (
      <ShadowScrollbars
        autoHide
        style={scrollStyle}
      >
        <DashboardContainer>
          <DashboardItem>
            <Row type="flex" justify="center" style={{ height: '100%' }}>
              <Col span={20}>
                <Tabs
                  activeKey={activeTab}
                  style={{ height: '100%' }}
                  onChange={this.handleChangeTab}
                >
                  {this.renderTicketItem()}
                  {/* {this.renderActivityItem()} */}
                  {isAgent(userRole) && this.renderRequestItem()}
                </Tabs>
              </Col>
            </Row>
          </DashboardItem>
        </DashboardContainer>
      </ShadowScrollbars>
    );
  }
}
