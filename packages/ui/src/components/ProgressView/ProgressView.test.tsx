import { describe, expect, it } from 'vitest'
import { render, screen } from '@/testing/render'
import { ProgressView } from './index'

describe('ProgressView', () => {
  describe('primitive checklist', () => {
    it('exposes determinate progress through progressbar semantics', () => {
      render(
        <ProgressView
          aria-label="Upload progress"
          value={30}
          total={120}
        />
      )

      const progressbar = screen.getByRole('progressbar', { name: 'Upload progress' })

      expect(progressbar).toHaveAttribute('aria-valuemin', '0')
      expect(progressbar).toHaveAttribute('aria-valuemax', '120')
      expect(progressbar).toHaveAttribute('aria-valuenow', '30')
      expect(progressbar).toHaveAttribute('aria-valuetext', '25%')
    })

    it('supports legacy fractional progress values', () => {
      render(
        <ProgressView
          aria-label="Legacy progress"
          progress={0.5}
        />
      )

      expect(screen.getByRole('progressbar', { name: 'Legacy progress' })).toHaveAttribute('aria-valuenow', '0.5')
      expect(screen.getByRole('progressbar', { name: 'Legacy progress' })).toHaveAttribute('aria-valuemax', '1')
    })

    it('omits value semantics for indeterminate progress', () => {
      render(
        <ProgressView
          aria-label="Loading"
          indeterminate
        />
      )

      const progressbar = screen.getByRole('progressbar', { name: 'Loading' })

      expect(progressbar).toHaveAttribute('aria-valuemin', '0')
      expect(progressbar).not.toHaveAttribute('aria-valuemax')
      expect(progressbar).not.toHaveAttribute('aria-valuenow')
    })

    it('renders optional labels alongside the progress indicator', () => {
      render(
        <ProgressView
          aria-label="Download"
          value={0.4}
          label="Downloading update"
          currentValueLabel="40%"
        />
      )

      expect(screen.getByText('Downloading update')).toBeInTheDocument()
      expect(screen.getByText('40%')).toBeInTheDocument()
    })
  })
})
