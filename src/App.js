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
  const [documents, setDocuments] = useState([]);
  const [activeDocument, setActiveDocument] = useState(null);

  // Get saved documents on app mount
  useEffect(() => {
    const savedDocuments = getSavedDocuments();
    setDocuments(savedDocuments);
    if (savedDocuments.length > 0) {
      setActiveDocument(savedDocuments[0]);
    } else {
      setActiveDocument(createDocument());
    }
  }, []);

  // Set saved documents when documents change
  useEffect(() => {
    setSavedDocuments(documents);
  }, [documents]);

  function onDelete() {
    setDocuments((previousDocuments) => {
      const documentsCopy = [...previousDocuments];
      const deleteIndex = documentsCopy.findIndex(
        (doc) => `${doc.time}` === `${activeDocument.time}`
      );
      documentsCopy.splice(deleteIndex, 1);
      if (documentsCopy.length > 0) {
        if (deleteIndex >= documentsCopy.length) {
          setActiveDocument(documentsCopy[documentsCopy.length - 1]);
        } else {
          setActiveDocument(documentsCopy[deleteIndex]);
        }
      } else {
        setActiveDocument(createDocument());
      }
      return documentsCopy;
    });
  }

  function onSave(text) {
    if (!activeDocument) {
      const document = createDocument(text);
      setDocuments((previousDocuments) => [...previousDocuments, document]);
      setActiveDocument(document);
    } else {
      activeDocument.text = text;
      setDocuments((previousDocuments) => {
        const previousDocumentsCopy = [...previousDocuments];
        const activeDocumentIndex = previousDocumentsCopy.findIndex(
          (doc) => doc.time.toString() === activeDocument.time.toString()
        );
        previousDocumentsCopy.splice(activeDocumentIndex, 1, activeDocument);
        return previousDocumentsCopy;
      });
    }
  }

  function onCreateDocument() {
    const document = createDocument();
    setDocuments((previousDocuments) => [...previousDocuments, document]);
    setActiveDocument(document);
  }

  function onSelectDocument(id) {
    let documentToActivate = null;
    if (id) {
      documentToActivate = documents.find(
        (document) => document.time.toString() === id
      );
    }
    setActiveDocument(documentToActivate);
  }

  return (
    <>
      <nav
        className="navbar is-transparent"
        style={{
          padding: '1rem',
          position: 'absolute',
          width: '100vw',
          backgroundColor: '#fff0',
        }}
      >
        <div className="navbar-menu">
          <div className="navbar-start">
            <a
              className="button is-medium is-rounded"
              href="https://github.com/jlave-dev/stream"
              target="_blank"
              rel="noopener noreferrer"
              title="View on GitHub"
            >
              <span className="icon">
                <i className="fab fa-github" />
              </span>
            </a>
          </div>

          <div className="navbar-end" />
        </div>
      </nav>

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
    </>
  );
};

export default App;
