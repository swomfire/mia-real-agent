import React, { Component } from 'react';
import { func, shape } from 'prop-types';
import ReviewInput from './ReviewInput/ReviewInput';

class ReviewForm extends Component {
  state = {
    // Number of requested change
    noRequestedChange: 0,
    fields: this.props.defaultFields,
  }

  static propTypes = {
    onChange: func,
    defaultFields: shape(),
  }

  componentDidUpdate = (prevProps, prevState) => {
    const { onChange } = this.props;
    const { noRequestedChange } = this.state;
    if (prevState.noRequestedChange !== noRequestedChange) {
      onChange();
    }
  }

  getNoRequestedChange = () => {
    const { noRequestedChange } = this.state;
    return noRequestedChange;
  }

  getFields = () => {
    const { fields } = this.state;
    return fields;
  }

  handleAddComment = (result) => {
    const { key, value } = result;
    const { fields, noRequestedChange } = this.state;
    const field = fields[key];
    this.setState({
      noRequestedChange: noRequestedChange + 1,
      fields: {
        ...fields,
        [key]: {
          ...field,
          comment: value,
        },
      },
    });
  }

  handleRemoveComment = (key) => {
    const { fields, noRequestedChange } = this.state;
    const field = fields[key];
    this.setState({
      noRequestedChange: noRequestedChange + 1,
      fields: {
        ...fields,
        [key]: {
          ...field,
          comment: null,
        },
      },
    });
  }

  renderReviewInput = (key) => {
    const { fields } = this.state;
    const {
      label, value, isUpload,
    } = fields[key];
    return (
      <ReviewInput
        key={key}
        name={key}
        label={label}
        value={value}
        isUpload={isUpload}
        onAdd={this.handleAddComment}
        onRemove={this.handleRemoveComment}
      />
    );
  }

  render() {
    const { fields } = this.state;
    return (
      <div>
        {Object.keys(fields).map(this.renderReviewInput)}
      </div>
    );
  }
}

export default ReviewForm;