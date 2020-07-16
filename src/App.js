import React, { useState } from 'react';
import './App.scss';
import Input from './components/Input';
import TextDisplay from './components/TextDisplay';

const App = () => {
  const [fullText, setFullText] = useState('');

  return (
    <>
      <aside>Aside</aside>

      <main>
        <section className="section">
          <div className="container has-text-centered">
            <Input
              onTextComplete={(text) => setFullText(`${fullText}${text}`)}
            />
          </div>
        </section>

        <section className="section">
          <div className="container">
            <TextDisplay text={fullText || ''} />
          </div>
        </section>
      </main>
    </>
  );
};

export default App;
