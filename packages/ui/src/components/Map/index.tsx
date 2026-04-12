import { memo } from 'react'

import type { IBaseComponent } from '@/types'
import { clsx, prefixClass, standardizeProps } from '@/common'

import './style.scss'

/**
 * Map embeds a web-friendly map surface for a coordinate pair.
 *
 * @see https://developer.apple.com/documentation/mapkit/map
 */
export interface IMapProps extends IBaseComponent {
  latitude: number
  longitude: number
  zoom?: number
  title?: string
}

function buildEmbedUrl(latitude: number, longitude: number, zoom: number) {
  const bboxOffset = 0.08
  const left = longitude - bboxOffset
  const right = longitude + bboxOffset
  const top = latitude + bboxOffset
  const bottom = latitude - bboxOffset
  return `https://www.openstreetmap.org/export/embed.html?bbox=${left}%2C${bottom}%2C${right}%2C${top}&layer=mapnik&marker=${latitude}%2C${longitude}&zoom=${zoom}`
}

function buildOpenUrl(latitude: number, longitude: number, zoom: number) {
  return `https://www.openstreetmap.org/?mlat=${latitude}&mlon=${longitude}#map=${zoom}/${latitude}/${longitude}`
}

export const Map = memo(function Map(props: IMapProps) {
  const { latitude, longitude, title = 'Map', zoom = 13, ...restProps } = props
  const { commonProps, restProps: finalRestProps } = standardizeProps(restProps, {
    className: prefixClass('map'),
  })
  const embedUrl = buildEmbedUrl(latitude, longitude, zoom)
  const openUrl = buildOpenUrl(latitude, longitude, zoom)

  return (
    <div {...commonProps} {...finalRestProps} className={clsx(prefixClass('map'), commonProps.className)}>
      <iframe className={prefixClass('map-frame')} loading="lazy" src={embedUrl} title={title} />
      <a
        className={prefixClass('map-link')}
        href={openUrl}
        rel="noreferrer"
        target="_blank"
      >
        Open map in new tab
      </a>
    </div>
  )
})
