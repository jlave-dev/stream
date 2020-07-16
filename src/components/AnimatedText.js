import React from 'react';
import { string } from 'prop-types';
import './AnimatedText.scss';

const AnimatedText = ({ animationDuration, text }) => (
  <div className="AnimatedText" style={{ animationDuration }}>
    {text}
  </div>
);

AnimatedText.propTypes = {
  animationDuration: string,
  text: string.isRequired,
};

AnimatedText.defaultProps = {
  animationDuration: '1s',
};

export default AnimatedText;
