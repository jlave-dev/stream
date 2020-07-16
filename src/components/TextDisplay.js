import React, { useState } from 'react';
import { string } from 'prop-types';
import './TextDisplay.scss';

const TextDisplay = ({ text }) => {
  const [isBlurred, setIsBlurred] = useState(true);

  return (
    <div className="TextDisplay content">
      <button
        className="button"
        type="button"
        onClick={() => {
          setIsBlurred(!isBlurred);
        }}
      >
        {isBlurred ? 'Show' : 'Hide'} text
      </button>

      <div className={isBlurred ? 'is-blurred' : ''}>
        {text.split('\n').map((line) => (
          <p key={line} className="has-text-centered">
            {line}
          </p>
        ))}
      </div>
    </div>
  );
};

TextDisplay.propTypes = {
  text: string.isRequired,
};

export default TextDisplay;
