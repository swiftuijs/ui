import type { Meta, StoryObj } from '@storybook/react-vite'

import { Map } from '.'

const meta = {
  title: 'SwiftUI/Map',
  component: Map,
  args: {
    latitude: 37.3346,
    longitude: -122.009,
    title: 'Apple Park',
    zoom: 14,
  },
} satisfies Meta<typeof Map>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const CityLandmark: Story = {
  args: {
    latitude: 40.7484,
    longitude: -73.9857,
    title: 'Empire State Building',
  },
}

export const Region: Story = {
  args: {
    coordinateRegion: {
      center: {
        latitude: 37.3346,
        longitude: -122.009,
      },
      span: {
        latitudeDelta: 0.2,
        longitudeDelta: 0.3,
      },
    },
    latitude: 37.3346,
    longitude: -122.009,
    openLabel: 'Open in Maps',
    title: 'Apple Park Region',
  },
}
