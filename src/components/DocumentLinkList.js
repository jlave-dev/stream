import React from 'react';
import { string, number, shape, func, arrayOf } from 'prop-types';
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
      {documents.length > 0 && (
        <div
          className="create-button"
          role="none"
          onClick={onCreateDocument}
          title="Create new"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <h1 className="title is-3">
            <span className="icon">
              <i className="fas fa-plus" />
            </span>
          </h1>
        </div>
      )}
      {documents.map((document) => {
        const id = document.time.toString();
        return (
          <DocumentLink
            isActive={id === activeDocument.time.toString()}
            document={document}
            key={id}
            onClick={() => onSelectDocument(id)}
          />
        );
      })}
    </div>
  );
};

DocumentLinkList.propTypes = {
  activeDocument: shape({
    title: string,
    time: number.isRequired,
    text: string.isRequired,
  }),
  documents: arrayOf(
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
