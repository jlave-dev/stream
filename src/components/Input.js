import React, { useEffect, useRef, useState } from 'react';
import PropType from 'prop-types';
import './Input.scss';

const Input = ({ onWordFinished }) => {
  const inputEl = useRef(null);
  const [currentWord, setCurrentWord] = useState('');

  useEffect(() => {
    inputEl.current.focus();
  });

  function handleChange(event) {
    const word = event.target.value;
    const lastCharacter = word.slice(-1);
    if (/\s/.test(lastCharacter)) {
      onWordFinished(word);
      setCurrentWord('');
    } else {
      setCurrentWord(word);
    }
  }

  function handleKeyUp(event) {
    if (event.key === 'Enter') {
      const word = event.target.value;
      onWordFinished(`${word}\n`);
      setCurrentWord('');
    }
  }

  return (
    <input
      ref={inputEl}
      type="text"
      className="input is-large"
      value={currentWord}
      onChange={handleChange}
      onKeyUp={handleKeyUp}
    />
  );
};

Input.propTypes = {
  onWordFinished: PropType.func.isRequired,
};

export default Input;
