import {
  func, string, bool, shape,
} from 'prop-types';
import _keyBy from 'lodash/keyBy';
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
  nickname: {
    label: 'NK',
    type: 'text',
  },
  firstName: {
    label: 'FN',
    type: 'text',
  },
  lastName: {
    label: 'LN',
    type: 'text',
  },
  email: {
    label: 'EM',
    type: 'text',
  },
  country: {
    label: 'CT',
    type: 'text',
  },
  postcode: {
    label: 'PS',
    type: 'text',
  },
  address: {
    label: 'AD',
    type: 'text',
  },
  cv: {
    label: 'CV',
    type: 'upload',
  },
  categories: {
    label: 'CT',
    type: 'text',
  },
  skills: {
    label: 'SK',
    type: 'text',
  },
  workExperiences: {
    label: 'Ex',
    type: 'list',
    displayFields: {
      title: {
        type: 'text',
        tooltip: 'roleDescription',
      },
      company: {
        type: 'text',
      },
      from: {
        type: 'date',
      },
      to: {
        type: 'date',
        skip: 'isWorking',
        replace: 'now',
      },
    },
  },
  languages: {
    label: 'Ex',
    type: 'list',
    displayFields: {
      name: {
        type: 'text',
      },
      writing: {
        type: 'text',
      },
      reading: {
        type: 'text',
      },
      speaking: {
        type: 'text',
      },
      overall: {
        type: 'text',
      },
    },
  },
};

class ApplicationReview extends Component {
  state = {
    applicationReviewForms: {},
  }

  static propTypes = {
    applicationId: string.isRequired,
    applicationDetail: shape().isRequired,
    reviewSubmit: func.isRequired,
    isSubmitting: bool.isRequired,
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

  handleApprove = () => {

  }

  handleRequestChange = () => {
    const { reviewSubmit, applicationId } = this.props;
    const { applicationReviewForms } = this.state;
    // Filter fields with comment
    const filtered = _keyBy(
      Object.keys(applicationReviewForms)
        .map(key => ({ ...applicationReviewForms[key], name: key }))
        .filter(({ comment }) => comment),
      'name'
    );
    reviewSubmit(filtered, applicationId);
  }

  renderActionGroup = () => {
    const totalRequest = this.getTotalRequestedChange();
    return (
      <ReviewFormActionGroupRight>
        <ButtonDefault>Reject</ButtonDefault>
        <ButtonPrimary
          onClick={totalRequest > 0 ? this.handleRequestChange : this.handleApprove}
        >
          {totalRequest > 0 ? 'Request Change' : 'Approve'}
        </ButtonPrimary>
      </ReviewFormActionGroupRight>
    );
  }

  render() {
    const { applicationDetail, isSubmitting } = this.props;
    const { isLoading = false } = applicationDetail;
    const { applicationReviewForms } = this.state;
    return (
      <ReivewFormWrapper>
        <LoadingSpin loading={isLoading || isSubmitting}>
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
