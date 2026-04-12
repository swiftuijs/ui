import { memo } from 'react'

import { prefixClass, standardizeProps } from '@/common'
import type { IBaseComponent } from '@/types'

import './style.scss'

export interface IChartDatum {
  id?: string
  label: string
  value: number
}

export interface IChartProps extends IBaseComponent {
  data: IChartDatum[]
  label: string
  caption?: string
  mark?: 'bar' | 'line'
  showValues?: boolean
  emptyState?: string
  height?: number
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

export const Chart = memo(function Chart(props: IChartProps) {
  const {
    caption,
    data,
    emptyState = 'No data available',
    height = 220,
    label,
    mark = 'bar',
    showValues = false,
    ...restProps
  } = props

  const { commonProps, restProps: finalRestProps } = standardizeProps(restProps, {
    className: [
      prefixClass('chart'),
      prefixClass(`chart-${mark}`),
    ],
  })

  if (!data.length) {
    return (
      <div {...commonProps} {...finalRestProps}>
        {caption ? <div className={prefixClass('chart-caption')}>{caption}</div> : null}
        <div className={prefixClass('chart-empty')}>{emptyState}</div>
      </div>
    )
  }

  const safeMax = Math.max(...data.map((item) => item.value), 0, 1)
  const width = Math.max(data.length * 72, 240)
  const chartHeight = height - 40
  const step = width / data.length
  const barWidth = Math.max(step * 0.58, 18)
  const linePoints = data.map((item, index) => {
    const x = step * index + step / 2
    const y = chartHeight - clamp((item.value / safeMax) * chartHeight, 0, chartHeight)
    return { x, y }
  })
  const pathData = linePoints
    .map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`)
    .join(' ')

  return (
    <div {...commonProps} {...finalRestProps}>
      {caption ? <div className={prefixClass('chart-caption')}>{caption}</div> : null}
      <svg
        aria-label={label}
        className={prefixClass('chart-canvas')}
        role="img"
        viewBox={`0 0 ${width} ${height}`}
      >
        <line
          className={prefixClass('chart-axis')}
          x1={0}
          x2={width}
          y1={chartHeight}
          y2={chartHeight}
        />
        {mark === 'bar'
          ? data.map((item, index) => {
              const barHeight = clamp((item.value / safeMax) * (chartHeight - 12), 0, chartHeight - 12)
              const x = step * index + (step - barWidth) / 2
              const y = chartHeight - barHeight

              return (
                <g key={item.id ?? item.label}>
                  <rect
                    className={prefixClass('chart-bar')}
                    data-testid="chart-bar"
                    height={barHeight}
                    rx={10}
                    ry={10}
                    width={barWidth}
                    x={x}
                    y={y}
                  />
                  {showValues ? (
                    <text
                      className={prefixClass('chart-value')}
                      textAnchor="middle"
                      x={x + barWidth / 2}
                      y={Math.max(y - 8, 12)}
                    >
                      {item.value}
                    </text>
                  ) : null}
                  <text
                    className={prefixClass('chart-label')}
                    textAnchor="middle"
                    x={x + barWidth / 2}
                    y={height - 8}
                  >
                    {item.label}
                  </text>
                </g>
              )
            })
          : (
            <g>
              <path
                className={prefixClass('chart-line')}
                data-testid="chart-line"
                d={pathData}
                fill="none"
              />
              {linePoints.map((point, index) => (
                <g key={data[index]?.id ?? data[index]?.label}>
                  <circle
                    className={prefixClass('chart-point')}
                    cx={point.x}
                    cy={point.y}
                    r={4}
                  />
                  {showValues ? (
                    <text
                      className={prefixClass('chart-value')}
                      textAnchor="middle"
                      x={point.x}
                      y={Math.max(point.y - 10, 12)}
                    >
                      {data[index]?.value}
                    </text>
                  ) : null}
                  <text
                    className={prefixClass('chart-label')}
                    textAnchor="middle"
                    x={point.x}
                    y={height - 8}
                  >
                    {data[index]?.label}
                  </text>
                </g>
              ))}
            </g>
            )}
      </svg>
    </div>
  )
})
