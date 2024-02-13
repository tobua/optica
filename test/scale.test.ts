import { test, expect } from 'bun:test'
import { scale, configure } from '../index'

test('Returns correct clamp function values.', () => {
  expect(scale(10)).toEqual('clamp(6.67px, calc(5.76px + 0.28vw), 10px)')
  expect(scale(15)).toEqual('clamp(10px, calc(8.65px + 0.42vw), 15px)')
  expect(scale(20)).toEqual('clamp(13.33px, calc(11.53px + 0.56vw), 20px)')
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
