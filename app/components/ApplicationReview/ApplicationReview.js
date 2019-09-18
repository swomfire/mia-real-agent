import React, { Component } from 'react';
import { Tabs } from 'antd';
import ReviewForm from '../ReviewForm';
import { ButtonPrimary, ButtonDefault } from '../../stylesheets/Button.style';
import { ReivewFormWrapper, ReviewFormHeader, ReviewFormTitle, ReviewFormRequestChangeWrapper, ReviewFormActionGroup, ReviewFormActionGroupLeft, ReviewFormActionGroupRight } from './styles';

const { TabPane } = Tabs;

const TYPE = {
  START: 'start',
  MIDDLE: 'middle',
  END: 'end',
};

const defaultForm = {
  basic: {
    label: 'Basic',
    noRequestedChange: 0,
    fields: {
      fn: {
        label: 'FN',
        type: 'text',
        value: 'ccc',
      },
      cv: {
        label: 'CV',
        value: ['https://mia-consult.s3-ap-southeast-1.amazonaws.com/Screenshot from 2019-07-23 11-42-51.png'],
        type: 'upload',
      },
    },
    type: TYPE.START,
  },
  ex: {
    label: 'Exp',
    noRequestedChange: 0,
    fields: {
      fn: {
        label: 'FN',
        value: 'ccc',
      },
      cv: {
        label: 'CV',
        value: ['https://mia-consult.s3-ap-southeast-1.amazonaws.com/Screenshot from 2019-07-23 11-42-51.png'],
        type: 'upload',
      },
    },
    type: TYPE.MIDDLE,
  },
  ad: {
    label: 'ADD',
    noRequestedChange: 0,
    fields: {
      fn: {
        label: 'FN',
        value: 'ccc',
      },
      cv: {
        label: 'CV',
        value: ['https://mia-consult.s3-ap-southeast-1.amazonaws.com/Screenshot from 2019-07-23 11-42-51.png'],
        type: 'upload',
      },
    },
    type: TYPE.END,
  },
};

class ApplicationReview extends Component {
  state = {
    step: 'basic',
    applicationReviewForms: defaultForm,
  }

  handleOnchange = (key) => {
    const { applicationReviewForms } = this.state;
    const formValues = applicationReviewForms[key];
    const form = this[`${key}ReviewForm`];
    const noRequestedChange = form.getNoRequestedChange();
    const fields = form.getFields();
    this.setState({
      applicationReviewForms: {
        ...applicationReviewForms,
        [key]: {
          ...formValues,
          noRequestedChange,
          fields,
        },
      },
    });
  }

  getTotalRequestedChange = () => {
    const { applicationReviewForms } = this.state;
    let total = 0;
    Object.values(applicationReviewForms).forEach(({ noRequestedChange }) => { total += noRequestedChange; });
    return total;
  }

  handleNextForm = () => {
    const { step, applicationReviewForms } = this.state;
    const keys = Object.keys(applicationReviewForms);
    const nextKeyIndex = keys.indexOf(step) + 1;
    if (nextKeyIndex < keys.length) {
      this.setState({
        step: keys[nextKeyIndex],
      });
    }
  }

  handlePreviousForm = () => {
    const { step, applicationReviewForms } = this.state;
    const keys = Object.keys(applicationReviewForms);
    const previousKeyIndex = keys.indexOf(step) - 1;
    if (previousKeyIndex >= 0) {
      this.setState({
        step: keys[previousKeyIndex],
      });
    }
  }

  renderActionGroup = (type) => {
    const totalRequest = this.getTotalRequestedChange();
    switch (type) {
      case TYPE.START: return (
        <ReviewFormActionGroup>
          <ReviewFormActionGroupLeft />
          <ReviewFormActionGroupRight>
            <ButtonPrimary onClick={this.handleNextForm}>Next</ButtonPrimary>
          </ReviewFormActionGroupRight>
        </ReviewFormActionGroup>
      );
      case TYPE.END: return (
        <ReviewFormActionGroup>
          <ReviewFormActionGroupLeft>
            <ButtonDefault onClick={this.handlePreviousForm}>Back</ButtonDefault>
          </ReviewFormActionGroupLeft>
          <ReviewFormActionGroupRight>
            <ButtonDefault>Reject</ButtonDefault>
            <ButtonPrimary>{totalRequest > 0 ? 'Request Change' : 'Approve'}</ButtonPrimary>
          </ReviewFormActionGroupRight>
        </ReviewFormActionGroup>
      );
      default: return (
        <ReviewFormActionGroup>
          <ReviewFormActionGroupLeft>
            <ButtonDefault onClick={this.handlePreviousForm}>Back</ButtonDefault>
          </ReviewFormActionGroupLeft>
          <ReviewFormActionGroupRight>
            <ButtonPrimary onClick={this.handleNextForm}>Next</ButtonPrimary>
          </ReviewFormActionGroupRight>
        </ReviewFormActionGroup>
      );
    }
  }

  render() {
    const { step, applicationReviewForms } = this.state;
    const currentForm = applicationReviewForms[step];
    const { label } = currentForm;
    return (
      <ReivewFormWrapper>
        <ReviewFormHeader>
          <ReviewFormTitle>{label}</ReviewFormTitle>
          <ReviewFormRequestChangeWrapper>
            <span>Change Requested: </span>
            <span className="value">
              {this.getTotalRequestedChange()}
            </span>
          </ReviewFormRequestChangeWrapper>
        </ReviewFormHeader>
        <Tabs activeKey={step} renderTabBar={() => (<div />)}>
          {Object.keys(applicationReviewForms).map((key) => {
            const form = defaultForm[key];
            const { fields, type } = form;
            return (
              <TabPane tab={null} key={key}>
                <ReviewForm
                  onChange={() => this.handleOnchange(key)}
                  ref={((reviewForm) => { this[`${key}ReviewForm`] = reviewForm; })}
                  defaultFields={fields}
                />
                {this.renderActionGroup(type)}
              </TabPane>
            );
          })}
        </Tabs>
      </ReivewFormWrapper>
    );
  }
}

export default ApplicationReview;
