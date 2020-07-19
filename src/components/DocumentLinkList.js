import React from 'react';
import { arrayOf, string, number, shape } from 'prop-types';
import DocumentLink from './DocumentLink';

const DocumentLinkList = ({ documents }) => {
  return (
    <nav>
      {documents.map((document) => (
        <DocumentLink document={document} key={document.id} />
      ))}
    </nav>
  );
};

DocumentLinkList.propTypes = {
  documents: arrayOf(
    shape({
      title: string,
      time: number.isRequired,
      text: string.isRequired,
    })
  ).isRequired,
};

export default DocumentLinkList;
