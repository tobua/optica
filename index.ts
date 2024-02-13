const configuration = {
  minimumViewport: 320,
  maximumViewport: 1500,
  scalingFactor: 1.5,
}

const round = (value: number) => Math.round(value * 100) / 100 // Round to two-digits: 12.34

export function configure(values: Partial<typeof configuration>) {
  Object.assign(configuration, values)
}

function getMinimumSize(maximumSize: number, input: number) {
  if (input < maximumSize / 5) return maximumSize / input
  if (input > 5) return input
  if (input < maximumSize / 3 && input < 3) return maximumSize / input
  return input
}

export function scale(
  maximumSize: number,
  scalingFactorOrMinimumSize = configuration.scalingFactor,
) {
  const minimumSize = getMinimumSize(maximumSize, scalingFactorOrMinimumSize)
  const multiplier =
    (maximumSize - minimumSize) /
    (configuration.maximumViewport - (configuration.minimumViewport - 1))
  return `clamp(${round(minimumSize)}px, calc(${round(minimumSize - multiplier * configuration.minimumViewport)}px + ${round(multiplier * 100)}vw), ${maximumSize}px)`
}
