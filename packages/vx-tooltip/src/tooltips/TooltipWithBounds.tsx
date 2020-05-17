import React from 'react';
import { withBoundingRects } from '@vx/bounds';

import Tooltip, { TooltipProps, defaultStyles } from './Tooltip';

type RectShape = {
  top: number;
  right: number;
  bottom: number;
  left: number;
  width: number;
  height: number;
};

type WithBoundingRectsProps = {
  getRects?: () => RectShape;
  rect?: RectShape;
  parentRect?: RectShape;
};

type Props = {
  offsetLeft?: number;
  offsetTop?: number;
} & TooltipProps &
  WithBoundingRectsProps;

function TooltipWithBounds({
  left: initialLeft = 0,
  top: initialTop = 0,
  offsetLeft = 10,
  offsetTop = 10,
  rect,
  parentRect,
  getRects,
  children,
  style,
  unstyled,
  ...otherProps
}: Props) {
  let left = initialLeft;
  let top = initialTop;

  if (rect && parentRect) {
    left =
      offsetLeft + rect.right > parentRect.right || offsetLeft + rect.right > window.innerWidth
        ? left - rect.width - offsetLeft
        : left + offsetLeft;

    top =
      offsetTop + rect.bottom > parentRect.bottom || offsetTop + rect.bottom > window.innerHeight
        ? top - rect.height - offsetTop
        : top + offsetTop;
  }

  left = Math.round(left);
  top = Math.round(top);

  return (
    <Tooltip
      style={{
        top: 0,
        transform: `translate(${left}px, ${top}px)`,
        ...style,
        ...(!unstyled && defaultStyles),
      }}
      {...otherProps}
    >
      {children}
    </Tooltip>
  );
}

export default withBoundingRects(TooltipWithBounds);
