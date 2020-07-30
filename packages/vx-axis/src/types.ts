import { D3Scale, NumberLike, AnyD3Scale } from '@vx/scale';
import { TextProps } from '@vx/text/lib/Text';

// In order to plot values on an axis, output of the scale must be number.
// Some scales return undefined.
export type AxisScaleOutput = number | NumberLike | undefined;

/** A catch-all type for scales that are compatible with axis */
export type AxisScale<Output extends AxisScaleOutput = AxisScaleOutput> =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  D3Scale<Output, any, any>;

export type AxisOrientation = 'top' | 'right' | 'bottom' | 'left';

export type FormattedValue = string | undefined;

/** Get type of tick value (scale input) from D3 scale */
export type TickValue<Scale extends AnyD3Scale> = Parameters<Scale>[0];

export type TickFormatter<T> = (value: T, tickIndex: number) => FormattedValue;

export type TickLabelProps<T> = (value: T, index: number) => Partial<TextProps>;

export type TickRendererProps = Partial<TextProps> & {
  x: number;
  y: number;
  formattedValue: FormattedValue;
};

export interface Point {
  x: number;
  y: number;
}

interface CommonProps<ScaleInput> {
  /** The class name applied to the axis line element. */
  axisLineClassName?: string;
  /**  If true, will hide the axis line. */
  hideAxisLine: boolean;
  /** If true, will hide the ticks (but not the tick labels). */
  hideTicks: boolean;
  /** If true, will hide the '0' value tick and tick label. */
  hideZero: boolean;
  /** The text for the axis label. */
  label?: string;
  /** The class name applied to the axis label text element. */
  labelClassName?: string;
  /** Pixel offset of the axis label (does not include tick label font size, which is accounted for automatically)  */
  labelOffset?: number;
  /** Props applied to the axis label component. */
  labelProps?: Partial<TextProps>;
  /** The number of ticks wanted for the axis (note this is approximate)  */
  numTicks: number;
  /** Placement of the axis */
  orientation: AxisOrientation;
  /** Pixel padding to apply to both sides of the axis. */
  rangePadding: number;
  /** The color for the stroke of the lines. */
  stroke?: string;
  /** The pixel value for the width of the lines. */
  strokeWidth?: number;
  /** The pattern of dashes in the stroke. */
  strokeDasharray?: string;
  /** The class name applied to each tick group. */
  tickClassName?: string;
  /** Override the component used to render tick labels (instead of <Text /> from @vx/text) */
  tickComponent?: (tickRendererProps: TickRendererProps) => React.ReactNode;
  /** A [d3 formatter](https://github.com/d3/d3-scale/blob/master/README.md#continuous_tickFormat) for the tick text. */
  tickFormat: TickFormatter<ScaleInput>;
  /** A function that returns props for a given tick label. */
  tickLabelProps?: TickLabelProps<ScaleInput>;
  /** The length of the tick lines. */
  tickLength: number;
  /** The color for the tick's stroke value. */
  tickStroke?: string;
  /** A custom SVG transform value to be applied to each tick group. */
  tickTransform?: string;
}

export type ChildRenderProps<Scale extends AxisScale> = CommonProps<TickValue<Scale>> & {
  /** Start point of the axis line */
  axisFromPoint: Point;
  /** End point of the axis line */
  axisToPoint: Point;
  /** Whether this axis is horizontal */
  horizontal: boolean;
  /** A [d3](https://github.com/d3/d3-scale) or [vx](https://github.com/hshoff/vx/tree/master/packages/vx-scale) scale function. */
  scale: Scale;
  /** Function to compute tick position along the axis from tick value */
  tickPosition: (value: TickValue<Scale>) => AxisScaleOutput;
  /** Axis coordinate sign, -1 for left or top orientation. */
  tickSign: 1 | -1;
  /** Computed ticks with positions and formatted value */
  ticks: {
    value: TickValue<Scale>;
    index: number;
    from: Point;
    to: Point;
    formattedValue: FormattedValue;
  }[];
};

export type SharedAxisProps<Scale extends AxisScale> = Partial<CommonProps<TickValue<Scale>>> & {
  /** The class name applied to the outermost axis group element. */
  axisClassName?: string;
  /** A left pixel offset applied to the entire axis. */
  left?: number;
  /** A [d3](https://github.com/d3/d3-scale) or [vx](https://github.com/hshoff/vx/tree/master/packages/vx-scale) scale function. */
  scale: Scale;
  /** An array of values that determine the number and values of the ticks. Falls back to `scale.ticks()` or `.domain()`. */
  tickValues?: TickValue<Scale>[];
  /** A top pixel offset applied to the entire axis. */
  top?: number;
  /** For more control over rendering or to add event handlers to datum, pass a function as children. */
  children?: (renderProps: ChildRenderProps<Scale>) => React.ReactNode;
};
