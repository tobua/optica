import { test, expect } from 'bun:test'
import { scale, configure } from '../index'

test('Returns correct clamp function values.', () => {
  expect(scale(10)).toEqual('clamp(6.67px, calc(5.76px + 0.28vw), 10px)')
  expect(scale(20)).toEqual('clamp(13.33px, calc(11.53px + 0.56vw), 20px)')
  expect(scale(10, 2)).toEqual('clamp(5px, calc(3.65px + 0.42vw), 10px)')

  configure({ scalingFactor: 2 })

  expect(scale(10)).toEqual('clamp(5px, calc(3.65px + 0.42vw), 10px)')

  configure({ minimumViewport: 500, maximumViewport: 1000 })

  expect(scale(10)).toEqual('clamp(5px, calc(0.01px + 1vw), 10px)')

  configure({ scalingFactor: 1 })

  expect(scale(10)).toEqual('clamp(10px, calc(10px + 0vw), 10px)')
})
