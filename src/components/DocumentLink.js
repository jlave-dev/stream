import React from 'react';
import { shape, string, number } from 'prop-types';

const DocumentLink = ({ document }) => {
  return (
    <div className="DocumentLink box">
      <h1 className="title is-4">{document.title}</h1>
      <h2 className="subtitle is-6">
        {new Date(document.time).toLocaleString()}
      </h2>
    </div>
  );
};

DocumentLink.propTypes = {
  document: shape({
    title: string,
    time: number.isRequired,
    text: string.isRequired,
  }).isRequired,
};

export default DocumentLink;
