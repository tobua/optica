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
  </div>
)
```

## Configuration

By default values will scale between the `320px` and the `1500px` breakpoint with a scaling factor of `1.5`. The `scale` method can additionally receive a custom scaling factor as the second argument.

```tsx
import { configure, scale } from 'optica'

configure({
    minimumViewport: 400,
    maximumViewport: 1200,
    scalingFactor: 2
})

const MyText = () => <span style={{ fontSize: scale(16, 3) }}>
```