import React, { useState, useEffect } from 'react';
import { string, number, shape, func } from 'prop-types';
import AnimatedInput from './AnimatedInput';
import TextDisplay from './TextDisplay';

const TextEditor = ({ activeDocument, onClear, onSave }) => {
  const [fullText, setFullText] = useState('');

  useEffect(() => {
    setFullText(activeDocument?.text ?? '');
  }, [activeDocument]);

  function onTextComplete(text) {
    setFullText(`${fullText}${text}`);
  }

  return (
    <>
      <div style={{ maxWidth: '800px' }}>
        <section className="section">
          <div className="container has-text-centered">
            <AnimatedInput onTextComplete={onTextComplete} />
          </div>
        </section>

        <section className="section">
          <div className="container">
            <TextDisplay
              text={fullText || ''}
              onClear={onClear}
              onClickSave={() => onSave(fullText)}
            />
          </div>
        </section>
      </div>
    </>
  );
};

TextEditor.propTypes = {
  activeDocument: shape({
    title: string,
    time: number.isRequired,
    text: string.isRequired,
  }),
  onClear: func.isRequired,
  onSave: func.isRequired,
};

TextEditor.defaultProps = {
  activeDocument: null,
};

export default TextEditor;
