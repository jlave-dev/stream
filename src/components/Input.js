import React, { useEffect, useRef, useState } from 'react';
import { func } from 'prop-types';
import './Input.scss';

const Input = ({ onTextComplete }) => {
  const htmlInput = useRef(null);
  const [currentText, setCurrentText] = useState('');

  useEffect(() => {
    htmlInput.current.focus();
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
    <input
      ref={htmlInput}
      type="text"
      className="input is-large"
      value={currentText}
      onChange={handleChange}
      onKeyUp={handleKeyUp}
    />
  );
};

Input.propTypes = {
  onTextComplete: func.isRequired,
};

export default Input;
