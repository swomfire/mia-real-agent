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
import { flatApplicationForm, toI18n } from '../../utils/func-utils';

const mapping = {
  nickname: {
    label: toI18n('APPLICATION_REVIEW_FORM_NICKNAME'),
    type: 'text',
  },
  firstName: {
    label: toI18n('APPLICATION_REVIEW_FORM_FIRSTNAME'),
    type: 'text',
  },
  lastName: {
    label: toI18n('APPLICATION_REVIEW_FORM_LASTNAME'),
    type: 'text',
  },
  role: {
    label: toI18n('APPLICATION_REVIEW_FORM_ROLE'),
    type: 'text',
  },
  email: {
    label: toI18n('APPLICATION_REVIEW_FORM_EMAIL'),
    type: 'text',
  },
  country: {
    label: toI18n('APPLICATION_REVIEW_FORM_COUNTRY'),
    type: 'text',
  },
  postcode: {
    label: toI18n('APPLICATION_REVIEW_FORM_POSTCODE'),
    type: 'text',
  },
  address: {
    label: toI18n('APPLICATION_REVIEW_FORM_ADDRESS'),
    type: 'text',
  },
  cv: {
    label: toI18n('APPLICATION_REVIEW_FORM_CV'),
    type: 'upload',
  },
  categories: {
    label: toI18n('APPLICATION_REVIEW_FORM_CATEGORIES'),
    type: 'text',
  },
  skills: {
    label: toI18n('APPLICATION_REVIEW_FORM_SKILLS'),
    type: 'text',
  },
  workExperiences: {
    label: toI18n('APPLICATION_REVIEW_FORM_WORK_EXPERIENCES'),
    type: 'list',
    displayFields: {
      title: {
        label: toI18n('APPLICATION_REVIEW_FORM_LIST_TITLE'),
        type: 'text',
        tooltip: 'roleDescription',
      },
      company: {
        label: toI18n('APPLICATION_REVIEW_FORM_LIST_COMPANY'),
        type: 'text',
      },
      from: {
        label: toI18n('APPLICATION_REVIEW_FORM_LIST_FROM'),
        type: 'date',
      },
      to: {
        label: toI18n('APPLICATION_REVIEW_FORM_LIST_TO'),
        type: 'date',
        skip: 'isWorking',
        replace: toI18n('APPLICATION_REVIEW_FORM_LIST_NOW'),
      },
    },
  },
  educations: {
    label: toI18n('APPLICATION_REVIEW_FORM_EDUCATIONS'),
    type: 'list',
    displayFields: {
      fieldOfstudy: {
        label: toI18n('APPLICATION_REVIEW_FORM_LIST_FOS'),
        type: 'text',
      },
      school: {
        label: toI18n('APPLICATION_REVIEW_FORM_LIST_SCHOOL'),
        type: 'text',
      },
      degree: {
        label: toI18n('APPLICATION_REVIEW_FORM_LIST_DEGREE'),
        type: 'text',
      },
      gpa: {
        label: toI18n('APPLICATION_REVIEW_FORM_LIST_GPA'),
        type: 'text',
      },
      certificate: {
        label: toI18n('APPLICATION_REVIEW_FORM_LIST_CERTIFICATE'),
        type: 'upload',
      },
    },
  },
  languages: {
    label: toI18n('APPLICATION_REVIEW_FORM_LANGUAGES'),
    type: 'list',
    displayFields: {
      name: {
        label: toI18n('APPLICATION_REVIEW_FORM_LIST_NAME'),
        type: 'text',
      },
      writing: {
        label: toI18n('APPLICATION_REVIEW_FORM_LIST_WRITING'),
        type: 'text',
      },
      reading: {
        label: toI18n('APPLICATION_REVIEW_FORM_LIST_READING'),
        type: 'text',
      },
      speaking: {
        label: toI18n('APPLICATION_REVIEW_FORM_LIST_SPEAKING'),
        type: 'text',
      },
      overall: {
        label: toI18n('APPLICATION_REVIEW_FORM_LIST_OVERALL'),
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
    applicationApprove: func.isRequired,
    applicationReject: func.isRequired,
    toggleReview: func.isRequired,
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
    const totalChange = Object.values(applicationReviewForms).filter(({ comment }) => comment).length;
    const { toggleReview } = this.props;
    if (totalChange > 0) {
      toggleReview(true);
    } else {
      toggleReview(false);
    }
    return totalChange;
  }

  handleApprove = () => {
    const { applicationApprove, applicationId } = this.props;
    applicationApprove({ _id: applicationId });
  }

  handleReject = () => {
    const { applicationReject, applicationId } = this.props;
    applicationReject({ _id: applicationId });
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
        <ButtonDefault
          onClick={this.handleReject}
        >
          {toI18n('APPLICATION_REVIEW_REJECT')}
        </ButtonDefault>
        <ButtonPrimary
          onClick={totalRequest > 0 ? this.handleRequestChange : this.handleApprove}
        >
          {totalRequest > 0
            ? toI18n('APPLICATION_REVIEW_REQUEST_CHANGE')
            : toI18n('APPLICATION_REVIEW_APPROVE')}
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
              <span>
                {toI18n('APPLICATION_REVIEW_CHANGE_REQUESTED')}
              </span>
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
