import React, { useState } from 'react';
import { string, func } from 'prop-types';
import './TextDisplay.scss';

const TextDisplay = ({ onDelete, onSave, text }) => {
  const [isBlurred, setIsBlurred] = useState(true);

  function onClickDelete() {
    if (
      window.confirm(
        'Are you sure you want to delete the text? This is irreversible!'
      )
    ) {
      onDelete();
    }
  }

  return (
    <div className="TextDisplay content">
      <div className="level">
        <div className="level-left">
          <div className="field is-grouped">
            <p className="control">
              <button
                className="button is-medium is-rounded is-info is-inverted"
                type="button"
                title="Toggle text visibility"
                onClick={() => {
                  setIsBlurred(!isBlurred);
                }}
              >
                <span className="icon">
                  <i
                    className={`far ${isBlurred ? 'fa-eye-slash' : 'fa-eye'}`}
                  />
                </span>
              </button>
            </p>
            <p className="control">
              <button
                className="button is-medium is-rounded is-success is-inverted"
                type="button"
                title="Save text"
                onClick={onSave}
              >
                <span className="icon">
                  <i className="far fa-save" />
                </span>
              </button>
            </p>
          </div>
        </div>

        <div className="level-right">
          <button
            className="button is-medium is-rounded is-danger is-inverted"
            type="button"
            title="Delete document"
            onClick={onClickDelete}
          >
            <span className="icon">
              <i className="far fa-trash-alt" />
            </span>
          </button>
        </div>
      </div>

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
  onSave: func.isRequired,
  onDelete: func.isRequired,
  text: string.isRequired,
};

export default TextDisplay;
