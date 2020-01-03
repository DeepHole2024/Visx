import React from 'react';
import { shallow } from 'enzyme';
import {
  scaleLinear,
  scaleBand,
  scaleOrdinal,
  scaleThreshold,
  scaleQuantile,
  scaleQuantize,
} from '@vx/scale';

import {
  Legend,
  LegendLinear,
  LegendOrdinal,
  LegendSize,
  LegendThreshold,
  LegendQuantile,
} from '../src';

// const quantileScale = scaleQuantize({
//   domain: [0, 0.15],
//   range: ['#eb4d70', '#f19938', '#6ce18b', '#78f6ef', '#9096f8'],
// });

// const thresholdScale = scaleThreshold({
//   domain: [0.01, 0.02, 0.04, 0.06, 0.08, 0.1],
//   range: ['#f2f0f7', '#dadaeb', '#bcbddc', '#9e9ac8', '#756bb1', '#54278f'],
// });

describe('Legend scales', () => {
  it('should render with scaleLinear', () => {
    const linearScale = scaleLinear({
      domain: [0, 10],
      range: ['#ed4fbb', '#e9a039'],
    });

    expect(shallow(<LegendLinear scale={linearScale} />)).not.toThrow();
    expect(shallow(<LegendSize scale={linearScale} />)).not.toThrow();
    expect(shallow(<Legend scale={linearScale} />)).not.toThrow();
  });

  it('should render with scaleOrdinal', () => {
    const ordinalScale = scaleOrdinal({
      domain: ['a', 'b', 'c', 'd'],
      range: ['#66d981', '#71f5ef', '#4899f1', '#7d81f6'],
    });

    expect(shallow(<LegendOrdinal scale={ordinalScale} />)).not.toThrow();
    expect(shallow(<Legend scale={ordinalScale} />)).not.toThrow();
  });

  it('should render with scaleBand', () => {
    const bandScale = scaleBand({
      domain: ['a', 'b', 'c', 'd'],
      range: [0, 10],
    });

    expect(shallow(<LegendOrdinal scale={bandScale} />)).not.toThrow();
    expect(shallow(<Legend scale={bandScale} />)).not.toThrow();
  });

  it('should render with scaleThreshold', () => {
    const thresholdScale = scaleThreshold({
      domain: [0.01, 0.02, 0.04, 0.06, 0.08, 0.1],
      range: ['#f2f0f7', '#dadaeb', '#bcbddc', '#9e9ac8', '#756bb1', '#54278f'],
    });

    expect(shallow(<LegendThreshold scale={thresholdScale} />)).not.toThrow();
    expect(shallow(<Legend scale={thresholdScale} />)).not.toThrow();
  });

  it('should render with scaleQuantile', () => {
    const quantileScale = scaleQuantile({
      domain: [0.01, 0.02, 0.04, 0.06, 0.08, 0.1],
      range: ['#f2f0f7', '#dadaeb', '#bcbddc', '#9e9ac8', '#756bb1', '#54278f'],
    });

    expect(shallow(<LegendQuantile scale={quantileScale} />)).not.toThrow();
  });

  it('should render with scaleQuantize', () => {
    const quantileScale = scaleQuantize({
      domain: [0, 0.15],
      range: ['#eb4d70', '#f19938', '#6ce18b', '#78f6ef', '#9096f8'],
    });

    expect(shallow(<Legend scale={quantileScale} />)).not.toThrow();
  });
});
