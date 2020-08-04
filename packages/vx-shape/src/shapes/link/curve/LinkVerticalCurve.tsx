import React from 'react';
import cx from 'classnames';
import { path as d3Path } from 'd3-path';
import { SharedLinkProps, AccessorProps, $TSFIXME, AddSVGProps } from '../../../types';

export function pathVerticalCurve<Link, Node>({
  source,
  target,
  x,
  y,
  percent,
}: Required<AccessorProps<Link, Node>> & { percent: number }) {
  return (link: Link) => {
    const sourceData = source(link);
    const targetData = target(link);

    const sx = x(sourceData);
    const sy = y(sourceData);
    const tx = x(targetData);
    const ty = y(targetData);

    const dx = tx - sx;
    const dy = ty - sy;
    const ix = percent * (dx + dy);
    const iy = percent * (dy - dx);

    const path = d3Path();
    path.moveTo(sx, sy);
    path.bezierCurveTo(sx + ix, sy + iy, tx + iy, ty - ix, tx, ty);

    return path.toString();
  };
}

export type LinkVerticalCurveProps<Link, Node> = {
  percent?: number;
} & AccessorProps<Link, Node> &
  SharedLinkProps<Link>;

export default function LinkVerticalCurve<Link, Node>({
  className,
  children,
  data,
  innerRef,
  path,
  percent = 0.2,
  x = (n: $TSFIXME) => n?.x,
  y = (n: $TSFIXME) => n?.y,
  source = (l: $TSFIXME) => l?.source,
  target = (l: $TSFIXME) => l?.target,
  ...restProps
}: AddSVGProps<LinkVerticalCurveProps<Link, Node>, SVGPathElement>) {
  const pathGen = path || pathVerticalCurve({ source, target, x, y, percent });
  if (children) return <>{children({ path: pathGen })}</>;
  return (
    <path
      ref={innerRef}
      className={cx('vx-link vx-link-vertical-curve', className)}
      d={pathGen(data) || ''}
      {...restProps}
    />
  );
}
