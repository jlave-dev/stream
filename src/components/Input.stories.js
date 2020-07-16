import React from 'react';
import { action } from '@storybook/addon-actions';
import Input from './Input';

export default {
  title: 'Input',
};

export const text = () => <Input onTextComplete={action('textComplete')} />;
