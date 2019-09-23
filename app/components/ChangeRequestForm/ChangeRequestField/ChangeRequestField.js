import React, { Component } from 'react';
import { string, shape, any } from 'prop-types';
import FormInput from '../../FormInput/FormInput';
import { FieldWrapperWrapper, LabelWrapper, OldValueWrapper, CommentWrapper, ReviewInputWrapper, ReviewInputTitle, ReviewInputValueWrapper, CommentDisplayWrapper, ReviewInputValue, ListItemWrapper, ListFieldLabel, ListFieldValue, ChangeInputWrapper } from './styles';
import { Icon, Row, Tooltip, Upload } from 'antd';

const CommentIcon = () => (
  <svg width="2em" height="2em" fill="currentColor" viewBox="0 0 1024 1024">
    <g>
      <g id="chat">
        <g>
          <path
            d="M554.625,0H57.375C25.685,0,0,25.685,0,57.375v344.25C0,433.315,25.685,459,57.375,459h76.5v153L382.5,459h172.125
          c31.69,0,57.375-25.685,57.375-57.375V57.375C612,25.685,586.315,0,554.625,0z M535.5,382.5H363.375l-153,95.625L191.25,382.5
          H76.5v-306h459V382.5z"
          />
        </g>
      </g>
    </g>
  </svg>
);

// eslint-disable-next-line react/prefer-stateless-function
class ChangeRequestField extends Component {
  static propTypes = {
    name: string.isRequired,
    type: string.isRequired,
    comment: string.isRequired,
    value: any.isRequired,
    label: shape(),
    additional: shape(),
    displayFields: shape(),
  }

  renderUpload = () => {
    const { value } = this.props;
    const fileList = value.map((link, index) => {
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
    return (
      <ReviewInputValue isUpload>
        <div>
          <Upload
            disabled
            listType="picture-card"
            defaultFileList={fileList}
          />
        </div>
      </ReviewInputValue>
    );
  }

  renderListItem = (value) => {
    const { displayFields } = this.props;
    const keys = Object.keys(value).filter(key => displayFields[key]);
    return (
      <ListItemWrapper>
        {keys.map((key) => {
          const {
            label, tooltip, skip, replace, type,
          } = displayFields[key];
          const result = this.renderItemValue(type, value[key]);
          return (
            <Row mutter={32}>
              <Tooltip title={value[tooltip]}>
                <ListFieldLabel>
                  {label}
                </ListFieldLabel>
                <ListFieldValue>
                  {value[skip] ? replace : result}
                </ListFieldValue>
              </Tooltip>
            </Row>
          );
        })}
      </ListItemWrapper>
    );
  }

  renderListObject = () => {
    const { value } = this.props;
    const { isRequest, comment } = this.state;

    return (
      <ReviewInputValue isRequest={isRequest || comment} isList>
        {value.map(this.renderListItem)}
      </ReviewInputValue>
    );
  }

  renderText = () => {
    const { value } = this.props;
    const result = value instanceof Array ? value.join(', ') : value;
    return (
      <ReviewInputValue>
        <div>
          {result}
        </div>
      </ReviewInputValue>
    );
  }

  selectInputType = () => {
    const { type } = this.props;
    switch (type) {
      case 'upload': return this.renderUpload();
      case 'list': return this.renderListObject();
      case 'text':
      default:
        return this.renderText();
    }
  }

  render() {
    const {
      name, type, label, comment, additional,
    } = this.props;
    return (
      <ReviewInputWrapper>
        <ReviewInputTitle>{label}</ReviewInputTitle>
        <ReviewInputValueWrapper>
          <div>
            {this.selectInputType()}
            <CommentDisplayWrapper>
              <Icon component={CommentIcon} />
              {comment}
            </CommentDisplayWrapper>
          </div>
          <div>
            <ChangeInputWrapper>
              <FormInput
                name={name}
                type={type}
                login={1}
                {...additional}
              />
            </ChangeInputWrapper>
          </div>
        </ReviewInputValueWrapper>
      </ReviewInputWrapper>
    );
  }
}

export default ChangeRequestField;
