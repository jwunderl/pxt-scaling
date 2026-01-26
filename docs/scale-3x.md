# scale 3x

```sig
scaling.scale3x(img` `)
```

Enlarges the given image by 3 times

## Parameters

* **im**: The image to rotate

```blocks
let scaled = scaling.scale3x(img`
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