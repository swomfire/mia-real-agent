import React, { Component } from 'react';
import { number, func, shape } from 'prop-types';
import { Pagination } from 'antd';
import _isNumber from 'lodash/isNumber';
import ResponseList from '../../containers/ResponseList/ResponseList';
import { ResponsePaginationWrapper } from './styles';
import { PAGE_SIZE } from '../../../common/enums';

export class IntentDetail extends Component {
  state = {
    page: 0,
  }

  static propTypes = {
    total: number,
    getResponseList: func.isRequired,
    match: shape().isRequired,
  }

  handleChangePage = (current) => {
    const { page } = this.state;
    const { getResponseList } = this.props;
    if (page && _isNumber(page)) {
      getResponseList({ skip: (current - 1) * PAGE_SIZE, limit: PAGE_SIZE });
    }
    this.setState({
      page: current,
    });
  }

  componentDidMount = () => {
    const { getResponseList, match } = this.props;
    const { id } = match.params;
    if (id) {
      getResponseList({ query: { intentId: id } });
    }
  }

  componentDidUpdate = ({ match: prevMatch }) => {
    const { getResponseList, match } = this.props;
    const { id } = match.params;

    const { id: prevId } = prevMatch.params;
    if (id && id !== prevId) {
      getResponseList({ query: { intentId: id } });
      this.setState({
        page: 0,
      });
      return;
    }
    const { page } = this.state;
    const { total } = this.props;
    if (page === 0 && total > 0) {
      this.setState({
        page: 1,
      });
    }
  }

  renderResponsePagination = () => {
    const { total } = this.props;
    const { page } = this.state;
    return (
      <ResponsePaginationWrapper>
        <Pagination
          onChange={this.handleChangePage}
          current={_isNumber(page) ? page : 0}
          showLessItems
          size="small"
          pageSize={PAGE_SIZE}
          total={total}
        />
      </ResponsePaginationWrapper>
    );
  }

  render() {
    return (
      <>
        <ResponseList />
        {this.renderResponsePagination()}
      </>
    );
  }
}

export default IntentDetail;
