import React from 'react';
import cx from 'classnames';
import { path as d3Path } from 'd3-path';
import { SharedLinkProps, AccessorProps } from '../types';

export function pathRadialLine<Link, Node>({
  source,
  target,
  x,
  y,
}: Required<AccessorProps<Link, Node>>) {
  return (data: Link) => {
    const sourceData = source(data);
    const targetData = target(data);

    const sa = x(sourceData) - Math.PI / 2;
    const sr = y(sourceData);
    const ta = x(targetData) - Math.PI / 2;
    const tr = y(targetData);

    const sc = Math.cos(sa);
    const ss = Math.sin(sa);
    const tc = Math.cos(ta);
    const ts = Math.sin(ta);

    const path = d3Path();
    path.moveTo(sr * sc, sr * ss);
    path.lineTo(tr * tc, tr * ts);

    return path.toString();
  };
}

export type LinkRadialLineProps<Link, Node> = AccessorProps<Link, Node> & SharedLinkProps<Link>;

export default function LinkRadialLine<Link, Node>({
  className,
  innerRef,
  data,
  path,
  x = (d: any) => d.x,
  y = (d: any) => d.y,
  source = (d: any) => d.source,
  target = (d: any) => d.target,
  children,
  ...restProps
}: LinkRadialLineProps<Link, Node>) {
  const pathGen = path || pathRadialLine({ source, target, x, y });
  if (children) return <>{children({ path })}</>;
  return (
    <path
      ref={innerRef}
      className={cx('vx-link vx-link-radial-line', className)}
      d={pathGen(data)}
      {...restProps}
    />
  );
}
