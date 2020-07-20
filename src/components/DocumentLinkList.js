import React from 'react';
import { string, number, shape, objectOf, func } from 'prop-types';
import DocumentLink from './DocumentLink';

const DocumentLinkList = ({ documents, onSelectDocument }) => {
  return (
    <nav>
      {Object.entries(documents).map(([id, document]) => (
        <DocumentLink
          document={document}
          key={id}
          onClick={() => onSelectDocument(id)}
        />
      ))}
    </nav>
  );
};

DocumentLinkList.propTypes = {
  documents: objectOf(
    shape({
      title: string,
      time: number.isRequired,
      text: string.isRequired,
    })
  ).isRequired,
  onSelectDocument: func.isRequired,
};

export default DocumentLinkList;
