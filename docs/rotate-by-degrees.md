# rotate by degrees

```sig
scaling.rot(img` `, 90)
```

Rotates the given image by the given number of degrees

## Parameters

* **im**: The image to rotate
* **deg**: The angle to rotate by, in degrees
* **padding**: (optional) how many extra pixels to around image in the final rotations

```blocks
let rotated = scaling.rot(img`
    . . . . . . . 
    5 5 5 . 5 5 5 
    5 5 5 5 5 5 5 
    5 5 5 5 5 5 5 
    5 5 5 5 5 5 5 
    5 5 5 5 5 5 5 
    . 5 5 5 5 5 . 
    . . 5 5 5 5 . 
`, 90)

let mySprite = sprites.create(rotated, SpriteKind.Player)
```

```package
pxt-scaling=github:jwunderl/pxt-scaling
```