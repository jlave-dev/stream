import React, { useState } from 'react';
import './App.scss';

function App() {
  const [currentWord, setCurrentWord] = useState('');
  const [fullText, setFullText] = useState('');

  function handleChange(event) {
    const word = event.target.value;
    const lastCharacter = word.slice(-1);
    if (/\s/.test(lastCharacter)) {
      setFullText(`${fullText}${word}`);
      setCurrentWord('');
    } else {
      setCurrentWord(word);
    }
  }

  return (
    <div id="App">
      <section className="section">
        <div className="container has-text-centered">
          <input type="text" className="input" value={currentWord} onChange={handleChange} />
        </div>
      </section>

      <section className="section">
        <div className="container has-text-centered">
          <p className="content">
            {fullText}
          </p>
        </div>
      </section>
    </div>
  );
}

export default App;
