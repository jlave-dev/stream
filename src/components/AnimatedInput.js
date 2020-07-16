import React, { useState } from 'react';
import './AnimatedInput.scss';
import { func } from 'prop-types';
import AnimatedText from './AnimatedText';
import Input from './Input';

const ANIMATION_DURATION = 1000; // ms

const AnimatedInput = ({ onTextComplete }) => {
  // Store AnimatedText components in an object for easy adding/removing
  const [animatedTextMap, setAnimatedTextMap] = useState({});

  function spawnAnimatedText(text) {
    // Pass the completed text upward for further processing
    onTextComplete(text);

    // Create a new AnimatedText for this text and add it to the map
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
      [newAnimatedTextKey]: newAnimatedText,
    }));

    // When animation is over, remove AnimatedText from the map (stop rendering it)
    const timeout = setTimeout(() => {
      setAnimatedTextMap((previousMap) => {
        const previousMapCopy = { ...previousMap };
        delete previousMapCopy[newAnimatedTextKey];
        return previousMapCopy;
      });
      clearTimeout(timeout);
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
