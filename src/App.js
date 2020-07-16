import React, { useState } from 'react';
import './App.scss';
import TextDisplay from './components/TextDisplay';
import AnimatedInput from './components/AnimatedInput';

const App = () => {
  const [fullText, setFullText] = useState('');

  return (
    <>
      <aside>Aside</aside>

      <main>
        <section className="section">
          <div className="container has-text-centered">
            <AnimatedInput
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
