import { memo, useEffect, useMemo, useRef, useState, type ComponentRef, type KeyboardEvent } from 'react'

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
  selectedDatumId?: string
  defaultSelectedDatumId?: string
  onSelectionChange?: (datum: IChartDatum) => void
  valueFormatter?: (value: number, datum: IChartDatum) => string
}

type ChartMarkElement = ComponentRef<'g'>

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

export const Chart = memo(function Chart(props: IChartProps) {
  const {
    caption,
    data,
    defaultSelectedDatumId,
    emptyState = 'No data available',
    height = 220,
    label,
    mark = 'bar',
    onSelectionChange,
    selectedDatumId,
    showValues = false,
    valueFormatter,
    ...restProps
  } = props
  const [uncontrolledSelection, setUncontrolledSelection] = useState<string | undefined>(defaultSelectedDatumId)
  const isControlled = selectedDatumId !== undefined
  const currentSelection = isControlled ? selectedDatumId : uncontrolledSelection
  const markRefs = useRef<Array<ChartMarkElement | null>>([])
  const normalizedData = useMemo(() => data.map((item, index) => ({
    ...item,
    chartId: item.id ?? item.label ?? `datum-${index}`,
  })), [data])

  useEffect(() => {
    if (!isControlled) {
      setUncontrolledSelection(defaultSelectedDatumId)
    }
  }, [defaultSelectedDatumId, isControlled])

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
  function formatValue(value: number, datum: IChartDatum) {
    return valueFormatter ? valueFormatter(value, datum) : String(value)
  }

  function handleSelection(datum: IChartDatum & { chartId: string }) {
    if (currentSelection === datum.chartId) {
      return
    }

    if (!isControlled) {
      setUncontrolledSelection(datum.chartId)
    }
    const { chartId: _chartId, ...publicDatum } = datum
    onSelectionChange?.(publicDatum)
  }

  function focusAndSelect(nextIndex: number) {
    if (!normalizedData.length) {
      return
    }

    const boundedIndex = (nextIndex + normalizedData.length) % normalizedData.length
    const nextDatum = normalizedData[boundedIndex]

    if (!nextDatum) {
      return
    }

    markRefs.current[boundedIndex]?.focus()
    handleSelection(nextDatum)
  }

  function handleMarkKeyDown(event: KeyboardEvent<ChartMarkElement>, index: number) {
    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        event.preventDefault()
        focusAndSelect(index + 1)
        break
      case 'ArrowLeft':
      case 'ArrowUp':
        event.preventDefault()
        focusAndSelect(index - 1)
        break
      case 'Home':
        event.preventDefault()
        focusAndSelect(0)
        break
      case 'End':
        event.preventDefault()
        focusAndSelect(normalizedData.length - 1)
        break
      case 'Enter':
      case ' ':
        event.preventDefault()
        handleSelection(normalizedData[index])
        break
      default:
        break
    }
  }

  function isSelected(datum: { chartId: string }) {
    return currentSelection === datum.chartId
  }

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
          ? normalizedData.map((item, index) => {
              const barHeight = clamp((item.value / safeMax) * (chartHeight - 12), 0, chartHeight - 12)
              const x = step * index + (step - barWidth) / 2
              const y = chartHeight - barHeight
              const selected = isSelected(item)
              const formattedValue = formatValue(item.value, item)

              return (
                <g
                  aria-label={`${item.label}: ${formattedValue}`}
                  aria-pressed={selected}
                  className={prefixClass('chart-mark')}
                  data-selected={selected ? 'true' : 'false'}
                  key={item.chartId}
                  ref={(node) => {
                    markRefs.current[index] = node
                  }}
                  onClick={() => handleSelection(item)}
                  onKeyDown={(event) => handleMarkKeyDown(event, index)}
                  role="button"
                  tabIndex={selected || (!currentSelection && index === 0) ? 0 : -1}
                >
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
                      {formattedValue}
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
              {linePoints.map((point, index) => {
                const datum = normalizedData[index]
                if (!datum) return null
                const selected = isSelected(datum)
                const formattedValue = formatValue(datum.value, datum)

                return (
                <g
                  aria-label={`${datum.label}: ${formattedValue}`}
                  aria-pressed={selected}
                  className={prefixClass('chart-mark')}
                  data-selected={selected ? 'true' : 'false'}
                  key={datum.chartId}
                  ref={(node) => {
                    markRefs.current[index] = node
                  }}
                  onClick={() => handleSelection(datum)}
                  onKeyDown={(event) => handleMarkKeyDown(event, index)}
                  role="button"
                  tabIndex={selected || (!currentSelection && index === 0) ? 0 : -1}
                >
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
                      {formattedValue}
                    </text>
                  ) : null}
                  <text
                    className={prefixClass('chart-label')}
                    textAnchor="middle"
                    x={point.x}
                    y={height - 8}
                  >
                    {datum.label}
                  </text>
                </g>
              )})}
            </g>
            )}
      </svg>
    </div>
  )
})
