import React from 'react';
import { Bar } from '@vx/shape';
import { Group } from '@vx/group';
import { Pattern as CustomPattern, PatternLines, PatternCircles, PatternWaves } from '@vx/pattern';

const defaultMargin = {
  top: 0,
  left: 0,
  right: 0,
  bottom: 80,
};

type Props = {
  width: number;
  height: number;
  margin?: typeof defaultMargin;
};

const Patterns: React.FC<{ id: string }>[] = [
  ({ id }) => <PatternLines id={id} height={6} width={6} stroke="black" strokeWidth={1} />,
  ({ id }) => (
    <CustomPattern id={id} width={10} height={10}>
      <animateTransform
        attributeType="xml"
        attributeName="patternTransform"
        type="translate"
        from="0 0"
        to="0 30"
        dur="10s"
        repeatCount="indefinite"
      />
      <circle cx={5} cy={5} r="3" stroke="none" fill="black" transform-origin="center" />
    </CustomPattern>
  ),
  ({ id }) => (
    <PatternLines
      id={id}
      height={6}
      width={6}
      stroke="black"
      strokeWidth={1}
      orientation={['horizontal']}
    />
  ),
  ({ id }) => (
    <PatternLines
      id={id}
      height={6}
      width={6}
      stroke="black"
      strokeWidth={1}
      orientation={['diagonal']}
    />
  ),
  ({ id }) => (
    <PatternLines
      id={id}
      height={6}
      width={6}
      stroke="black"
      strokeWidth={1}
      orientation={['vertical', 'horizontal']}
    />
  ),
  ({ id }) => <PatternCircles id={id} height={10} width={10} fill="black" complement />,
  ({ id }) => {
    const width = 10;
    const height = 10;

    return (
      <CustomPattern id={id} width={width} height={height}>
        <animateTransform
          attributeType="xml"
          attributeName="patternTransform"
          type="translate"
          from="0 0"
          to="50 0"
          dur="10s"
          repeatCount="indefinite"
        />
        <path
          d={`M 0 ${height / 2} c ${height / 8} ${-height / 4} , ${(height * 3) / 8} ${-height /
            4} , ${height / 2} 0
               c ${height / 8} ${height / 4} , ${(height * 3) / 8} ${height / 4} , ${height /
            2} 0 M ${-height / 2} ${height / 2}
               c ${height / 8} ${height / 4} , ${(height * 3) / 8} ${height / 4} , ${height /
            2} 0 M ${height} ${height / 2}
               c ${height / 8} ${-height / 4} , ${(height * 3) / 8} ${-height / 4} , ${height /
            2} 0`}
          fill="none"
          stroke="black"
          strokeWidth={1}
        />
      </CustomPattern>
    );
  },
  ({ id }) => (
    <PatternWaves id={id} height={6} width={6} fill="transparent" stroke="black" strokeWidth={1} />
  ),
];

export default function Example({ width, height, margin = defaultMargin }: Props) {
  const numColumns = width > 600 ? 4 : 2;
  const numRows = Patterns.length / numColumns;
  const columnWidth = Math.max((width - margin.left - margin.right) / numColumns, 0);
  const rowHeight = Math.max((height - margin.bottom - margin.top) / numRows, 0);

  return (
    width >= 10 && (
      <svg width={width} height={height}>
        <rect x={0} y={0} width={width} height={height} fill="#f5f2e3" rx={14} />
        <Group top={margin.top} left={margin.left}>
          {Patterns.map((Pattern, index) => {
            const columnIndex = index % numColumns;
            const rowIndex = Math.floor(index / numColumns);
            const id = `vx-pattern-demo-${index}-${rowIndex}-${columnIndex}`;

            return (
              <React.Fragment key={id}>
                {/** Like SVG <defs />, Patterns are rendered with an id */}
                <Pattern id={id} />

                {/** And are then referenced for a style attribute. */}
                <Bar
                  fill={`url(#${id})`}
                  x={columnIndex * columnWidth}
                  y={rowIndex * rowHeight}
                  width={columnWidth}
                  height={rowHeight}
                  rx={14}
                />
              </React.Fragment>
            );
          })}
        </Group>
      </svg>
    )
  );
}
