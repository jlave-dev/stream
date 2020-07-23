import React from 'react';
import { shape, string, number, func, bool } from 'prop-types';
import './DocumentLink.scss';

const DocumentLink = ({ document, isActive, onClick }) => {
  return (
    <div
      className={`DocumentLink ${isActive ? 'is-active' : ''}`}
      role="none"
      onClick={onClick}
    >
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
  isActive: bool.isRequired,
  onClick: func.isRequired,
};

export default DocumentLink;
