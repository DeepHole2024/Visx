import { SeriesPoint as SeriesPointType } from 'd3-shape';

export type SeriesPoint<Datum> = SeriesPointType<Datum>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type $TSFIXME = any;

/** Unique key for item in a stack. */
export type StackKey = string | number;

/** Unique key for item in a group. */
export type GroupKey = string | number;

/** One BarGroup is returned for each datum, which has multiple sub-bars (based on keys). */
export interface BarGroup<Key> {
  /** index of BarGroup (matches input Datum index). */
  index: number;
  /** x0 position of bar group */
  x0: number;
  /** bars within group, one for each key. */
  bars: BarGroupBar<Key>[];
}

/** One BarGroup is returned for each datum, which has multiple sub-bars (based on keys). */
export interface BarGroupHorizontal<Key> {
  /** index of BarGroup (matches input Datum index). */
  index: number;
  /** y0 position of bar group */
  y0: number;
  /** bars within group, one for each key. */
  bars: BarGroupBar<Key>[];
}

export interface BarGroupBar<Key> {
  /** group key */
  key: Key;
  /** index of BarGroup (matches input Datum index). */
  index: number;
  /** group value (Datum[key]) */
  value: number;
  /** height of bar. */
  height: number;
  /** width of bar. */
  width: number;
  /** x position of bar. */
  x: number;
  /** y position of bar. */
  y: number;
  /** color of bar. */
  color: string;
}

/** One BarStack is returned for each datum, which has multiple sub-bars (based on keys). */
export interface BarStack<Datum, Key> {
  index: number;
  key: Key;
  bars: {
    /** Processed bar Datum with bar bounds and original datum. */
    bar: SeriesPoint<Datum>;
    /** stack key */
    key: Key;
    /** index of BarGroup (matches input Datum index). */
    index: number;
    /** height of bar. */
    height: number;
    /** width of bar. */
    width: number;
    /** x position of bar. */
    x: number;
    /** y position of bar. */
    y: number;
    /** color of bar. */
    color: string;
  }[];
}

export type AccessorProps<Link, Node> = {
  /** Given a node, returns its x coordinate. */
  x?: (node: Node) => number;
  /** Given a node, returns its y coordinate. */
  y?: (node: Node) => number;
  /** Given a link, returns the source node. */
  source?: (link: Link) => Node;
  /** Given a link, returns the target node. */
  target?: (link: Link) => Node;
};

export type RadialAccessorProps<Link, Node> = Pick<
  AccessorProps<Link, Node>,
  'source' | 'target'
> & {
  /** Given a node, returns its x coordinate. */
  angle?: (node: Node) => number;
  /** Given a node, returns its y coordinate. */
  radius?: (node: Node) => number;
};

type PathType<Link> = (link: Link) => string | null;

export type SharedLinkProps<Link> = {
  /** className applied to path element. */
  className?: string;
  /** React ref to the path element. */
  innerRef?: React.Ref<SVGPathElement>;
  /** Path generator, given a link returns a path d attribute string */
  path?: PathType<Link>;
  /** Render function override which is passed the configured path generator as input. */
  children?: (args: { path: PathType<Link> }) => React.ReactNode;
  /** Datum for which to render a link. */
  data: Link;
};

/** This is meant to be a generic interface for any scale based on usage in this package. */
export interface ScaleType<Input = $TSFIXME, Output = number> {
  (...args: Input[]): Output | undefined;
  range(): Output[] | [Output, Output];
  domain(): Input[] | [Input, Input];
  bandwidth?: () => number;
  copy(): this;
}
