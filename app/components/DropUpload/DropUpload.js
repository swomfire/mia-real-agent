// import React, { Component } from 'react';
// import Dropzone, { useDropzone } from 'react-dropzone';
// import axios from 'axios';

import React from 'react';
import { useDropzone } from 'react-dropzone';

function DropUpload(props) {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

  const files = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  return (
    <section className="container">
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      <aside>
        <h4>Files</h4>
        <ul>{files}</ul>
      </aside>
    </section>
  );
}

export default DropUpload;

// export default class DropUpload extends Component {
//   onDrop = (files) => {
//     const file = files[0];
//     axios.post('http://localhost:3000/api/users/upload', {
//       filename: file.name,
//       filetype: file.type,
//     })
//       .then((result) => {
//         const { urls } = result.data;
//         return fetch(urls[0], {
//           method: 'PUT', // 'GET', 'PUT', 'DELETE', etc.
//           body: file, // Coordinate the body type with 'Content-Type'
//           headers: new Headers({
//             'Content-Type': file.type,
//           }),
//         });
//       })
//       .then((result) => {
//         console.log(result);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }

//   render() {
//     const { acceptedFiles } = useDropzone();

//     const files = acceptedFiles.map(file => (
//       <li key={file.path}>
//         {file.path} - {file.size} bytes
//       </li>
//     ));
//     return (
//       <Dropzone onDrop={this.onDrop} size={150}>
//         {({ getRootProps, getInputProps }) => (
//           <section>
//             <div {...getRootProps()}>
//               <input {...getInputProps()} />
//               <p>Drag 'n' drop some files here, or click to select files</p>
//             </div>
//             <aside>
//               <h4>Files</h4>
//               <ul>{files}</ul>
//             </aside>
//           </section>
//         )}
//       </Dropzone>
//     );
//   }
// }
