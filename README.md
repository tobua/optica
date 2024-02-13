<p align="center">
  <img src="https://github.com/tobua/optica/raw/main/logo.png" alt="avait" width="50%">
</p>

# optica

Responsively scaling CSS properties for JavaScript, successor to [wasser](https://github.com/tobua/wasser). Linearly scales a value between a minimum and a maximum breakpoint. Requires only the CSS [`clamp`](https://developer.mozilla.org/en-US/docs/Web/CSS/clamp) function, no breakpoints.

## Usage

```tsx
import React from 'react'
import { createRoot } from 'react-dom/client'
import { scale } from 'optica'

createRoot(document.body).render(
  <div style={{ margin: scale(10), background: 'gray', borderRadius: scale(5) }}>
    <h1 style={{ fontSize: scale(24) }}>Title</h1>
    <p style={{ fontSize: scale(24) }}>Description</p>
  </div>,
)
```

The plugin will convert `scale(15)` into `clamp(10px, calc(8.65px + 0.42vw), 15px)` which will ensure any sized CSS property will linearly scale between `10px` for the `minimumViewport` (320px) and `15px` for the `maximumViewport` (1500px).

## Configuration

By default values will scale between the `320px` and the `1500px` breakpoint with a scaling factor of `1.5`. The `scale` method can additionally receive a custom scaling factor as the second argument.

```tsx
import { configure, scale } from 'optica'

configure({
  minimumViewport: 400, // Default 320
  maximumViewport: 1200, // Default 1500
  scalingFactor: 2, // Default: 1.5
})

const MyCustomText = () => <span style={{ fontSize: scale(18) }} /> // 9px - 18px instead of 12px - 18px
```

`scale(maximumSize: number, scalingFactorOrMinimumSize: number)` also takes a second argument. Depending on the size it's either a `scalingFactor` or an explicit `minimumSize`.

```ts
scale(18, 3) // scaleFactor of 3: 6px - 18px
scale(18, 1.2) // scaleFactor of 1.2: 15px - 18px
scale(18, 12) // minimumSize of 12: 12px - 18px
scale(18, 16) // minimumSize of 16: 16px - 18px
```
