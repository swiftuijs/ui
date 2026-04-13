import type { Meta, StoryObj } from '@storybook/react-vite'

import { MapView } from '.'

const meta = {
  title: 'SwiftUI/MapView',
  component: MapView,
  args: {
    latitude: 37.3346,
    longitude: -122.009,
    title: 'Apple Park',
    zoom: 14,
  },
} satisfies Meta<typeof MapView>

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

export const WithAnnotations: Story = {
  args: {
    annotations: [
      { id: 'park', title: 'Apple Park', latitude: 37.3346, longitude: -122.009 },
      { id: 'visitor', title: 'Visitor Center', latitude: 37.3327, longitude: -122.0053 },
    ],
    defaultSelection: 'visitor',
    latitude: 37.3346,
    longitude: -122.009,
    title: 'Apple Campus',
  },
}
