import React, { Component } from 'react';
import { func, bool, shape } from 'prop-types';
import * as Yup from 'yup';
import _isEmpty from 'lodash/isEmpty';
import _keyBy from 'lodash/keyBy';
import LoadingSpin from '../Loading';
import { APPLICATION_FORM, APPLICATION_REVIEW_MAPPING } from '../../utils/constants';
import ChangeRequestForm from '../ChangeRequestForm/ChangeRequestForm';
import { ChangeRequestWrapper, ChangeRequestItem, ChangeRequestLogo } from './styled';
import { toI18n } from '../../utils/func-utils';

const scrollStyle = {
  height: 'calc(100vh - 260px)',
  width: '100%',
};

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
    if (_isEmpty(review)) {
      return {};
    }
    const { fields } = review;
    const mapped = Object.keys(fields).map((field) => {
      const {
        type, schema, ...rest
      } = APPLICATION_REVIEW_MAPPING[field];
      if (type === 'list') {
        return {
          name: field,
          ...rest,
          type,
          schema: Yup.array().of(APPLICATION_FORM[schema]),
        };
      }
      const { ref, comment, value } = fields[field];
      return {
        name: field,
        ...rest,
        type,
        schema: APPLICATION_FORM[schema].fields[field],
        ref,
        comment,
        value,
      };
    });
    return _keyBy(mapped, 'name');
  };


  render() {
    const { isFetching = false, review } = this.props;
    return (
      <ChangeRequestWrapper>
        <ChangeRequestItem>
          <ChangeRequestLogo>
            <img className="img" src="/assets/images/logo-small-black.png" alt="logo mia" />
            <span className="applicationText">
              {toI18n('REQUEST_CHANGE_LOGO')}
            </span>
          </ChangeRequestLogo>
          <LoadingSpin loading={isFetching}>
            <ChangeRequestForm
              scrollStyle={scrollStyle}
              fields={this.mapReviewFieldWithValidate(review)}
            />
          </LoadingSpin>
        </ChangeRequestItem>
      </ChangeRequestWrapper>
    );
  }
}

export default ChangeRequest;
