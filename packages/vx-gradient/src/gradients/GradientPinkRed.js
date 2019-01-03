import React from 'react';
import LinearGradient from './LinearGradient';

/**
 * All props pass through to `<LinearGradient {...props} />`
 */
export default function GradientPinkRed({ from = '#F54EA2', to = '#FF7676', ...restProps }) {
  return <LinearGradient from={from} to={to} {...restProps} />;
}
