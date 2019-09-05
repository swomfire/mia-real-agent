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
  AdminUserDetailsGroup, AdminUserDetailsLeft, AdminUserDetailsRight,
} from 'components/Generals/ItemDetail.styled';
import { Tabs, Icon, Upload, Row } from 'antd';
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

  renderUpload = () => {
    const {
      applicationDetail: {
        cv,
      },
    } = this.props;
    const fileList = cv.map((link, index) => {
      const path = link.split('/');
      const fileName = path[path.length - 1];
      return {
        uid: index,
        name: fileName,
        status: 'done',
        url: link,
        thumbUrl: link,
      };
    });
    const listType = fileList.length > 3 ? 'picture-card' : 'picture';
    return (
      <Upload
        disabled
        listType={listType}
        defaultFileList={fileList}
      />
    );
  }

  renderItemOverview = () => {
    const {
      applicationDetail: {
        nickname, firstName, lastName, email,
        country, address, postcode, phone,
        role, categories,
      },
    } = this.props;
    return (
      <OverviewLeftSectionWrapper>
        <OverviewTitle>{toI18n('ADMIN_APPLICATION_DETAIL_PRIMARY_DETAILS')}</OverviewTitle>
        {this.renderOverviewInfo(toI18n('ADMIN_APPLICATION_DETAIL_ROLE'), role)}
        {this.renderOverviewInfo(toI18n('ADMIN_APPLICATION_DETAIL_NICKNAME'), nickname)}
        {this.renderOverviewInfo(toI18n('ADMIN_APPLICATION_DETAIL_FIRST_NAME'), firstName)}
        {this.renderOverviewInfo(toI18n('ADMIN_APPLICATION_DETAIL_LAST_NAME'), lastName)}
        {this.renderOverviewInfo(toI18n('ADMIN_APPLICATION_DETAIL_EMAIL'), email)}
        {this.renderOverviewInfo(toI18n('ADMIN_APPLICATION_DETAIL_COUNTRY'), country)}
        {this.renderOverviewInfo(toI18n('ADMIN_APPLICATION_DETAIL_ADDRESS'), address)}
        {this.renderOverviewInfo(toI18n('ADMIN_APPLICATION_DETAIL_POSTCODE'), postcode)}
        {this.renderOverviewInfo(toI18n('ADMIN_APPLICATION_DETAIL_PHONE'), phone)}
        <OverviewTitle>{toI18n('ADMIN_APPLICATION_DETAIL_EXPERIENCE')}</OverviewTitle>
        {this.renderOverviewInfo(toI18n('ADMIN_APPLICATION_DETAIL_CATEGORIES'), categories)}
      </OverviewLeftSectionWrapper>
    );
  };

  renderItemAdditional = () => {
    const {
      applicationDetail: {
        skills, createdAt, billingRate = 0,
      },
    } = this.props;
    return (
      <OverviewLeftSectionWrapper>
        <OverviewTitle>{toI18n('ADMIN_APPLICATION_DETAIL_BILLING')}</OverviewTitle>
        {this.renderOverviewInfo(toI18n('ADMIN_APPLICATION_DETAIL_BILLING_RATE'), billingRate)}
        <OverviewTitle>{toI18n('ADMIN_APPLICATION_DETAIL_ADDITIONAL')}</OverviewTitle>
        {this.renderOverviewInfo(toI18n('ADMIN_APPLICATION_DETAIL_SKILLS'), skills)}
        {this.renderOverviewInfo(toI18n('ADMIN_APPLICATION_DETAIL_CREATED_AT'), moment(createdAt).format(DATE_TIME_FORMAT.DATE))}
        {this.renderOverviewInfo(toI18n('ADMIN_APPLICATION_DETAIL_CV'), '')}
        <Row>
          {this.renderUpload()}
        </Row>
      </OverviewLeftSectionWrapper>
    );
  };

  render() {
    const {
      isExperienceDetailOpen, experienceDetail,
      isEducationDetailOpen, educationDetail,
    } = this.state;
    return (
      <AdminInfoContentBlock>
        <AdminUserDetailsGroup>
          <AdminUserDetailsLeft>
            {this.renderItemOverview()}
          </AdminUserDetailsLeft>
          <AdminUserDetailsRight>
            {this.renderItemAdditional()}
          </AdminUserDetailsRight>
        </AdminUserDetailsGroup>
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
      </AdminInfoContentBlock>
    );
  }
}

ApplicationDetailInfoContent.propTypes = {
  applicationDetail: PropTypes.object.isRequired,
};

export default ApplicationDetailInfoContent;
