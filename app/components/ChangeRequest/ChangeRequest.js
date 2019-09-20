import React, { Component } from 'react';
import { func, bool, shape } from 'prop-types';
import LoadingSpin from '../Loading';

class ChangeRequest extends Component {
  static propTypes = {
    fetchReview: func.isRequired,
    isFetching: bool.isRequired,
    review: shape(),
    match: shape().isRequired,
  }

  componentDidMount() {
    const { fetchReview, match } = this.props;
    const { params } = match;
    const { token } = params;
    fetchReview(token);
  }

  mapReviewFieldWithValidate = () => {
    const { review } = this.props;
    const { fields } = review;
  }

  render() {
    const { isFetching = false, review } = this.props;
    console.log(review);
    return (
      <div>
        <LoadingSpin loading={isFetching}>
          <h2>Cc</h2>
        </LoadingSpin>
      </div>
    );
  }
}

export default ChangeRequest;
