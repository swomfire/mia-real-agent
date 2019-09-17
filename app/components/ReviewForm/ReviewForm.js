import React, { Component } from 'react';
import ReviewInput from './ReviewInput/ReviewInput';

class ReviewForm extends Component {
  handleAddComment = () => {
    const { onAddRequest } = this.props;
  }

  render() {
    const mock = {
      firstName: 'ccc',
      lastName: 'abc',
    };
    return (
      <div style={{ width: "530px" }}>
        <ReviewInput
          label="FN"
          value="ccc"
        />
        <ReviewInput
          label="FN"
          value={['https://mia-consult.s3-ap-southeast-1.amazonaws.com/Screenshot from 2019-07-23 11-42-51.png']}
          isUpload
        />
      </div>
    );
  }
}

export default ReviewForm;
