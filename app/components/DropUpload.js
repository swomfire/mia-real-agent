import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';

export default class Dashboard extends Component {
  onDrop = (files) => {
    const file = files[0];
    axios.post('http://localhost:3000/api/users/upload', {
      filename: file.name,
      filetype: file.type,
    })
      .then((result) => {
        const { urls } = result.data;
        return fetch(urls[0], {
          method: 'PUT', // 'GET', 'PUT', 'DELETE', etc.
          body: file, // Coordinate the body type with 'Content-Type'
          headers: new Headers({
            'Content-Type': file.type,
          }),
        });
      })
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <Dropzone onDrop={this.onDrop} size={150}>
        {({ getRootProps, getInputProps }) => (
          <section>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
          </section>
        )}
      </Dropzone>
    );
  }
}
