import React, { useState } from 'react';
import './App.scss';
import TextDisplay from './components/TextDisplay';
import AnimatedInput from './components/AnimatedInput';
import DocumentLinkList from './components/DocumentLinkList';

const documents = [
  {
    id: '1',
    title: 'Something 1',
    time: Date.now(),
    text: 'This is some text.',
  },
  {
    id: '2',
    title: 'Something 2',
    time: Date.now() - 1e4,
    text: 'This is some text.',
  },
  {
    id: '3',
    title: 'Something 3',
    time: Date.now() - 2e4,
    text: 'This is some text.',
  },
];

const App = () => {
  const [fullText, setFullText] = useState('');

  return (
    <div style={{ display: 'flex' }}>
      <aside>
        <DocumentLinkList documents={documents} />
      </aside>

      <main
        className="container"
        style={{ display: 'flex', justifyContent: 'center' }}
      >
        <div style={{ maxWidth: '800px' }}>
          <section className="section">
            <div className="container has-text-centered">
              <AnimatedInput
                onTextComplete={(text) => setFullText(`${fullText}${text}`)}
              />
            </div>
          </section>

          <section className="section">
            <div className="container">
              <TextDisplay
                text={fullText || ''}
                onClear={() => {
                  setFullText('');
                }}
              />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default App;
