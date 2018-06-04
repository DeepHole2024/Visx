import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Line } from '@vx/shape';
import { Point } from '@vx/point';
import { Group } from '@vx/group';
import { Text } from '@vx/text';

function center(scale) {
  var offset = scale.bandwidth() / 2;
  if (scale.round()) offset = Math.round(offset);
  return function(d) {
    return scale(d) + offset;
  };
}

function identity(x) {
  return x;
}

var ORIENT = {
  top: 'top',
  left: 'left',
  right: 'right',
  bottom: 'bottom'
};

var _extends =
  Object.assign ||
  function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

var toConsumableArray = function(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

function labelTransform(_ref) {
  var labelOffset = _ref.labelOffset,
    labelProps = _ref.labelProps,
    orientation = _ref.orientation,
    range = _ref.range,
    tickLabelFontSize = _ref.tickLabelFontSize,
    tickLength = _ref.tickLength;

  var sign = orientation === ORIENT.left || orientation === ORIENT.top ? -1 : 1;

  var x = void 0,
    y = void 0,
    transform = null;
  if (orientation === ORIENT.top || orientation === ORIENT.bottom) {
    x = Math.max.apply(Math, toConsumableArray(range)) / 2;
    y =
      sign *
      (tickLength +
        labelOffset +
        tickLabelFontSize +
        (orientation === ORIENT.bottom ? labelProps.fontSize : 0));
  } else {
    x = sign * (Math.max.apply(Math, toConsumableArray(range)) / 2);
    y = -(tickLength + labelOffset);
    transform = 'rotate(' + sign * 90 + ')';
  }

  return { x: x, y: y, transform: transform };
}

var propTypes = {
  axisClassName: PropTypes.string,
  axisLineClassName: PropTypes.string,
  hideAxisLine: PropTypes.bool,
  hideTicks: PropTypes.bool,
  hideZero: PropTypes.bool,
  label: PropTypes.string,
  labelClassName: PropTypes.string,
  labelOffset: PropTypes.number,
  labelProps: PropTypes.object,
  left: PropTypes.number,
  numTicks: PropTypes.number,
  orientation: PropTypes.oneOf([ORIENT.top, ORIENT.right, ORIENT.bottom, ORIENT.left]),
  rangePadding: PropTypes.number,
  scale: PropTypes.func.isRequired,
  stroke: PropTypes.string,
  strokeWidth: PropTypes.number,
  strokeDasharray: PropTypes.string,
  tickClassName: PropTypes.string,
  tickFormat: PropTypes.func,
  tickLabelProps: PropTypes.func,
  tickLength: PropTypes.number,
  tickStroke: PropTypes.string,
  tickTransform: PropTypes.string,
  tickValues: PropTypes.array,
  tickComponent: PropTypes.func,
  top: PropTypes.number,
  children: PropTypes.func
};

function Axis(_ref) {
  var children = _ref.children,
    axisClassName = _ref.axisClassName,
    axisLineClassName = _ref.axisLineClassName,
    _ref$hideAxisLine = _ref.hideAxisLine,
    hideAxisLine = _ref$hideAxisLine === undefined ? false : _ref$hideAxisLine,
    _ref$hideTicks = _ref.hideTicks,
    hideTicks = _ref$hideTicks === undefined ? false : _ref$hideTicks,
    _ref$hideZero = _ref.hideZero,
    hideZero = _ref$hideZero === undefined ? false : _ref$hideZero,
    _ref$label = _ref.label,
    label = _ref$label === undefined ? '' : _ref$label,
    labelClassName = _ref.labelClassName,
    _ref$labelOffset = _ref.labelOffset,
    labelOffset = _ref$labelOffset === undefined ? 14 : _ref$labelOffset,
    _ref$labelProps = _ref.labelProps,
    labelProps =
      _ref$labelProps === undefined
        ? {
            textAnchor: 'middle',
            fontFamily: 'Arial',
            fontSize: 10,
            fill: 'black'
          }
        : _ref$labelProps,
    _ref$left = _ref.left,
    left = _ref$left === undefined ? 0 : _ref$left,
    _ref$numTicks = _ref.numTicks,
    numTicks = _ref$numTicks === undefined ? 10 : _ref$numTicks,
    _ref$orientation = _ref.orientation,
    orientation = _ref$orientation === undefined ? ORIENT.bottom : _ref$orientation,
    _ref$rangePadding = _ref.rangePadding,
    rangePadding = _ref$rangePadding === undefined ? 0 : _ref$rangePadding,
    scale = _ref.scale,
    _ref$stroke = _ref.stroke,
    stroke = _ref$stroke === undefined ? 'black' : _ref$stroke,
    _ref$strokeWidth = _ref.strokeWidth,
    strokeWidth = _ref$strokeWidth === undefined ? 1 : _ref$strokeWidth,
    strokeDasharray = _ref.strokeDasharray,
    tickClassName = _ref.tickClassName,
    tickFormat = _ref.tickFormat,
    _ref$tickLabelProps = _ref.tickLabelProps,
    tickLabelProps =
      _ref$tickLabelProps === undefined
        ? function(tickValue, index) {
            return {
              textAnchor: 'middle',
              fontFamily: 'Arial',
              fontSize: 10,
              fill: 'black'
            };
          }
        : _ref$tickLabelProps,
    _ref$tickLength = _ref.tickLength,
    tickLength = _ref$tickLength === undefined ? 8 : _ref$tickLength,
    _ref$tickStroke = _ref.tickStroke,
    tickStroke = _ref$tickStroke === undefined ? 'black' : _ref$tickStroke,
    tickTransform = _ref.tickTransform,
    tickValues = _ref.tickValues,
    tickComponent = _ref.tickComponent,
    _ref$top = _ref.top,
    top = _ref$top === undefined ? 0 : _ref$top;

  var values = scale.ticks ? scale.ticks(numTicks) : scale.domain();
  if (tickValues) values = tickValues;
  var format = scale.tickFormat ? scale.tickFormat() : identity;
  if (tickFormat) format = tickFormat;

  var range = scale.range();
  var range0 = range[0] + 0.5 - rangePadding;
  var range1 = range[range.length - 1] + 0.5 + rangePadding;

  var horizontal = orientation !== ORIENT.left && orientation !== ORIENT.right;
  var isLeft = orientation === ORIENT.left;
  var isTop = orientation === ORIENT.top;
  var tickSign = isLeft || isTop ? -1 : 1;

  var position = (scale.bandwidth ? center : identity)(scale.copy());

  var axisFromPoint = new Point({
    x: horizontal ? range0 : 0,
    y: horizontal ? 0 : range0
  });
  var axisToPoint = new Point({
    x: horizontal ? range1 : 0,
    y: horizontal ? 0 : range1
  });

  var tickLabelFontSize = 10; // track the max tick label size to compute label offset

  if (!!children) {
    return React.createElement(
      Group,
      { className: cx('vx-axis', axisClassName), top: top, left: left },
      children({
        axisFromPoint: axisFromPoint,
        axisToPoint: axisToPoint,
        horizontal: horizontal,
        tickSign: tickSign,
        numTicks: numTicks,
        label: label,
        rangePadding: rangePadding,
        tickLength: tickLength,
        tickFormat: format,
        tickPosition: position,
        ticks: values.map(function(value, index) {
          var from = new Point({
            x: horizontal ? position(value) : 0,
            y: horizontal ? 0 : position(value)
          });
          var to = new Point({
            x: horizontal ? position(value) : tickSign * tickLength,
            y: horizontal ? tickLength * tickSign : position(value)
          });
          return {
            value: value,
            index: index,
            from: from,
            to: to,
            formattedValue: format(value, index)
          };
        })
      })
    );
  }

  return React.createElement(
    Group,
    { className: cx('vx-axis', axisClassName), top: top, left: left },
    values.map(function(val, index) {
      if (hideZero && val === 0) return null;

      var tickFromPoint = new Point({
        x: horizontal ? position(val) : 0,
        y: horizontal ? 0 : position(val)
      });
      var tickToPoint = new Point({
        x: horizontal ? position(val) : tickSign * tickLength,
        y: horizontal ? tickLength * tickSign : position(val)
      });

      var tickLabelPropsObj = tickLabelProps(val, index);
      tickLabelFontSize = Math.max(tickLabelFontSize, tickLabelPropsObj.fontSize || 0);

      return React.createElement(
        Group,
        {
          key: 'vx-tick-' + val + '-' + index,
          className: cx('vx-axis-tick', tickClassName),
          transform: tickTransform
        },
        !hideTicks &&
          React.createElement(Line, { from: tickFromPoint, to: tickToPoint, stroke: tickStroke }),
        tickComponent
          ? tickComponent(
              _extends(
                {
                  x: tickToPoint.x,
                  y: tickToPoint.y + (horizontal && !isTop ? tickLabelFontSize : 0),
                  formattedValue: format(val, index)
                },
                tickLabelPropsObj
              )
            )
          : React.createElement(
              Text,
              _extends(
                {
                  x: tickToPoint.x,
                  y: tickToPoint.y + (horizontal && !isTop ? tickLabelFontSize : 0)
                },
                tickLabelPropsObj
              ),
              format(val, index)
            )
      );
    }),
    !hideAxisLine &&
      React.createElement(Line, {
        className: cx('vx-axis-line', axisLineClassName),
        from: axisFromPoint,
        to: axisToPoint,
        stroke: stroke,
        strokeWidth: strokeWidth,
        strokeDasharray: strokeDasharray
      }),
    label &&
      React.createElement(
        Text,
        _extends(
          {
            className: cx('vx-axis-label', labelClassName)
          },
          labelTransform({
            labelOffset: labelOffset,
            labelProps: labelProps,
            orientation: orientation,
            range: range,
            tickLabelFontSize: tickLabelFontSize,
            tickLength: tickLength
          }),
          labelProps
        ),
        label
      )
  );
}

Axis.propTypes = propTypes;

var propTypes$1 = {
  axisClassName: PropTypes.string,
  axisLineClassName: PropTypes.string,
  hideAxisLine: PropTypes.bool,
  hideTicks: PropTypes.bool,
  hideZero: PropTypes.bool,
  label: PropTypes.string,
  labelClassName: PropTypes.string,
  labelOffset: PropTypes.number,
  labelProps: PropTypes.object,
  left: PropTypes.number,
  numTicks: PropTypes.number,
  rangePadding: PropTypes.number,
  scale: PropTypes.func.isRequired,
  stroke: PropTypes.string,
  strokeWidth: PropTypes.number,
  strokeDasharray: PropTypes.string,
  tickClassName: PropTypes.string,
  tickFormat: PropTypes.func,
  tickLabelProps: PropTypes.func,
  tickLength: PropTypes.number,
  tickStroke: PropTypes.string,
  tickTransform: PropTypes.string,
  tickValues: PropTypes.array,
  tickComponent: PropTypes.func,
  top: PropTypes.number,
  children: PropTypes.func
};

function AxisLeft(_ref) {
  var children = _ref.children,
    axisClassName = _ref.axisClassName,
    axisLineClassName = _ref.axisLineClassName,
    hideAxisLine = _ref.hideAxisLine,
    hideTicks = _ref.hideTicks,
    hideZero = _ref.hideZero,
    label = _ref.label,
    labelClassName = _ref.labelClassName,
    _ref$labelOffset = _ref.labelOffset,
    labelOffset = _ref$labelOffset === undefined ? 36 : _ref$labelOffset,
    labelProps = _ref.labelProps,
    left = _ref.left,
    numTicks = _ref.numTicks,
    rangePadding = _ref.rangePadding,
    scale = _ref.scale,
    stroke = _ref.stroke,
    strokeWidth = _ref.strokeWidth,
    strokeDasharray = _ref.strokeDasharray,
    tickClassName = _ref.tickClassName,
    tickFormat = _ref.tickFormat,
    _ref$tickLabelProps = _ref.tickLabelProps,
    tickLabelProps =
      _ref$tickLabelProps === undefined
        ? function(_ref2) {
            var tick = _ref2.tick,
              index = _ref2.index;
            return {
              dx: '-0.25em',
              dy: '0.25em',
              fill: 'black',
              fontFamily: 'Arial',
              fontSize: 10,
              textAnchor: 'end'
            };
          }
        : _ref$tickLabelProps,
    _ref$tickLength = _ref.tickLength,
    tickLength = _ref$tickLength === undefined ? 8 : _ref$tickLength,
    tickStroke = _ref.tickStroke,
    tickTransform = _ref.tickTransform,
    tickValues = _ref.tickValues,
    tickComponent = _ref.tickComponent,
    top = _ref.top;

  return React.createElement(Axis, {
    axisClassName: cx('vx-axis-left', axisClassName),
    axisLineClassName: axisLineClassName,
    hideAxisLine: hideAxisLine,
    hideTicks: hideTicks,
    hideZero: hideZero,
    label: label,
    labelClassName: labelClassName,
    labelOffset: labelOffset,
    labelProps: labelProps,
    left: left,
    numTicks: numTicks,
    orientation: ORIENT.left,
    rangePadding: rangePadding,
    scale: scale,
    stroke: stroke,
    strokeWidth: strokeWidth,
    strokeDasharray: strokeDasharray,
    tickClassName: tickClassName,
    tickFormat: tickFormat,
    tickLabelProps: tickLabelProps,
    tickLength: tickLength,
    tickStroke: tickStroke,
    tickTransform: tickTransform,
    tickValues: tickValues,
    tickComponent: tickComponent,
    top: top,
    children: children
  });
}

AxisLeft.propTypes = propTypes$1;

var propTypes$2 = {
  axisClassName: PropTypes.string,
  axisLineClassName: PropTypes.string,
  hideAxisLine: PropTypes.bool,
  hideTicks: PropTypes.bool,
  hideZero: PropTypes.bool,
  label: PropTypes.string,
  labelClassName: PropTypes.string,
  labelOffset: PropTypes.number,
  labelProps: PropTypes.object,
  left: PropTypes.number,
  numTicks: PropTypes.number,
  rangePadding: PropTypes.number,
  scale: PropTypes.func.isRequired,
  stroke: PropTypes.string,
  strokeWidth: PropTypes.number,
  strokeDasharray: PropTypes.string,
  tickClassName: PropTypes.string,
  tickFormat: PropTypes.func,
  tickLabelProps: PropTypes.func,
  tickLength: PropTypes.number,
  tickStroke: PropTypes.string,
  tickTransform: PropTypes.string,
  tickValues: PropTypes.array,
  tickComponent: PropTypes.func,
  top: PropTypes.number,
  children: PropTypes.func
};

function AxisRight(_ref) {
  var children = _ref.children,
    axisClassName = _ref.axisClassName,
    axisLineClassName = _ref.axisLineClassName,
    hideAxisLine = _ref.hideAxisLine,
    hideTicks = _ref.hideTicks,
    hideZero = _ref.hideZero,
    label = _ref.label,
    labelClassName = _ref.labelClassName,
    _ref$labelOffset = _ref.labelOffset,
    labelOffset = _ref$labelOffset === undefined ? 36 : _ref$labelOffset,
    labelProps = _ref.labelProps,
    left = _ref.left,
    numTicks = _ref.numTicks,
    rangePadding = _ref.rangePadding,
    scale = _ref.scale,
    stroke = _ref.stroke,
    strokeWidth = _ref.strokeWidth,
    strokeDasharray = _ref.strokeDasharray,
    tickClassName = _ref.tickClassName,
    tickFormat = _ref.tickFormat,
    _ref$tickLabelProps = _ref.tickLabelProps,
    tickLabelProps =
      _ref$tickLabelProps === undefined
        ? function(_ref2) {
            var tick = _ref2.tick,
              index = _ref2.index;
            return {
              dx: '0.25em',
              dy: '0.25em',
              fill: 'black',
              fontFamily: 'Arial',
              fontSize: 10,
              textAnchor: 'start'
            };
          }
        : _ref$tickLabelProps,
    _ref$tickLength = _ref.tickLength,
    tickLength = _ref$tickLength === undefined ? 8 : _ref$tickLength,
    tickStroke = _ref.tickStroke,
    tickTransform = _ref.tickTransform,
    tickValues = _ref.tickValues,
    tickComponent = _ref.tickComponent,
    top = _ref.top;

  return React.createElement(Axis, {
    axisClassName: cx('vx-axis-right', axisClassName),
    axisLineClassName: axisLineClassName,
    hideAxisLine: hideAxisLine,
    hideTicks: hideTicks,
    hideZero: hideZero,
    label: label,
    labelClassName: labelClassName,
    labelOffset: labelOffset,
    labelProps: labelProps,
    left: left,
    numTicks: numTicks,
    orientation: ORIENT.right,
    rangePadding: rangePadding,
    scale: scale,
    stroke: stroke,
    strokeWidth: strokeWidth,
    strokeDasharray: strokeDasharray,
    tickClassName: tickClassName,
    tickFormat: tickFormat,
    tickLabelProps: tickLabelProps,
    tickLength: tickLength,
    tickStroke: tickStroke,
    tickTransform: tickTransform,
    tickValues: tickValues,
    tickComponent: tickComponent,
    top: top,
    children: children
  });
}

AxisRight.propTypes = propTypes$2;

var propTypes$3 = {
  axisClassName: PropTypes.string,
  axisLineClassName: PropTypes.string,
  hideAxisLine: PropTypes.bool,
  hideTicks: PropTypes.bool,
  hideZero: PropTypes.bool,
  label: PropTypes.string,
  labelClassName: PropTypes.string,
  labelOffset: PropTypes.number,
  labelProps: PropTypes.object,
  left: PropTypes.number,
  numTicks: PropTypes.number,
  rangePadding: PropTypes.number,
  scale: PropTypes.func.isRequired,
  stroke: PropTypes.string,
  strokeWidth: PropTypes.number,
  strokeDasharray: PropTypes.string,
  tickClassName: PropTypes.string,
  tickFormat: PropTypes.func,
  tickLabelProps: PropTypes.func,
  tickLength: PropTypes.number,
  tickStroke: PropTypes.string,
  tickTransform: PropTypes.string,
  tickValues: PropTypes.array,
  tickComponent: PropTypes.func,
  top: PropTypes.number,
  children: PropTypes.func
};

function AxisTop(_ref) {
  var children = _ref.children,
    axisClassName = _ref.axisClassName,
    axisLineClassName = _ref.axisLineClassName,
    hideAxisLine = _ref.hideAxisLine,
    hideTicks = _ref.hideTicks,
    hideZero = _ref.hideZero,
    label = _ref.label,
    labelClassName = _ref.labelClassName,
    _ref$labelOffset = _ref.labelOffset,
    labelOffset = _ref$labelOffset === undefined ? 8 : _ref$labelOffset,
    labelProps = _ref.labelProps,
    left = _ref.left,
    numTicks = _ref.numTicks,
    rangePadding = _ref.rangePadding,
    scale = _ref.scale,
    stroke = _ref.stroke,
    strokeWidth = _ref.strokeWidth,
    strokeDasharray = _ref.strokeDasharray,
    tickClassName = _ref.tickClassName,
    tickFormat = _ref.tickFormat,
    _ref$tickLabelProps = _ref.tickLabelProps,
    tickLabelProps =
      _ref$tickLabelProps === undefined
        ? function(_ref2) {
            var tick = _ref2.tick,
              index = _ref2.index;
            return {
              dy: '-0.25em',
              fill: 'black',
              fontFamily: 'Arial',
              fontSize: 10,
              textAnchor: 'middle'
            };
          }
        : _ref$tickLabelProps,
    _ref$tickLength = _ref.tickLength,
    tickLength = _ref$tickLength === undefined ? 8 : _ref$tickLength,
    tickStroke = _ref.tickStroke,
    tickTransform = _ref.tickTransform,
    tickValues = _ref.tickValues,
    tickComponent = _ref.tickComponent,
    top = _ref.top;

  return React.createElement(Axis, {
    axisClassName: cx('vx-axis-top', axisClassName),
    axisLineClassName: axisLineClassName,
    hideAxisLine: hideAxisLine,
    hideTicks: hideTicks,
    hideZero: hideZero,
    label: label,
    labelClassName: labelClassName,
    labelOffset: labelOffset,
    labelProps: labelProps,
    left: left,
    numTicks: numTicks,
    orientation: ORIENT.top,
    rangePadding: rangePadding,
    scale: scale,
    stroke: stroke,
    strokeWidth: strokeWidth,
    strokeDasharray: strokeDasharray,
    tickClassName: tickClassName,
    tickFormat: tickFormat,
    tickLabelProps: tickLabelProps,
    tickLength: tickLength,
    tickStroke: tickStroke,
    tickTransform: tickTransform,
    tickValues: tickValues,
    tickComponent: tickComponent,
    top: top,
    children: children
  });
}

AxisTop.propTypes = propTypes$3;

var propTypes$4 = {
  axisClassName: PropTypes.string,
  axisLineClassName: PropTypes.string,
  hideAxisLine: PropTypes.bool,
  hideTicks: PropTypes.bool,
  hideZero: PropTypes.bool,
  label: PropTypes.string,
  labelClassName: PropTypes.string,
  labelOffset: PropTypes.number,
  labelProps: PropTypes.object,
  left: PropTypes.number,
  numTicks: PropTypes.number,
  rangePadding: PropTypes.number,
  scale: PropTypes.func.isRequired,
  stroke: PropTypes.string,
  strokeWidth: PropTypes.number,
  strokeDasharray: PropTypes.string,
  tickClassName: PropTypes.string,
  tickFormat: PropTypes.func,
  tickLabelProps: PropTypes.func,
  tickLength: PropTypes.number,
  tickStroke: PropTypes.string,
  tickTransform: PropTypes.string,
  tickValues: PropTypes.array,
  tickComponent: PropTypes.func,
  top: PropTypes.number,
  children: PropTypes.func
};

function AxisBottom(_ref) {
  var children = _ref.children,
    axisClassName = _ref.axisClassName,
    axisLineClassName = _ref.axisLineClassName,
    hideAxisLine = _ref.hideAxisLine,
    hideTicks = _ref.hideTicks,
    hideZero = _ref.hideZero,
    label = _ref.label,
    labelClassName = _ref.labelClassName,
    _ref$labelOffset = _ref.labelOffset,
    labelOffset = _ref$labelOffset === undefined ? 8 : _ref$labelOffset,
    labelProps = _ref.labelProps,
    left = _ref.left,
    numTicks = _ref.numTicks,
    rangePadding = _ref.rangePadding,
    scale = _ref.scale,
    stroke = _ref.stroke,
    strokeWidth = _ref.strokeWidth,
    strokeDasharray = _ref.strokeDasharray,
    tickClassName = _ref.tickClassName,
    tickFormat = _ref.tickFormat,
    _ref$tickLabelProps = _ref.tickLabelProps,
    tickLabelProps =
      _ref$tickLabelProps === undefined
        ? function(_ref2) {
            var tick = _ref2.tick,
              index = _ref2.index;
            return {
              dy: '0.25em',
              fill: 'black',
              fontFamily: 'Arial',
              fontSize: 10,
              textAnchor: 'middle'
            };
          }
        : _ref$tickLabelProps,
    _ref$tickLength = _ref.tickLength,
    tickLength = _ref$tickLength === undefined ? 8 : _ref$tickLength,
    tickStroke = _ref.tickStroke,
    tickTransform = _ref.tickTransform,
    tickValues = _ref.tickValues,
    tickComponent = _ref.tickComponent,
    top = _ref.top;

  return React.createElement(Axis, {
    axisClassName: cx('vx-axis-bottom', axisClassName),
    axisLineClassName: axisLineClassName,
    hideAxisLine: hideAxisLine,
    hideTicks: hideTicks,
    hideZero: hideZero,
    label: label,
    labelClassName: labelClassName,
    labelOffset: labelOffset,
    labelProps: labelProps,
    left: left,
    numTicks: numTicks,
    orientation: ORIENT.bottom,
    rangePadding: rangePadding,
    scale: scale,
    stroke: stroke,
    strokeWidth: strokeWidth,
    strokeDasharray: strokeDasharray,
    tickClassName: tickClassName,
    tickFormat: tickFormat,
    tickLabelProps: tickLabelProps,
    tickLength: tickLength,
    tickStroke: tickStroke,
    tickTransform: tickTransform,
    tickValues: tickValues,
    tickComponent: tickComponent,
    top: top,
    children: children
  });
}

AxisBottom.propTypes = propTypes$4;

export { Axis, AxisLeft, AxisRight, AxisTop, AxisBottom, ORIENT as Orientation };
