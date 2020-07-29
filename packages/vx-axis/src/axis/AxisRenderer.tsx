import React from 'react';
import cx from 'classnames';
import { Line } from '@vx/shape';
import { Group } from '@vx/group';
import { Text } from '@vx/text';

import { TextProps } from '@vx/text/lib/Text';
import ORIENT from '../constants/orientation';
import getLabelTransform from '../utils/labelTransform';
import { ChildRenderProps } from '../types';

const defaultTextProps: Partial<TextProps> = {
  textAnchor: 'middle',
  fontFamily: 'Arial',
  fontSize: 10,
  fill: '#222',
};

export default function AxisRenderer<Datum>({
  axisFromPoint,
  axisLineClassName,
  axisToPoint,
  hideAxisLine,
  hideTicks,
  horizontal,
  label = '',
  labelClassName,
  labelOffset = 14,
  labelProps = defaultTextProps,
  orientation,
  scale,
  stroke = '#222',
  strokeWidth = 1,
  strokeDasharray,
  tickClassName,
  tickComponent,
  tickLabelProps = (/** tickValue, index */) => defaultTextProps,
  tickLength,
  tickStroke = '#222',
  tickTransform,
  ticks,
}: ChildRenderProps<Datum>) {
  let tickLabelFontSize = 10; // track the max tick label size to compute label offset

  return (
    <>
      {ticks.map(({ value, from, to, formattedValue }, index) => {
        const tickLabelPropsObj = tickLabelProps(value, index);
        tickLabelFontSize = Math.max(
          tickLabelFontSize,
          (typeof tickLabelPropsObj.fontSize === 'number' && tickLabelPropsObj.fontSize) || 0,
        );

        const tickYCoord =
          to.y + (horizontal && orientation !== ORIENT.top ? tickLabelFontSize : 0);

        return (
          <Group
            key={`vx-tick-${value}-${index}`}
            className={cx('vx-axis-tick', tickClassName)}
            transform={tickTransform}
          >
            {!hideTicks && <Line from={from} to={to} stroke={tickStroke} strokeLinecap="square" />}
            {tickComponent ? (
              tickComponent({
                ...tickLabelPropsObj,
                x: to.x,
                y: tickYCoord,
                formattedValue,
              })
            ) : (
              <Text x={to.x} y={tickYCoord} {...tickLabelPropsObj}>
                {formattedValue}
              </Text>
            )}
          </Group>
        );
      })}

      {!hideAxisLine && (
        <Line
          className={cx('vx-axis-line', axisLineClassName)}
          from={axisFromPoint}
          to={axisToPoint}
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeDasharray={strokeDasharray}
        />
      )}

      {label && (
        <Text
          className={cx('vx-axis-label', labelClassName)}
          {...getLabelTransform({
            labelOffset,
            labelProps,
            orientation,
            range: scale.range(),
            tickLabelFontSize,
            tickLength,
          })}
          {...labelProps}
        >
          {label}
        </Text>
      )}
    </>
  );
}
