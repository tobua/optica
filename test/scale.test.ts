import { test, expect } from 'bun:test'
import { scale, configure } from '../index'

const getComputedValuesByViewport = (cssExpression: string) => {
  console.log(cssExpression)
  const regex = /calc\((-?\d*\.?\d+)px\s*\+\s*(-?\d*\.?\d+)vw\)/g
  const matches = [...cssExpression.matchAll(regex)][0]

  const pxValue = parseFloat(matches[1])
  const vwValue = parseFloat(matches[2])

  const viewportValue = (viewport: number) => Math.round(pxValue + (viewport * vwValue) / 100)

  return {
    minimum: viewportValue(320), // Should be equal to minimum breakpoint.
    500: viewportValue(500),
    middle: viewportValue(910), // Middle between minimum and maximum.
    1200: viewportValue(1200),
    maximum: viewportValue(1500), // Should be equal to maximum breakpoint.
  }
}

test('Returns correct clamp function values.', () => {
  expect(scale(10)).toEqual('clamp(6.67px, calc(5.76px + 0.28vw), 10px)')
  expect(scale(15)).toEqual('clamp(10px, calc(8.65px + 0.42vw), 15px)')
  expect(scale(20)).toEqual('clamp(13.33px, calc(11.53px + 0.56vw), 20px)')

  const regularValues = getComputedValuesByViewport(scale(10))
  expect(regularValues.minimum).toBe(7)
  expect(regularValues.middle).toBe(8)
  expect(regularValues.maximum).toBe(10)
})

test('scale: second argument can either be the scalingFactor or the minimum target size.', () => {
  // Choice between factor and minimum is an approximation and not perfect.
  expect(scale(10, 2)).toEqual('clamp(5px, calc(3.65px + 0.42vw), 10px)')
  expect(scale(10, 8)).toEqual('clamp(8px, calc(7.46px + 0.17vw), 10px)')
  expect(scale(30, 10)).toEqual('clamp(10px, calc(4.58px + 1.69vw), 30px)')
  expect(scale(45, 3)).toEqual('clamp(15px, calc(6.87px + 2.54vw), 45px)')
  expect(scale(2, 1)).toEqual('clamp(1px, calc(0.73px + 0.08vw), 2px)')
  expect(scale(5, 3)).toEqual('clamp(3px, calc(2.46px + 0.17vw), 5px)')
  expect(scale(16, 3)).toEqual('clamp(5.33px, calc(2.44px + 0.9vw), 16px)')
  expect(scale(16, 2)).toEqual('clamp(8px, calc(5.83px + 0.68vw), 16px)')
  expect(scale(16, 4)).toEqual('clamp(4px, calc(0.75px + 1.02vw), 16px)')
  expect(scale(16, 5)).toEqual('clamp(5px, calc(2.02px + 0.93vw), 16px)')
})

test('scale: also works when the second argument is larger than the first.', () => {
  // NOTE left and right clamp values need to switch side.
  expect(scale(10, 20)).toEqual('clamp(10px, calc(22.71px + -0.85vw), 20px)')
  expect(scale(5, 12)).toEqual('clamp(5px, calc(13.9px + -0.59vw), 12px)')
  expect(scale(10, 100)).toEqual('clamp(10px, calc(124.39px + -7.62vw), 100px)')

  const largerValues = getComputedValuesByViewport(scale(12, 24))
  expect(largerValues.minimum).toBe(24)
  expect(largerValues.middle).toBe(18)
  expect(largerValues.maximum).toBe(12)
})

test('scale: can be used with negative input values.', () => {
  expect(scale(-10)).toEqual('clamp(-10px, calc(-5.76px + -0.28vw), -6.67px)')
  expect(scale(-10, -5)).toEqual('clamp(-10px, calc(-3.65px + -0.42vw), -5px)')
  expect(scale(-10, -20)).toEqual('clamp(-20px, calc(-22.71px + 0.85vw), -10px)')

  const negativeValues = getComputedValuesByViewport(scale(-10))
  expect(negativeValues.minimum).toBe(-7)
  expect(negativeValues.middle).toBe(-8)
  expect(negativeValues.maximum).toBe(-10)

  const largeNegativeValues = getComputedValuesByViewport(scale(-10, -100))
  expect(largeNegativeValues.minimum).toBe(-100)
  expect(largeNegativeValues.middle).toBe(-55)
  expect(largeNegativeValues.maximum).toBe(-10)
})

test('configure: default parameters can be configured.', () => {
  expect(scale(10)).toEqual('clamp(6.67px, calc(5.76px + 0.28vw), 10px)')
  configure({ scalingFactor: 2 })
  expect(scale(10)).toEqual('clamp(5px, calc(3.65px + 0.42vw), 10px)')
  configure({ minimumViewport: 500, maximumViewport: 1000 })
  expect(scale(10)).toEqual('clamp(5px, calc(0.01px + 1vw), 10px)')
  configure({ scalingFactor: 1 })
  expect(scale(10)).toEqual('clamp(10px, calc(10px + 0vw), 10px)')
  // Second argument to scale has precedence over configuration override.
  expect(scale(10, 2)).toEqual('clamp(5px, calc(0.01px + 1vw), 10px)')
})
