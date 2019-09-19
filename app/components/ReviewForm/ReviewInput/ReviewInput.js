import React, { Component } from 'react';
import moment from 'moment';
import {
  Upload, Icon, Tooltip, Row,
} from 'antd';
import {
  any, string, func, shape,
} from 'prop-types';
import {
  ReviewInputValue, ReviewInputWrapper,
  ReviewInputTitle, ReviewInputAction, ReviewInputValueWrapper,
  CommentWrapper, CommentInput, CommentAction,
  CommentDisplayWrapper, ListFieldValue, ListFieldLabel,
  ListItemWrapper,
} from './styles';
import { ButtonPrimary } from '../../../stylesheets/Button.style';
import { DATE_TIME_FORMAT } from '../../../utils/constants';

class ReviewInput extends Component {
  state = {
    isRequest: false,
    comment: '',
  }

  handleToggleRequest = (isRequest) => {
    this.setState({ isRequest });
  }

  static propTypes = {
    label: shape().isRequired,
    name: string.isRequired,
    type: string.isRequired,
    value: any.isRequired,
    displayFields: shape(),
    onAdd: func,
    onRemove: func,
  }

  renderUpload = () => {
    const { value } = this.props;
    const { isRequest, comment } = this.state;
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
      <ReviewInputValue isRequest={isRequest || comment} isUpload>
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

  renderItemValue = (type, value) => {
    switch (type) {
      case 'upload': {
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
          <Upload
            disabled
            listType="picture-card"
            defaultFileList={fileList}
          />
        );
      }
      case 'date':
        return moment(value).format(DATE_TIME_FORMAT.DATE);
      case 'text':
      default: return value;
    }
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
    const { isRequest, comment } = this.state;
    const result = value instanceof Array ? value.join(', ') : value;
    return (
      <ReviewInputValue isRequest={isRequest || comment}>
        <div>
          {result}
        </div>
      </ReviewInputValue>
    );
  }

  handleSubmitComment = () => {
    const { value = '' } = this.comment.state;
    this.setState({
      comment: value.trim(),
      isRequest: false,
    });
    const { onAdd, name } = this.props;
    if (onAdd) {
      onAdd({
        key: name,
        value,
      });
    }
  }

  handelRemoveComment = () => {
    this.setState({
      comment: '',
      isRequest: false,
    });
    const { onRemove, name } = this.props;
    if (onRemove) {
      onRemove(name);
    }
  }

  renderFieldHasComment = () => {
    const { comment } = this.state;
    const { label } = this.props;
    return (
      <ReviewInputWrapper>
        <ReviewInputTitle>{label}</ReviewInputTitle>
        <ReviewInputValueWrapper>
          <div>
            {this.selectInputType()}
          </div>
          <div>
            <CommentDisplayWrapper>
              <Icon type="message" theme="filled" />
              {comment}
              <Icon className="comment-action" type="delete" theme="filled" onClick={this.handelRemoveComment} />
            </CommentDisplayWrapper>
          </div>
        </ReviewInputValueWrapper>
      </ReviewInputWrapper>
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
    const { isRequest, comment } = this.state;
    const { label } = this.props;
    if (comment) {
      return this.renderFieldHasComment();
    }
    if (isRequest) {
      return (
        <ReviewInputWrapper>
          <ReviewInputTitle>{label}</ReviewInputTitle>
          <ReviewInputValueWrapper>
            <div>
              {this.selectInputType()}
              <ReviewInputAction>
                <Icon type="close" onClick={() => this.handleToggleRequest(false)} />
              </ReviewInputAction>
            </div>
            <CommentWrapper>
              <CommentInput
                ref={(commentField) => { this.comment = commentField; }}
                placeholder="Comment..."
                autoFocus
              />
              <CommentAction>
                <ButtonPrimary onClick={this.handleSubmitComment}>
                  <Icon type="check" />
                </ButtonPrimary>
              </CommentAction>
            </CommentWrapper>
          </ReviewInputValueWrapper>
        </ReviewInputWrapper>
      );
    }
    return (
      <ReviewInputWrapper>
        <ReviewInputTitle>{label}</ReviewInputTitle>
        <ReviewInputValueWrapper>
          <div>
            {this.selectInputType()}
            <ReviewInputAction>
              <Icon type="message" theme="filled" onClick={() => this.handleToggleRequest(true)} />
            </ReviewInputAction>
          </div>
        </ReviewInputValueWrapper>
      </ReviewInputWrapper>
    );
  }
}

export default ReviewInput;
