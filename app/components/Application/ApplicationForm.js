import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Steps, Tabs, Icon,
  notification,
} from 'antd';

import { func, bool, string } from 'prop-types';
import { ButtonChoose } from '../../stylesheets/Button.style';
import {
  ApplicationWrapper, ApplicationBlock,
  ApplicationTitle, RoleChoose,
  SubmitSuccess,
} from './styles';
import BasicInfoForm from './BasicInfoForm';
import ExperienceForm from './ExperienceForm';
import EducationForm from './EducationForm';
import AdditionalForm from './AdditionalForm';
import LoadingSpin from '../Loading';
import { APPLICATION_TYPE } from '../../../common/enums';
import { toI18n } from '../../utils/func-utils';

const { Step } = Steps;
const { TabPane } = Tabs;

export class ApplicationForm extends Component {
  static propTypes = {
    checkNicknameExist: func.isRequired,
    onSubmit: func.isRequired,
    isSubmitting: bool.isRequired,
    submitError: string.isRequired,

    isValidating: bool.isRequired,
    validateError: string.isRequired,
  }

  state = {
    step: 0,
    nextStep: 0,
    waitValidate: false,
    role: '',
    basicData: null,
    experienceData: null,
    educationData: null,
  }

  componentDidUpdate = (prevProps) => {
    const { step, nextStep, waitValidate } = this.state;
    const {
      isSubmitting, submitError,
      isValidating, validateError,
    } = this.props;
    if (prevProps.isSubmitting && !isSubmitting) {
      if (submitError) {
        notification.error({ message: submitError });
      } else {
        this.setState({
          step: 5,
        });
      }
      return;
    }
    if (step !== nextStep && step !== 5) {
      if (!waitValidate) {
        this.setState({
          step: nextStep,
        });
        return;
      }
      if (prevProps.isValidating && !isValidating && !validateError) {
        this.setState({
          waitValidate: false,
          step: nextStep,
        });
      }
    }
  }

  handleNextStep = (data) => {
    const { step } = this.state;
    const { checkNicknameExist } = this.props;
    switch (step) {
      case 0:
        this.setState({
          role: data,
        });
        break;
      case 1:
        checkNicknameExist(data.nickname);
        this.setState({
          basicData: data,
          waitValidate: true,
        });
        break;
      case 2:
        this.setState({
          experienceData: data,
        });
        break;
      case 3:
        this.setState({
          educationData: data,
        });
        break;
      default: break;
    }
    this.setState({
      nextStep: step + 1,
    });
  }

  handlePreviousStep = () => {
    const { step } = this.state;

    this.setState({
      step: step - 1,
    });
  }

  handleSubmit = (values) => {
    const {
      role, basicData,
      experienceData, educationData,
    } = this.state;
    const { onSubmit } = this.props;
    const data = {
      role,
      ...basicData,
      ...experienceData,
      ...educationData,
      ...values,
    };

    onSubmit(data);
  }

  handleRenderForm = () => {
    const { step } = this.state;
    return (
      <Tabs activeKey={step.toString()}>
        <TabPane tab="" key="0">
          <RoleChoose>
            <ButtonChoose
              onClick={() => this.handleNextStep(APPLICATION_TYPE.FREELANCER)}
            >
              <Icon type="user" />
              <span>{toI18n('APPLICATION_FORM_FREELANCER')}</span>
            </ButtonChoose>
            <ButtonChoose
              onClick={() => this.handleNextStep(APPLICATION_TYPE.DEDICATED)}
            >
              <Icon type="usergroup-add" />
              <span>{toI18n('APPLICATION_FORM_DEDICATED')}</span>
            </ButtonChoose>
          </RoleChoose>
        </TabPane>
        <TabPane tab="" key="1">
          <BasicInfoForm onSubmit={this.handleNextStep} onCancel={this.handlePreviousStep} />
        </TabPane>
        <TabPane tab="" key="2">
          <ExperienceForm onSubmit={this.handleNextStep} onCancel={this.handlePreviousStep} />
        </TabPane>
        <TabPane tab="" key="3">
          <EducationForm onSubmit={this.handleNextStep} onCancel={this.handlePreviousStep} />
        </TabPane>
        <TabPane tab="" key="4">
          <AdditionalForm onSubmit={this.handleSubmit} onCancel={this.handlePreviousStep} />
        </TabPane>
        <TabPane tab="" key="5">
          <SubmitSuccess>
            <i className="mia-check" />
            {toI18n('APPLICATION_FORM_SUBMIT_SUCCESS')}
            <br />
            <Link to="/login">
              {toI18n('APPLICATION_FORM_TO_LOGIN')}
            </Link>
          </SubmitSuccess>
        </TabPane>
      </Tabs>
    );
  }

  render() {
    const { isSubmitting, isValidating } = this.props;
    const { step } = this.state;
    return (
      <ApplicationWrapper>
        <ApplicationBlock>
          <ApplicationTitle>
            <img className="img" src="/assets/images/logo-small-black.png" alt="logo mia" />
            <span className="applicationText">
              {toI18n('APPLICATION_FORM_TITLE')}
            </span>
          </ApplicationTitle>

          {step !== 5
            && (
              <Steps current={step}>
                <Step title={toI18n('APPLICATION_FORM_ROLE_TAB')} />
                <Step title={toI18n('APPLICATION_FORM_BASIC_INFO_TAB')} />
                <Step title={toI18n('APPLICATION_FORM_EXPERIENCE_TAB')} />
                <Step title={toI18n('APPLICATION_FORM_EDUCATION_TAB')} />
                <Step title={toI18n('APPLICATION_FORM_ADDITIONAL_TAB')} />
              </Steps>
            )}
          <LoadingSpin loading={isSubmitting || isValidating}>
            {/* <ShadowScrollbars autoHide style={scrollStyle}>
            </ShadowScrollbars> */}
            {this.handleRenderForm()}
          </LoadingSpin>
        </ApplicationBlock>
      </ApplicationWrapper>
    );
  }
}

export default ApplicationForm;
