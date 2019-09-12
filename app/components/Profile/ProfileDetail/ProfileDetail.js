import React, { PureComponent } from 'react';
import _get from 'lodash/get';
import { Col } from 'antd';
import { shape, string } from 'prop-types';
import { RowStyled, InputLabelStyled, InputStyled } from '../styles';
import { ROLES, SIZE_OPTIONS } from '../../../../common/enums';
import { toI18n } from '../../../utils/func-utils';

export class ProfileDetail extends PureComponent {
  static propTypes = {
    profile: shape(),
    role: string,
  }

  static defaultProps = {
    profile: {},
    role: '',
  }

  renderIndividual = () => {
    const { profile = {} } = this.props;
    const {
      firstName, lastName, phone, address,
      dateOfBirth, position, company,
    } = profile;
    return (
      <div>
        <RowStyled gutter={32}>
          <Col span={12}>
            <InputLabelStyled>
              {toI18n('PROFILE_DETAIL_FIRST_NAME')}
              :
            </InputLabelStyled>
            <InputStyled>{firstName}</InputStyled>
          </Col>
          <Col span={12}>
            <InputLabelStyled>
              {toI18n('PROFILE_DETAIL_LAST_NAME')}
              :
            </InputLabelStyled>
            <InputStyled>{lastName}</InputStyled>
          </Col>
        </RowStyled>
        <RowStyled gutter={32}>
          <Col span={12}>
            <InputLabelStyled>
              {toI18n('PROFILE_DETAIL_PHONE')}
              :
            </InputLabelStyled>
            <InputStyled>{phone}</InputStyled>
          </Col>
          <Col span={12}>
            <InputLabelStyled>
              {toI18n('PROFILE_DETAIL_ADDRESS')}
              :
            </InputLabelStyled>
            <InputStyled>{address}</InputStyled>
          </Col>
        </RowStyled>
        <RowStyled gutter={32}>
          <Col span={12}>
            <InputLabelStyled>
              {toI18n('PROFILE_EDIT')}
              :
            </InputLabelStyled>
            <InputStyled>{dateOfBirth}</InputStyled>
          </Col>
          <Col span={12}>
            <InputLabelStyled>
              {toI18n('PROFILE_DETAIL_POSITION')}
              :
            </InputLabelStyled>
            <InputStyled>{position}</InputStyled>
          </Col>
        </RowStyled>
        <RowStyled gutter={32}>
          <Col span={12}>
            <InputLabelStyled>
              {toI18n('PROFILE_DETAIL_COMPANY')}
              :
            </InputLabelStyled>
            <InputStyled>{company}</InputStyled>
          </Col>
        </RowStyled>
      </div>
    );
  }

  renderBusiness = () => {
    const { profile = {} } = this.props;
    const {
      companyFields = [], phone, address,
      companySize, company,
    } = profile;
    const size = SIZE_OPTIONS.find(({ value }) => value === companySize);
    const sizeLabel = _get(size, 'label', '');
    return (
      <div>
        <RowStyled gutter={32}>
          <Col span={12}>
            <InputLabelStyled>
              {toI18n('PROFILE_DETAIL_COMPANY')}
              :
            </InputLabelStyled>
            <InputStyled>{company}</InputStyled>
          </Col>
          <Col span={12}>
            <InputLabelStyled>
              {toI18n('PROFILE_DETAIL_PHONE')}
              :
            </InputLabelStyled>
            <InputStyled>{phone}</InputStyled>
          </Col>
        </RowStyled>
        <RowStyled gutter={32}>
          <Col span={12}>
            <InputLabelStyled>
              {toI18n('PROFILE_DETAIL_COMPANY_SIZE')}
              :
            </InputLabelStyled>
            <InputStyled>{sizeLabel}</InputStyled>
          </Col>
          <Col span={12}>
            <InputLabelStyled>
              {toI18n('PROFILE_DETAIL_COMPANY_FIELDS')}
              :
            </InputLabelStyled>
            <InputStyled>{companyFields.join(', ')}</InputStyled>
          </Col>
        </RowStyled>
        <RowStyled gutter={32}>
          <Col span={24}>
            <InputLabelStyled>
              {toI18n('PROFILE_DETAIL_ADDRESS')}
              :
            </InputLabelStyled>
            <InputStyled>{address}</InputStyled>
          </Col>
        </RowStyled>
      </div>
    );
  }

  render() {
    const { role } = this.props;
    if (role === ROLES.INDIVIDUAL) {
      return this.renderIndividual();
    }
    return this.renderBusiness();
  }
}

export default ProfileDetail;
