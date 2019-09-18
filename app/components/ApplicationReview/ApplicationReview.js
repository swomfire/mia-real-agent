import {
  func, string, bool, shape,
} from 'prop-types';
import React, { Component } from 'react';
import ReviewForm from '../ReviewForm';
import { ButtonPrimary, ButtonDefault } from '../../stylesheets/Button.style';
import {
  ReivewFormWrapper, ReviewFormHeader,
  ReviewFormRequestChangeWrapper,
  ReviewFormActionGroupRight,
} from './styles';
import LoadingSpin from '../Loading';
import { flatApplicationForm } from '../../utils/func-utils';

const mapping = {
  firstName: {
    label: 'FN',
    type: 'text',
  },
  lastName: {
    label: 'CV',
    type: 'text',
  },
};

class ApplicationReview extends Component {
  state = {
    applicationReviewForms: {},
  }

  static propTypes = {
    fetchApplicationSingle: func.isRequired,
    applicationId: string.isRequired,
    applicationDetail: shape().isRequired,
  }

  componentDidMount = () => {
    const { applicationDetail } = this.props;
    const flattedFields = flatApplicationForm(applicationDetail, mapping);
    this.setState({
      applicationReviewForms: flattedFields,
    });
    this.reviewForm.setDefaultFields(flattedFields);
  }

  handleOnchange = () => {
    const { applicationReviewForms } = this.state;
    const form = this.reviewForm;
    const fields = form.getFields();
    this.setState({
      applicationReviewForms: {
        ...applicationReviewForms,
        ...fields,
      },
    });
  }

  getTotalRequestedChange = () => {
    const { applicationReviewForms } = this.state;
    return Object.values(applicationReviewForms).filter(({ comment }) => comment).length;
  }

  renderActionGroup = () => {
    const totalRequest = this.getTotalRequestedChange();
    return (
      <ReviewFormActionGroupRight>
        <ButtonDefault>Reject</ButtonDefault>
        <ButtonPrimary>{totalRequest > 0 ? 'Request Change' : 'Approve'}</ButtonPrimary>
      </ReviewFormActionGroupRight>
    );
  }

  render() {
    const { applicationDetail } = this.props;
    const { isLoading = false } = applicationDetail;
    const { applicationReviewForms } = this.state;
    return (
      <ReivewFormWrapper>
        <LoadingSpin loading={isLoading}>
          <ReviewFormHeader>
            {/* <ReviewFormTitle>{label}</ReviewFormTitle> */}
            <ReviewFormRequestChangeWrapper>
              <span>Change Requested: </span>
              <span className="value">
                {this.getTotalRequestedChange()}
              </span>
            </ReviewFormRequestChangeWrapper>
            {this.renderActionGroup()}
          </ReviewFormHeader>
          <ReviewForm
            ref={(reviewForm) => { this.reviewForm = reviewForm; }}
            onChange={this.handleOnchange}
            defaultFields={applicationReviewForms}
          />
        </LoadingSpin>
      </ReivewFormWrapper>
    );
  }
}

export default ApplicationReview;
