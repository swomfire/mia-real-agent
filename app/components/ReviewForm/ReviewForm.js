import React, { Component } from 'react';
import { func } from 'prop-types';
import ShadowScrollbars from 'components/Scrollbar';
import ReviewInput from './ReviewInput/ReviewInput';

const scrollStyle = {
  height: 'calc(100vh - 60px)',
  width: '100%',
};
class ReviewForm extends Component {
  state = {
    // Number of requested change
    noRequestedChange: 0,
    fields: {},
  }

  static propTypes = {
    onChange: func,
  }

  setDefaultFields = (fields) => {
    this.setState({ fields });
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
      label, value, type, displayFields,
    } = fields[key];
    return (
      <ReviewInput
        key={key}
        name={key}
        label={label}
        value={value}
        type={type}
        displayFields={displayFields}
        onAdd={this.handleAddComment}
        onRemove={this.handleRemoveComment}
      />
    );
  }

  render() {
    const { fields } = this.state;
    return (
      <ShadowScrollbars autoHide style={scrollStyle}>
        {Object.keys(fields).map(this.renderReviewInput)}
      </ShadowScrollbars>
    );
  }
}

export default ReviewForm;
