# scale half

```sig
scaling.scaleHalfX(img` `)
```

Enlarges the given image by 2 times

## Parameters

* **im**: The image to rotate

```blocks
let scaled = scaling.scaleHalfX(img`
    . . . . . . . 
    5 5 5 . 5 5 5 
    5 5 5 5 5 5 5 
    5 5 5 5 5 5 5 
    5 5 5 5 5 5 5 
    5 5 5 5 5 5 5 
    . 5 5 5 5 5 . 
    . . 5 5 5 5 . 
`, 90)

let mySprite = sprites.create(scaled, SpriteKind.Player)
```

```package
pxt-scaling=github:jwunderl/pxt-scaling
```