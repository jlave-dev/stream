import React, { useEffect, useRef, useState } from 'react';
import PropType from 'prop-types';
import './Input.scss';

const Input = ({ onTextComplete }) => {
  const inputEl = useRef(null);
  const [currentText, setCurrentText] = useState('');

  useEffect(() => {
    inputEl.current.focus();
  });

  function handleChange(event) {
    const text = event.target.value;
    const lastCharacter = text.slice(-1);
    if (/\s/.test(lastCharacter)) {
      onTextComplete(text);
      setCurrentText('');
    } else {
      setCurrentText(text);
    }
  }

  function handleKeyUp(event) {
    if (event.key === 'Enter') {
      const text = event.target.value;
      onTextComplete(`${text}\n`);
      setCurrentText('');
    }
  }

  return (
    <div>
      <input
        ref={inputEl}
        type="text"
        className="input is-large"
        value={currentText}
        onChange={handleChange}
        onKeyUp={handleKeyUp}
      />
    </div>
  );
};

Input.propTypes = {
  onTextComplete: PropType.func.isRequired,
};

export default Input;
