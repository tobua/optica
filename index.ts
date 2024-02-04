const configuration = {
  minimumViewport: 320,
  maximumViewport: 1500,
  scalingFactor: 1.5,
}

const round = (value: number) => Math.round(value * 100) / 100 // Round to two-digits: 12.34

export function configure(values: Partial<typeof configuration>) {
  Object.assign(configuration, values)
}

export function scale(size: number, scalingFactor = configuration.scalingFactor) {
  const minimumSize = size / scalingFactor
  const multiplier =
    (size - minimumSize) / (configuration.maximumViewport - (configuration.minimumViewport - 1))
  return `clamp(${round(minimumSize)}px, calc(${round(minimumSize - multiplier * configuration.minimumViewport)}px + ${round(multiplier * 100)}vw), ${size}px)`
}
