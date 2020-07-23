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
    }
  }, []);

  // Set saved documents when documents change
  useEffect(() => {
    setSavedDocuments(documents);
  }, [documents]);

  function onDelete() {
    setDocuments((previousDocuments) => {
      const previousDocumentsCopy = [...previousDocuments];
      const deleteIndex = previousDocumentsCopy.findIndex(
        (doc) => `${doc.time}` === `${activeDocument.time}`
      );
      previousDocumentsCopy.splice(deleteIndex, 1);
      if (deleteIndex >= previousDocumentsCopy.length) {
        setActiveDocument(
          previousDocumentsCopy[previousDocumentsCopy.length - 1]
        );
      } else {
        setActiveDocument(previousDocumentsCopy[deleteIndex]);
      }
      return previousDocumentsCopy;
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
