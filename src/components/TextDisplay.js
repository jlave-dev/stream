import React, { useState } from 'react';
import { string, func } from 'prop-types';
import './TextDisplay.scss';

const TextDisplay = ({ onClear, onClickSave, text }) => {
  const [isBlurred, setIsBlurred] = useState(true);

  function onClickClear() {
    // eslint-disable-next-line no-alert
    if (window.confirm('Are you sure you want to clear the text?')) {
      onClear();
    }
  }

  return (
    <div className="TextDisplay content">
      {text && (
        <div className="level">
          <div className="level-left">
            <div className="level-item">
              <button
                className="button is-white"
                type="button"
                title="Toggle text visibility"
                onClick={() => {
                  setIsBlurred(!isBlurred);
                }}
              >
                <span className="icon">
                  <i
                    className={`fas ${isBlurred ? 'fa-eye-slash' : 'fa-eye'}`}
                  />
                </span>
              </button>
              <button
                className="button is-white"
                type="button"
                title="Save text"
                onClick={onClickSave}
              >
                <span className="icon">
                  <i className="fas fa-save" />
                </span>
              </button>
            </div>
          </div>

          <div className="level-right">
            <div className="level-item">
              <button
                className="button is-white"
                type="button"
                title="Clear text"
                onClick={onClickClear}
              >
                <span className="icon">
                  <i className="fas fa-trash" />
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

      <div className={isBlurred ? 'is-blurred' : ''}>
        {text.split('\n').map((line) => (
          <p key={line} style={{ textAlign: 'start' }}>
            {line}
          </p>
        ))}
      </div>
    </div>
  );
};

TextDisplay.propTypes = {
  onClear: func.isRequired,
  onClickSave: func.isRequired,
  text: string.isRequired,
};

export default TextDisplay;
