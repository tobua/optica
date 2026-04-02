const Constants = {
  minimumViewport: 320,
  maximumViewport: 1500,
  defaultScalingFactor: 1.5,
  viewportOffset: 1,

  roundFactor: 100,

  maximumSizeAbsDivisorLow: 5,
  inputAbsThresholdHigh: 5,
  maximumSizeDivisorMid: 3,
  inputAbsThresholdMid: 3,

  vwFactor: 100,
}

const configuration = {
  minimumViewport: Constants.minimumViewport,
  maximumViewport: Constants.maximumViewport,
  scalingFactor: Constants.defaultScalingFactor,
}

const round = (value: number) => Math.round(value * Constants.roundFactor) / Constants.roundFactor // Round to two-digits: 12.34

export const configure = (values: Partial<typeof configuration>) => Object.assign(configuration, values)

function getMinimumSize(maximumSize: number, input: number): number {
  const absInput = Math.abs(input)
  if (absInput < Math.abs(maximumSize) / Constants.maximumSizeAbsDivisorLow) return maximumSize / input
  if (absInput > Constants.inputAbsThresholdHigh) return input
  if (absInput < maximumSize / Constants.maximumSizeDivisorMid && absInput < Constants.inputAbsThresholdMid) return maximumSize / input
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
  if (maximumSize === 0) return '0'
  const minimumSize = getMinimumSize(maximumSize, scalingFactorOrMinimumSize)
  const multiplier =
    (maximumSize - minimumSize) / (configuration.maximumViewport - (configuration.minimumViewport - Constants.viewportOffset))
  return `clamp(${leftValue(minimumSize, maximumSize)}px, calc(${round(
    minimumSize - multiplier * configuration.minimumViewport,
  )}px + ${round(multiplier * Constants.vwFactor)}vw), ${rightValue(minimumSize, maximumSize)}px)`
}
