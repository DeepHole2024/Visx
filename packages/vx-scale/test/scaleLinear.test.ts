import { scaleLinear } from '../src';

describe('scaleLinear()', () => {
  it('should be defined', () => {
    expect(scaleLinear).toBeDefined();
  });
  it('set domain', () => {
    const domain = [1, 2];
    expect(scaleLinear({ domain: [1, 2] }).domain()).toEqual(domain);
  });
  it('set range', () => {
    const range = [1, 2];
    expect(scaleLinear({ range: [1, 2] }).range()).toEqual(range);
  });
  describe('set clamp', () => {
    it('true', () => {
      const scale = scaleLinear({ clamp: true });
      expect(scale(10)).toEqual(1);
    });
    it('false', () => {
      const scale = scaleLinear({ clamp: false });
      expect(scale(10)).toEqual(10);
    });
  });
  it('set (color) interpolate', () => {
    const scale = scaleLinear({
      domain: [0, 10],
      range: ['#ff0000', '#000000'],
      interpolate: 'lab',
    });
    expect(scale(5)).toEqual('rgb(122, 27, 11)');
  });
  describe('set nice', () => {
    it('true', () => {
      const scale = scaleLinear({ domain: [0.1, 0.91], nice: true });
      expect(scale.domain()).toEqual([0.1, 1]);
    });
    it('false', () => {
      const scale = scaleLinear({ domain: [0.1, 0.91], nice: false });
      expect(scale.domain()).toEqual([0.1, 0.91]);
    });
  });
  describe('set round', () => {
    it('true', () => {
      const scale = scaleLinear({ domain: [0, 10], range: [0, 10], round: true });
      expect(scale(2.2)).toEqual(2);
      expect(scale(2.6)).toEqual(3);
    });
    it('false', () => {
      const scale = scaleLinear({ domain: [0, 10], range: [0, 10], round: false });
      expect(scale(2.2)).toEqual(2.2);
      expect(scale(2.6)).toEqual(2.6);
    });
  });
});
