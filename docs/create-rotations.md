# create rotations

```sig
scaling.createRotations(img` `, 8)
```

Creates an Array with the given number 

## Parameters

* **im**: The image to rotate
* **count**: The number of rotated versions to make
* **padding**: (optional) how many extra pixels to around image in the final rotations

```blocks
let myScaledImages = scaling.createRotations(img`
    . . . . . . . 
    5 5 5 . 5 5 5 
    5 5 5 5 5 5 5 
    5 5 5 5 5 5 5 
    5 5 5 5 5 5 5 
    5 5 5 5 5 5 5 
    . 5 5 5 5 5 . 
    . . 5 5 5 5 . 
`, 8)

for (let i = 0; i < myScaledImages.length; i++) {
    let projectile = sprites.createProjectileFromSide(myScaledImages[i], 50, 50)
    pause(500)
}
```

```package
pxt-scaling=github:jwunderl/pxt-scaling
```