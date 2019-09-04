/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/label-has-for */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import _isEmpty from 'lodash/isEmpty';
import {
  OverviewLeftSectionWrapper,
  OverviewTitle,
  OverviewProduct,
  AdminInfoContentBlock,
  OverviewLabel,
  OverviewValue,
} from 'components/Generals/ItemDetail.styled';
import { Tabs, Icon } from 'antd';
import moment from 'moment';
import { DATE_TIME_FORMAT } from '../../utils/constants';
import {
  ArrayTagWrapper, DescriptionWrapper,
  DescriptionNumber, TagAction,
} from './styles';
import ApplicationDetailExperienceDetail from './ApplicationDetailExperienceDetail';
import ApplicationDetailEducationDetail from './ApplicationDetailEducationDetail';
import { toI18n } from '../../utils/func-utils';

const { TabPane } = Tabs;

const MENU = {
  EXPERIENCES: 'EXPERIENCES',
  EDUCATIONS: 'EDUCATIONS',
  LANGUAGES: 'LANGUAGES',
};

class ApplicationDetailInfoContent extends PureComponent {
  state = {
    current: MENU.EXPERIENCES,
    isExperienceDetailOpen: false,
    experienceDetail: null,
    isEducationDetailOpen: false,
    educationDetail: null,
  }

  renderOverviewInfo = (label, value, isLink = false) => (
    <OverviewProduct link={isLink}>
      <OverviewLabel>{label}</OverviewLabel>
      <OverviewValue>{value instanceof Array ? value.join(', ') || '-' : (value || '-')}</OverviewValue>
    </OverviewProduct>
  );

  toggleExperienceDetail = (isExperienceDetailOpen = false, experienceDetail) => {
    this.setState({
      isExperienceDetailOpen,
      experienceDetail,
    });
  }

  toggleEducationDetail = (isEducationDetailOpen = false, educationDetail) => {
    this.setState({
      isEducationDetailOpen,
      educationDetail,
    });
  }

  handleChangeTab = (key) => {
    this.setState({
      current: key,
    });
  }

  renderTabMenu = () => {
    const { current } = this.state;
    const {
      applicationDetail: {
        workExperiences, educations, languages,
      },
    } = this.props;
    return (
      <Tabs activeKey={current} onChange={this.handleChangeTab}>
        <TabPane tab={toI18n('ADMIN_APPLICATION_DETAIL_MENU_EXPERIENCES')} key={MENU.EXPERIENCES}>
          {_isEmpty(workExperiences)
            ? toI18n('ADMIN_APPLICATION_DETAIL_NO_EXPERIENCE')
            : workExperiences.map(({ title, company, ...rest }, index) => this.renderArrayItem(
              index, title, [{
                description: company,
              }],
              () => this.toggleExperienceDetail(true, { title, company, ...rest })
            ))}
        </TabPane>
        <TabPane tab={toI18n('ADMIN_APPLICATION_DETAIL_MENU_EDUCATIONS')} key={MENU.EDUCATIONS}>
          {_isEmpty(educations)
            ? toI18n('ADMIN_APPLICATION_DETAIL_NO_EDUCATION')
            : educations.map(({
              school, degree, gpa, ...rest
            }, index) => this.renderArrayItem(
              index, school, [{
                description: degree,
              },
              {
                description: toI18n('ADMIN_APPLICATION_DETAIL_DESCRIPTION_GPA'),
                value: gpa,
              }],
              () => this.toggleEducationDetail(true, {
                school, degree, gpa, ...rest,
              })
            ))}
        </TabPane>
        <TabPane tab={toI18n('ADMIN_APPLICATION_DETAIL_MENU_LANGUAGES')} key={MENU.LANGUAGES}>
          {_isEmpty(languages)
            ? toI18n('ADMIN_APPLICATION_DETAIL_NO_LANGUAGE')
            : languages.map(({
              name, writing,
              reading, speaking, overall,
            }, index) => this.renderArrayItem(
              index, name, [
                {
                  description: toI18n('ADMIN_APPLICATION_DETAIL_DESCRIPTION_WRITING'),
                  value: writing,
                },
                {
                  description: toI18n('ADMIN_APPLICATION_DETAIL_DESCRIPTION_READING'),
                  value: reading,
                },
                {
                  description: toI18n('ADMIN_APPLICATION_DETAIL_DESCRIPTION_SPEAKING'),
                  value: speaking,
                },
                {
                  description: toI18n('ADMIN_APPLICATION_DETAIL_DESCRIPTION_OVERALL'),
                  value: overall,
                },
              ]
            ))}
        </TabPane>
      </Tabs>
    );
  }

  renderArrayItem = (index, title, descriptions, onClick) => (
    <ArrayTagWrapper key={index} onClick={onClick || (() => { })}>
      <h2>
        {title}
      </h2>
      {
        onClick && (
          <TagAction>
            <Icon
              onClick={onClick}
              type="info-circle"
            />
          </TagAction>
        )
      }
      {
        descriptions.map(({ description, value }) => (
          <DescriptionWrapper key={`${description}${value}`}>
            <p>
              {description}
            </p>
            <DescriptionNumber>{value}</DescriptionNumber>
          </DescriptionWrapper>
        ))
      }
    </ArrayTagWrapper>
  );

  renderItemOverview = () => {
    const {
      isExperienceDetailOpen, experienceDetail,
      isEducationDetailOpen, educationDetail,
    } = this.state;
    const {
      applicationDetail: {
        firstName, lastName, email, cv,
        role, categories, skills, createdAt, billingRate = 0,
      },
    } = this.props;
    return (
      <OverviewLeftSectionWrapper>
        <OverviewTitle>{toI18n('ADMIN_APPLICATION_DETAIL_PRIMARY_DETAILS')}</OverviewTitle>
        {this.renderOverviewInfo(toI18n('ADMIN_APPLICATION_DETAIL_FIRST_NAME'), firstName)}
        {this.renderOverviewInfo(toI18n('ADMIN_APPLICATION_DETAIL_LAST_NAME'), lastName)}
        {this.renderOverviewInfo(toI18n('ADMIN_APPLICATION_DETAIL_EMAIL'), email)}
        {this.renderOverviewInfo(toI18n('ADMIN_APPLICATION_DETAIL_ROLE'), role)}
        {this.renderOverviewInfo(toI18n('ADMIN_APPLICATION_DETAIL_CATEGORIES'), categories)}
        {this.renderOverviewInfo(toI18n('ADMIN_APPLICATION_DETAIL_SKILLS'), skills)}
        {this.renderOverviewInfo(toI18n('ADMIN_APPLICATION_DETAIL_CREATED_AT'), moment(createdAt).format(DATE_TIME_FORMAT.DATE))}
        {this.renderOverviewInfo(toI18n('ADMIN_APPLICATION_DETAIL_BILLING_RATE'), billingRate)}
        {this.renderOverviewInfo(toI18n('ADMIN_APPLICATION_DETAIL_CV'), cv, true)}
        {this.renderTabMenu()}
        <ApplicationDetailExperienceDetail
          isOpen={isExperienceDetailOpen}
          experience={experienceDetail}
          handleClose={() => this.toggleExperienceDetail(false)}
        />
        <ApplicationDetailEducationDetail
          isOpen={isEducationDetailOpen}
          education={educationDetail}
          handleClose={() => this.toggleEducationDetail(false)}
        />
      </OverviewLeftSectionWrapper>
    );
  };

  render() {
    return (
      <AdminInfoContentBlock>
        {this.renderItemOverview()}
      </AdminInfoContentBlock>
    );
  }
}

ApplicationDetailInfoContent.propTypes = {
  applicationDetail: PropTypes.object.isRequired,
};

export default ApplicationDetailInfoContent;
