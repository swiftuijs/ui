export interface IGradientStop {
  color: string
  location?: number
}

export type IUnitPoint =
  | 'center'
  | 'top'
  | 'bottom'
  | 'leading'
  | 'trailing'
  | 'topLeading'
  | 'topTrailing'
  | 'bottomLeading'
  | 'bottomTrailing'

export function formatStops(stops: IGradientStop[]) {
  return stops
    .map((stop) => {
      if (stop.location === undefined) {
        return stop.color
      }

      return `${stop.color} ${stop.location * 100}%`
    })
    .join(', ')
}

export function resolveLinearDirection(startPoint: IUnitPoint, endPoint: IUnitPoint) {
  const key = `${startPoint}-${endPoint}`

  const directions: Record<string, string> = {
    'top-bottom': 'to bottom',
    'bottom-top': 'to top',
    'leading-trailing': 'to right',
    'trailing-leading': 'to left',
    'topLeading-bottomTrailing': 'to bottom right',
    'bottomTrailing-topLeading': 'to top left',
    'topTrailing-bottomLeading': 'to bottom left',
    'bottomLeading-topTrailing': 'to top right',
  }

  return directions[key] ?? 'to bottom'
}

export function resolvePosition(point: IUnitPoint) {
  const positions: Record<IUnitPoint, string> = {
    center: 'center',
    top: 'top center',
    bottom: 'bottom center',
    leading: 'center left',
    trailing: 'center right',
    topLeading: 'top left',
    topTrailing: 'top right',
    bottomLeading: 'bottom left',
    bottomTrailing: 'bottom right',
  }

  return positions[point]
}
