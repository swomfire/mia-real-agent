import React, { Component } from 'react';
import { Upload, Icon } from 'antd';
import { any, string, bool } from 'prop-types';
import {
  ReviewInputValue, ReviewInputWrapper,
  ReviewInputTitle, ReviewInputAction, ReviewInputValueWrapper, CommentWrapper, CommentInput, CommentAction, CommentInputWrapper, CommentDisplayWrapper,
} from './styles';
import { ButtonPrimary } from '../../../stylesheets/Button.style';

class ReviewInput extends Component {
  state = {
    isRequest: false,
    comment: '',
  }

  handleToggleRequest = (isRequest) => {
    this.setState({ isRequest });
  }

  static propTypes = {
    label: string.isRequired,
    value: any.isRequired,
    isUpload: bool,
  }

  renderUpload = (value) => {
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

  renderText = (value) => {
    const { isRequest, comment } = this.state;
    return (
      <ReviewInputValue isRequest={isRequest || comment}>
        <div>
          {value}
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
  }

  handelRemoveComment = () => {
    this.setState({
      comment: '',
      isRequest: false,
    });
  }

  renderFieldHasComment = () => {
    const { comment } = this.state;
    const { label, value, isUpload } = this.props;
    return (
      <ReviewInputWrapper>
        <ReviewInputTitle>{label}</ReviewInputTitle>
        <ReviewInputValueWrapper>
          <div>
            {isUpload ? this.renderUpload(value) : this.renderText(value)}
          </div>
          <CommentDisplayWrapper>
            <Icon type="message" theme="filled" />
            {comment}
            <Icon className="comment-action" type="delete" theme="filled" onClick={this.handelRemoveComment} />
          </CommentDisplayWrapper>
        </ReviewInputValueWrapper>
      </ReviewInputWrapper>
    );
  }

  render() {
    const { isRequest, comment } = this.state;
    const { label, value, isUpload } = this.props;
    if (comment) {
      return this.renderFieldHasComment();
    }
    if (isRequest) {
      return (
        <ReviewInputWrapper>
          <ReviewInputTitle>{label}</ReviewInputTitle>
          <ReviewInputValueWrapper>
            <div>
              {isUpload ? this.renderUpload(value) : this.renderText(value)}
              <ReviewInputAction>
                <Icon type="close" onClick={() => this.handleToggleRequest(false)} />
              </ReviewInputAction>
            </div>
            <CommentWrapper>
              <CommentInput
                ref={(commentField) => { this.comment = commentField; }}
                placeholder="Comment..."
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
            {isUpload ? this.renderUpload(value) : this.renderText(value)}
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
