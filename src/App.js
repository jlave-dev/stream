import React, { useState, useEffect } from 'react';
import './App.scss';
import DocumentLinkList from './components/DocumentLinkList';
import TextEditor from './components/TextEditor';
import { getSavedDocuments, setSavedDocuments } from './lib/storage';

function createDocument(text) {
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

  function onSelectDocument(id) {
    let documentToActivate = null;
    if (id) {
      documentToActivate = documents[id];
    }
    setActiveDocument(documentToActivate);
  }

  function onClear() {
    onSelectDocument(null);
  }

  return (
    <div style={{ display: 'flex' }}>
      <aside>
        <DocumentLinkList
          documents={documents}
          onSelectDocument={onSelectDocument}
        />
      </aside>

      <main
        className="container"
        style={{ display: 'flex', justifyContent: 'center' }}
      >
        <TextEditor
          activeDocument={activeDocument}
          onClear={onClear}
          onSave={onSave}
        />
      </main>
    </div>
  );
};

export default App;
