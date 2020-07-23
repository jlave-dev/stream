import React from 'react';
import { string, number, shape, objectOf, func } from 'prop-types';
import DocumentLink from './DocumentLink';
import './DocumentLinkList.scss';

const DocumentLinkList = ({
  activeDocument,
  documents,
  onCreateDocument,
  onSelectDocument,
}) => {
  return (
    <div className="DocumentLinkList">
      <div
        className="DocumentLink"
        role="none"
        onClick={onCreateDocument}
        title="Create new"
      >
        <h1 className="title is-3">
          <span className="icon">
            <i className="far fa-plus-square" />
          </span>
        </h1>
      </div>
      {Object.entries(documents).map(([id, document]) => (
        <DocumentLink
          isActive={id === activeDocument.time.toString()}
          document={document}
          key={id}
          onClick={() => onSelectDocument(id)}
        />
      ))}
    </div>
  );
};

DocumentLinkList.propTypes = {
  activeDocument: shape({
    title: string,
    time: number.isRequired,
    text: string.isRequired,
  }),
  documents: objectOf(
    shape({
      title: string,
      time: number.isRequired,
      text: string.isRequired,
    })
  ).isRequired,
  onCreateDocument: func.isRequired,
  onSelectDocument: func.isRequired,
};

DocumentLinkList.defaultProps = {
  activeDocument: null,
};

export default DocumentLinkList;
