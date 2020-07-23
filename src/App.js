import React, { useState, useEffect } from 'react';
import DocumentLinkList from './components/DocumentLinkList';
import TextEditor from './components/TextEditor';
import { getSavedDocuments, setSavedDocuments } from './lib/storage';
import './App.scss';

function createDocument(text = '') {
  return {
    title: '',
    time: Date.now(),
    text,
  };
}

const App = () => {
  const [documents, setDocuments] = useState({});
  const [activeDocument, setActiveDocument] = useState(null);

  // Get saved documents on app mount
  useEffect(() => {
    const savedDocuments = getSavedDocuments();
    setDocuments(savedDocuments);
    if (Object.values(savedDocuments).length > 0) {
      setActiveDocument(Object.values(savedDocuments)[0]);
    }
  }, []);

  // Set saved documents when documents change
  useEffect(() => {
    setSavedDocuments(documents);
  }, [documents]);

  function onDelete() {
    setDocuments((previousDocuments) => {
      const previousDocumentsCopy = { ...previousDocuments };
      delete previousDocumentsCopy[activeDocument.time.toString()];
      return previousDocumentsCopy;
    });
    // setActiveDocument(documents[documents.length - 1]);
  }

  function onSave(text) {
    if (!activeDocument) {
      const document = createDocument(text);
      setDocuments((previousDocuments) => ({
        ...previousDocuments,
        [document.time.toString()]: document,
      }));
      setActiveDocument(document);
    } else {
      activeDocument.text = text;
      setDocuments((previousDocuments) => ({
        ...previousDocuments,
        [activeDocument.time.toString()]: activeDocument,
      }));
    }
  }

  function onCreateDocument() {
    const document = createDocument();
    setDocuments((previousDocuments) => ({
      ...previousDocuments,
      [document.time.toString()]: document,
    }));
    setActiveDocument(document);
  }

  function onSelectDocument(id) {
    let documentToActivate = null;
    if (id) {
      documentToActivate = documents[id];
    }
    setActiveDocument(documentToActivate);
  }

  return (
    <div>
      <main
        className="container"
        style={{ display: 'flex', justifyContent: 'center' }}
      >
        <TextEditor
          activeDocument={activeDocument}
          onDelete={onDelete}
          onSave={onSave}
        />
      </main>

      <nav style={{ position: 'absolute', bottom: 0, left: 0, width: '100%' }}>
        <DocumentLinkList
          activeDocument={activeDocument}
          documents={documents}
          onCreateDocument={onCreateDocument}
          onSelectDocument={onSelectDocument}
        />
      </nav>
    </div>
  );
};

export default App;
