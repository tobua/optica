const configuration = {
  minimumViewport: 320,
  maximumViewport: 1500,
  scalingFactor: 1.5,
}

const round = (value: number) => Math.round(value * 100) / 100 // Round to two-digits: 12.34

export const configure = (values: Partial<typeof configuration>) => Object.assign(configuration, values)

function getMinimumSize(maximumSize: number, input: number): number {
  const absInput = Math.abs(input)
  if (absInput < Math.abs(maximumSize) / 5) return maximumSize / input
  if (absInput > 5) return input
  if (absInput < maximumSize / 3 && absInput < 3) return maximumSize / input
  return input
}

function leftValue(minimumSize: number, maximumSize: number) {
  if (maximumSize < 0) return round(Math.min(maximumSize, minimumSize))
  return round(Math.min(maximumSize, minimumSize))
}

function rightValue(minimumSize: number, maximumSize: number) {
  if (maximumSize < 0) return round(Math.max(maximumSize, minimumSize))
  return round(Math.max(maximumSize, minimumSize))
}

export function scale(maximumSize: number, scalingFactorOrMinimumSize = configuration.scalingFactor) {
  const minimumSize = getMinimumSize(maximumSize, scalingFactorOrMinimumSize)
  const multiplier = (maximumSize - minimumSize) / (configuration.maximumViewport - (configuration.minimumViewport - 1))
  return `clamp(${leftValue(minimumSize, maximumSize)}px, calc(${round(
    minimumSize - multiplier * configuration.minimumViewport,
  )}px + ${round(multiplier * 100)}vw), ${rightValue(minimumSize, maximumSize)}px)`
}
