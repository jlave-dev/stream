import React, { useState } from 'react';
import './AnimatedInput.scss';
import { func } from 'prop-types';
import AnimatedText from './AnimatedText';
import Input from './Input';

const ANIMATION_DURATION = 1000; // ms

const AnimatedInput = ({ onTextComplete }) => {
  const [animatedTextMap, setAnimatedTextMap] = useState({});

  function spawnAnimatedText(text) {
    onTextComplete(text);
    const animationDurationString = `${ANIMATION_DURATION / 1000}s`;
    const newAnimatedTextKey = `${Date.now().toString()}_${text}`;
    const newAnimatedText = (
      <AnimatedText
        key={newAnimatedTextKey}
        animationDuration={animationDurationString}
        text={text}
      />
    );
    setAnimatedTextMap((previousMap) => ({
      ...previousMap,
      ...{ [newAnimatedTextKey]: newAnimatedText },
    }));
    setTimeout(() => {
      setAnimatedTextMap((previousMap) => ({
        ...previousMap,
        ...{ [newAnimatedTextKey]: null },
      }));
    }, ANIMATION_DURATION);
  }

  function getAnimatedTextMapValues() {
    return Object.values(animatedTextMap);
  }

  return (
    <div className="AnimatedInput">
      <Input onTextComplete={spawnAnimatedText} />
      {getAnimatedTextMapValues()}
    </div>
  );
};

AnimatedInput.propTypes = {
  onTextComplete: func.isRequired,
};

export default AnimatedInput;
