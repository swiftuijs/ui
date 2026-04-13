import { memo, useMemo, useState } from 'react'

import type { IBaseComponent } from '@/types'
import { clsx, prefixClass, standardizeProps } from '@/common'

import './style.scss'

/**
 * MapView embeds a web-friendly map surface for a coordinate pair.
 *
 * @see https://developer.apple.com/documentation/mapkit/map
 */
export interface IMapViewProps extends IBaseComponent {
  latitude: number
  longitude: number
  zoom?: number
  title?: string
  annotations?: Array<{
    id: string
    title: string
    latitude: number
    longitude: number
  }>
  selection?: string
  defaultSelection?: string
  onSelectionChange?: (id: string) => void
  coordinateRegion?: {
    center: {
      latitude: number
      longitude: number
    }
    span?: {
      latitudeDelta: number
      longitudeDelta: number
    }
  }
  openLabel?: string
  onOpen?: () => void
}

function buildEmbedUrl(latitude: number, longitude: number, zoom: number, span?: {
  latitudeDelta: number
  longitudeDelta: number
}) {
  const latitudeDelta = span?.latitudeDelta ?? 0.16
  const longitudeDelta = span?.longitudeDelta ?? 0.16
  const left = longitude - longitudeDelta / 2
  const right = longitude + longitudeDelta / 2
  const top = latitude + latitudeDelta / 2
  const bottom = latitude - latitudeDelta / 2
  return `https://www.openstreetmap.org/export/embed.html?bbox=${left}%2C${bottom}%2C${right}%2C${top}&layer=mapnik&marker=${latitude}%2C${longitude}&zoom=${zoom}`
}

function buildOpenUrl(latitude: number, longitude: number, zoom: number) {
  return `https://www.openstreetmap.org/?mlat=${latitude}&mlon=${longitude}#map=${zoom}/${latitude}/${longitude}`
}

export const MapView = memo(function MapView(props: IMapViewProps) {
  const {
    annotations = [],
    coordinateRegion,
    defaultSelection,
    latitude,
    longitude,
    onOpen,
    onSelectionChange,
    openLabel = 'Open map in new tab',
    selection: controlledSelection,
    title = 'Map',
    zoom = 13,
    ...restProps
  } = props
  const [internalSelection, setInternalSelection] = useState<string | undefined>(defaultSelection)
  const selection = controlledSelection ?? internalSelection
  const activeAnnotation = useMemo(
    () => annotations.find((annotation) => annotation.id === selection),
    [annotations, selection],
  )
  const centerLatitude = activeAnnotation?.latitude ?? coordinateRegion?.center.latitude ?? latitude
  const centerLongitude = activeAnnotation?.longitude ?? coordinateRegion?.center.longitude ?? longitude
  const span = coordinateRegion?.span
  const { commonProps, restProps: finalRestProps } = standardizeProps(restProps, {
    className: prefixClass('map'),
  })
  const embedUrl = buildEmbedUrl(centerLatitude, centerLongitude, zoom, span)
  const openUrl = buildOpenUrl(centerLatitude, centerLongitude, zoom)

  const handleAnnotationSelect = (id: string) => {
    if (controlledSelection === undefined) {
      setInternalSelection(id)
    }
    onSelectionChange?.(id)
  }

  return (
    <div {...commonProps} {...finalRestProps} className={clsx(prefixClass('map'), commonProps.className)}>
      <iframe className={prefixClass('map-frame')} loading="lazy" src={embedUrl} title={title} />
      {annotations.length > 0 ? (
        <div aria-label="Map annotations" className={prefixClass('map-annotations')} role="toolbar">
          {annotations.map((annotation) => (
            <button
              key={annotation.id}
              aria-pressed={annotation.id === activeAnnotation?.id}
              className={clsx(
                prefixClass('map-annotation'),
                annotation.id === activeAnnotation?.id && prefixClass('map-annotation-active'),
              )}
              onClick={() => handleAnnotationSelect(annotation.id)}
              type="button"
            >
              {annotation.title}
            </button>
          ))}
        </div>
      ) : null}
      <a
        className={prefixClass('map-link')}
        href={openUrl}
        onClick={() => onOpen?.()}
        rel="noreferrer"
        target="_blank"
      >
        {openLabel}
      </a>
    </div>
  )
})
