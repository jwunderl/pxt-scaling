
const prepTest = () => {
    game.popScene();
    game.pushScene();
    scene.setBackgroundColor(0xD)
}

control.runInParallel(function () {
    while (true) {
        testArbitraryRot();
        testRotSquareAndScale();
        testTrim();
        smolStrawberry();
        testScalingSpeed();
    };
})

function testArbitraryRot() {
    prepTest();
    const mySprite = sprites.create(img`
        . . . . . . . . . . b 5 b . . .
        . . . . . . . . . b 5 b . . . .
        . . . . . . b b b b b b . . . .
        . . . . . b b 5 5 5 5 5 b . . .
        . . . . b b 5 d 1 f 5 d 4 c . .
        . . . . b 5 5 1 f f d d 4 4 4 b
        . . . . b 5 5 d f b 4 4 4 4 b .
        . . . b d 5 5 5 5 4 4 4 4 b . .
        . . b d d 5 5 5 5 5 5 5 5 b . .
        . b d d d d 5 5 5 5 5 5 5 5 b .
        b d d d b b b 5 5 5 5 5 5 5 b .
        c d d b 5 5 d c 5 5 5 5 5 5 b .
        c b b d 5 d c d 5 5 5 5 5 5 b .
        . b 5 5 b c d d 5 5 5 5 5 d b .
        b b c c c d d d d 5 5 5 b b . .
        . . . c c c c c c c c b b . . .
    `)
    mySprite.x -= 30;
    const rotSprite = sprites.create(mySprite.image.clone());
    rotSprite.x += 30;
    rotSprite.y -= 15;
    const rotSpriteWithPadding = sprites.create(mySprite.image.clone());
    rotSpriteWithPadding.x += 30;
    rotSpriteWithPadding.y += 15;

    for (let i = 10; i <= 720; i += 5) {
        pause(20)
        rotSprite.setImage(scaling.rot(mySprite.image, i));
        rotSpriteWithPadding.setImage(scaling.rot(mySprite.image, i, 1));
    }
}

function testScalingSpeed() {
    prepTest();
    const mySprite = sprites.create(img`
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . b 5 5 b . . .
        . . . . . . b b b b b b . . . .
        . . . . . b b 5 5 5 5 5 b . . .
        . b b b b b 5 5 5 5 5 5 5 b . .
        . b d 5 b 5 5 5 5 5 5 5 5 b . .
        . . b 5 5 b 5 d 1 f 5 d 4 f . .
        . . b d 5 5 b 1 f f 5 4 4 c . .
        b b d b 5 5 5 d f b 4 4 4 4 b .
        b d d c d 5 5 b 5 4 4 4 4 4 4 b
        c d d d c c b 5 5 5 5 5 5 5 b .
        c b d d d d d 5 5 5 5 5 5 5 b .
        . c d d d d d d 5 5 5 5 5 d b .
        . . c b d d d d d 5 5 5 b b . .
        . . . c c c c c c c c b b . . .
    `);
    
    mySprite.x -= 30;
    const scaleSprite = sprites.create(scaling.scale3x(mySprite.image));
    scaleSprite.x += 20;
    for (let i = 0; i <= 500; ++i) {
        pause(10);
        mySprite.image.setPixel(
            Math.randomRange(0, 15),
            Math.randomRange(0, 15),
            Math.randomRange(10, 0xf)
        );
        scaleSprite.setImage(scaling.scale3x(mySprite.image))
    }
}

function testRotSquareAndScale() {
    prepTest();
    const mySprite = sprites.create(img`1`);
    mySprite.top = 5;
    mySprite.left = 5;

    const scale2xSprite = sprites.create(img`1`);
    scale2xSprite.top = 10;
    scale2xSprite.left = 80;

    const scale3xSprite = sprites.create(img`1`);
    scale3xSprite.top = screen.height >> 1;
    scale3xSprite.left = 5;

    const scale4xSprite = sprites.create(img`1`);
    scale4xSprite.top = (screen.height >> 1) - 15;
    scale4xSprite.left = screen.width >> 1;

    const rot90Sprite = sprites.create(img`1`);
    rot90Sprite.top = 5;
    rot90Sprite.left = 40;

    const rot180Sprite = sprites.create(img`1`);
    rot180Sprite.top = 35;
    rot180Sprite.left = 5;

    const rot270Sprite = sprites.create(img`1`);
    rot270Sprite.top = 35;
    rot270Sprite.left = 40;

    const imgs = [
        img`
            . . . . . . . . . . . . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . f . . . . . . f . . . . . . .
            . . f . . . . . . . . . f . . . . . . . . . . . . . .
            . . . f . . . . . f f f f f f f . . . f f . . . . . .
            . . . . f . . . . . . . f . . . . . . f f . . . . . .
            . . . . . f . . . . . . f . . . . . . . . . . . . . .
            . . . . . . f . . . . . f . . . . . . f f f . f f f .
            . . . . . . . f . . . . f . . . . . . f f f . f . f .
            . . . . . . . . . . . . . . . . . . . f f f . f f f .
            . . . . . . . . . . . . . . . . . . . . . . . . . . .
            . . f . . . f . f . . . . . . . . . . . . . . . . . .
            . . . f . f . . . f . . . . . . . . f f . . . . . . .
            . . . . f . . . f . . . f . . . . . f f . . . . . . .
            . . . f . f . . . f . . f . . . . . . . f f . . . . .
            . . f . . . f . . . . . f . . . . . . . f f . . . . .
            . . . . . . . . . . . f f f f f . . f f . . . . . . .
            . . . . . . . . . . . . . . . . . . f f . . . . . . .
            . . f . . . . . . . . . . . . . . . . . f f . . . . .
            . . f f . . . . . . . . . . . . . . . . f f . . . . .
            . . f f f . . . . . . . . . . . . . . . . . . . . . .
            . . f f f f . . . . . . . . . . . . . . . . . . . . .
            . . f f f f f . . . . . . . . . . . . . . . . . . . .
            . . f f f f . . . . . . . . . . . . . . . . . . . . .
            . . f f f . . . . . . . . . . . . . . . . . . . . . .
            . . f f . . . . . . . . . . . . . . . . . . . . . . .
            . . f . . . . . . . . . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . . . . . . . . . . . . .
        `,
        img`
            . . . . . . . .
            . . . . . . . .
            . . . . . . . .
            . . c c c . . .
            . c c 6 6 c . .
            c c 3 3 f 6 c .
            c 6 c f 6 3 c .
            c 3 6 3 3 3 c .
            c 3 6 6 3 3 c .
            c 3 3 6 6 3 c .
            . c 3 3 3 6 . .
            . . 6 7 6 . . .
            . . 6 6 8 8 8 6
            . . 6 8 7 7 7 6
            . . 8 7 7 7 6 .
            . . 8 8 8 6 . .
        `,
        img`
            . . . . . . . 6 . . . . . . . .
            . . . . . . 8 6 6 . . . 6 8 . .
            . . . e e e 8 8 6 6 . 6 7 8 . .
            . . e 2 2 2 2 e 8 6 6 7 6 . . .
            . e 2 2 4 4 2 7 7 7 7 7 8 6 . .
            . e 2 4 4 2 6 7 7 7 6 7 6 8 8 .
            e 2 4 5 2 2 6 7 7 6 2 7 7 6 . .
            e 2 4 4 2 2 6 7 6 2 2 6 7 7 6 .
            e 2 4 2 2 2 6 6 2 2 2 e 7 7 6 .
            e 2 4 2 2 4 2 2 2 4 2 2 e 7 6 .
            e 2 4 2 2 2 2 2 2 2 2 2 e c 6 .
            e 2 2 2 2 2 2 2 4 e 2 e e c . .
            e e 2 e 2 2 4 2 2 e e e c . . .
            e e e e 2 e 2 2 e e e c . . . .
            e e e 2 e e c e c c c . . . . .
            . c c c c c c c . . . . . . . .
        `,
        img`
            . . . . . . . . . . . . . . . .
            . . . . . . . c c c c c c . . .
            . . . . . . c 5 5 5 5 5 c c . .
            . . . . . c 5 5 5 5 5 5 5 5 c .
            . . . . c b b b b b b 5 5 5 c .
            . . . . c b b b b 1 b b c c . .
            . . . . c 1 1 b b 1 1 1 c . . .
            . . . c 1 1 1 1 b 1 1 1 c . . .
            . . . c 1 1 1 1 b 1 1 1 b b c c
            . . c c d 1 1 1 b 1 b 1 5 5 5 c
            . . c c d 1 c 1 1 1 b 1 b b 5 c
            . c c d d 1 1 1 1 1 b 1 f b 5 c
            f d d d 1 1 1 1 1 b b b f . c c
            f f f f f 1 1 1 b b 5 5 5 f . .
            . . . . . f f f 5 5 5 5 5 f . .
            . . . . . . . . f f f f f f . .
        `,
        img`
            . . . . . . . . . . . . . . . .
            . . . . . . . c c c c c . . . .
            . . . . . . c d d d d d c . . .
            . . . . . . c c c c c d c . . .
            . . . . . c 4 4 4 4 d c c . . .
            . . . . c d 4 4 4 4 4 1 c . . .
            . . . c 4 4 1 4 4 4 4 4 1 c . .
            . . c 4 4 4 4 1 4 4 4 4 1 c c c
            . c 4 4 4 4 4 1 c c 4 4 1 4 4 c
            . c 4 4 4 4 4 1 4 4 f 4 1 f 4 f
            f 4 4 4 4 f 4 1 c 4 f 4 d f 4 f
            f 4 4 4 4 4 4 1 4 f f 4 f f 4 f
            . f 4 4 4 4 1 4 4 4 4 c b c f f
            . . f f f d 4 4 4 4 c d d c . .
            . . . . . f f f f f c c c . . .
            . . . . . . . . . . . . . . . .
        `,
        img`
            . . 6 6 6 6 . .
            . 6 d 4 4 4 6 .
            6 1 b 1 1 4 d 6
            c 1 b b 4 4 1 c
            . c b b b d c .
            . . c c c c . .
        `,
        img`
            . . f f f . . . . . . . . f f f
            . f f c c . . . . . . f c b b c
            f f c c . . . . . . f c b b c .
            f c f c . . . . . . f b c c c .
            f f f c c . c c . f c b b c c .
            f f c 3 c c 3 c c f b c b b c .
            f f b 3 b c 3 b c f b c c b c .
            . c 1 b b b 1 b c b b c c c . .
            . c 1 b b b 1 b b c c c c . . .
            c b b b b b b b b b c c . . . .
            c b 1 f f 1 c b b b b f . . . .
            f f 1 f f 1 f b b b b f c . . .
            f f 2 2 2 2 f b b b b f c c . .
            . f 2 2 2 2 b b b b c f . . . .
            . . f b b b b b b c f . . . . .
            . . . f f f f f f f . . . . . .
        `,
        img`
            . . b b b b . .
            . b 5 5 5 5 b .
            b 5 d 3 3 d 5 b
            b 5 3 5 5 1 5 b
            c 5 3 5 5 1 d c
            c d d 1 1 d d c
            . f d d d d f .
            . . f f f f . .
        `,
        img`
            . . . . . . . . . . . . . . . .
            . . . . . . 6 6 6 6 . . . . . .
            . . . . 6 6 6 5 5 6 6 6 . . . .
            . . . 7 7 7 7 6 6 6 6 6 6 . . .
            . . 6 7 7 7 7 8 8 8 1 1 6 6 . .
            . . 7 7 7 7 7 8 8 8 1 1 5 6 . .
            . 6 7 7 7 7 8 8 8 8 8 5 5 6 6 .
            . 6 7 7 7 8 8 8 6 6 6 6 5 6 6 .
            . 6 6 7 7 8 8 6 6 6 6 6 6 6 6 .
            . 6 8 7 7 8 8 6 6 6 6 6 6 6 6 .
            . . 6 8 7 7 8 6 6 6 6 6 8 6 . .
            . . 6 8 8 7 8 8 6 6 6 8 6 6 . .
            . . . 6 8 8 8 8 8 8 8 8 6 . . .
            . . . . 6 6 8 8 8 8 6 6 . . . .
            . . . . . . 6 6 6 6 . . . . . .
            . . . . . . . . . . . . . . . .
        `,
        img`
            . . . . . f f f f f . . . . . .
            . . . . f e e e e e f . . . . .
            . . . f d d d d d d e f . . . .
            . . f d f f d d f f d f f . . .
            . c d d d e e d d d d e d f . .
            . c d c d d d d c d d e f f . .
            . c d d c c c c d d d e f f f f
            . . c d d d d d d d e f f b d f
            . . . c d d d d e e f f f d d f
            . . . . f f f e e f e e e f f f
            . . . . f e e e e e e e f f f .
            . . . f e e e e e e f f f e f .
            . . f f e e e e f f f f f e f .
            . f b d f e e f b b f f f e f .
            . f d d f f f f d d b f f f f .
            . f f f f f f f f f f f f f . .
        `,
        img`
            . . . . . f c c c c f . . . . .
            . . c c f b b 3 3 b b f c c . .
            . c b 3 3 b b c c b b 3 3 b c .
            . f 3 c c c b c c b c c c 3 f .
            f c b b c c b c c b c c b b c f
            c 3 c c b c c c c c c b c c 3 c
            c 3 c c c c c c c c c c c c 3 c
            . f b b c c c c c c c c b b f .
            . . f b b c 8 9 9 8 c b b f . .
            . . c c c f 9 3 1 9 f c c c . .
            . c 3 f f f 9 3 3 9 f f f 3 c .
            c 3 f f f f 8 9 9 8 f f f f 3 c
            f 3 c c f f f f f f f f c c 3 f
            f b 3 c b b f b b f b b c 3 b f
            . c b b 3 3 b 3 3 b 3 3 b b c .
            . . f f f f f f f f f f f f . .
        `,
        img`
            5 5 4 2 2 2 2 2 4 2 2 2 2 4 4 5
            5 4 2 2 2 2 2 4 4 4 4 4 4 4 5 5
            4 2 2 4 2 4 4 4 5 5 5 5 5 5 4 4
            2 2 2 2 4 4 5 5 4 4 4 5 4 5 4 4
            4 4 2 4 4 5 5 4 4 2 2 4 5 4 4 2
            4 4 2 4 5 4 4 2 2 2 2 4 5 4 4 2
            2 2 4 5 4 4 2 2 2 4 4 2 5 5 4 2
            4 4 5 5 4 2 2 2 2 4 4 2 4 5 5 4
            5 5 5 4 2 2 4 2 2 2 2 2 4 5 5 5
            4 5 4 4 2 2 2 2 2 2 2 2 4 5 4 4
            4 5 5 2 2 4 2 2 2 4 2 2 4 5 5 4
            5 5 4 2 4 2 4 2 2 2 2 4 5 5 5 5
            4 5 5 4 2 4 2 2 2 2 2 4 5 4 4 4
            4 5 5 5 2 2 2 4 4 4 5 5 5 4 2 2
            4 5 5 4 5 5 5 5 5 5 5 4 4 2 2 2
            4 5 5 4 4 4 4 4 4 4 4 2 2 2 4 4
        `,
        img`
            . . . . . . . . . . b 5 b . . .
            . . . . . . . . . b 5 b . . . .
            . . . . . . b b b b b b . . . .
            . . . . . b b 5 5 5 5 5 b . . .
            . . . . b b 5 d 1 f 5 d 4 c . .
            . . . . b 5 5 1 f f d d 4 4 4 b
            . . . . b 5 5 d f b 4 4 4 4 b .
            . . . b d 5 5 5 5 4 4 4 4 b . .
            . . b d d 5 5 5 5 5 5 5 5 b . .
            . b d d d d 5 5 5 5 5 5 5 5 b .
            b d d d b b b 5 5 5 5 5 5 5 b .
            c d d b 5 5 d c 5 5 5 5 5 5 b .
            c b b d 5 d c d 5 5 5 5 5 5 b .
            . b 5 5 b c d d 5 5 5 5 5 d b .
            b b c c c d d d d 5 5 5 b b . .
            . . . c c c c c c c c b b . . .
        `,
        img`
            . . . . . c c c c c c c . . . .
            . . . . c 6 7 7 7 7 7 6 c . . .
            . . . c 7 c 6 6 6 6 c 7 6 c . .
            . . c 6 7 6 f 6 6 f 6 7 7 c . .
            . . c 7 7 7 7 7 7 7 7 7 7 c . .
            . . f 7 8 1 f f 1 6 7 7 7 f . .
            . . f 6 f 1 f f 1 f 7 7 7 f . .
            . . . f f 2 2 2 2 f 7 7 6 f . .
            . . c c f 2 2 2 2 7 7 6 f c . .
            . c 7 7 7 7 7 7 7 7 c c 7 7 c .
            c 7 1 1 1 7 7 7 7 f c 6 7 7 7 c
            f 1 1 1 1 1 7 6 f c c 6 6 6 c c
            f 1 1 1 1 1 1 6 6 c 6 6 6 c . .
            f 6 1 1 1 1 1 6 6 6 6 6 6 c . .
            . f 6 1 1 1 1 1 6 6 6 6 c . . .
            . . f f c c c c c c c c . . . .
        `,
        img`
            . f f f f f f f . . . c c f f f . . . . . . . . . .
            f b b b b b b b f f c b b b b f . . . . . . . . . .
            f b b 1 1 1 b b b b b f f b f . . . . . . . . . . .
            f b 1 1 1 1 1 f f b b b b f f . . . . . . . . . . .
            f 1 c c c c 1 f f b b b b b c f f . . . . . . . . .
            f f c 1 c 1 c 1 b b c b c b c c c f . . . . . . . .
            . f c c 3 3 3 1 b b b c b c b c c c f . . c c c c c
            . . c 3 3 3 c 1 b b b c b c b c c c c f c d d b b c
            . . c 3 3 3 c 1 b b b b b b b c c c c c d d b c c .
            . . c 3 3 3 c 1 1 b b b b b c c c c c c b b c c . .
            . c c 3 3 1 c 1 1 b b b b c c c c c c f b c c f . .
            . c c 1 3 c 1 1 c b b b c c c c c b b c f c c f . .
            . c 1 1 1 1 1 1 c b b b f d d d d d c . f b b c f .
            . . c c 1 1 1 1 f b d b b f d d d c . . . f b b f .
            . . . . c c c f f f b d b b f c c . . . . . f b b f
            . . . . . . . . . . f f f f f . . . . . . . . f f f
        `,
        img`
            . . 6 7 7 8 . .
            . 6 7 7 8 . . .
            . 8 7 8 . . 6 8
            . 8 7 8 . 6 6 8
            . . 8 6 8 8 8 .
            . . . 8 6 8 . .
            6 6 . . 8 7 8 .
            8 6 6 8 7 7 8 .
            . 8 8 7 7 8 . .
            . 8 7 7 8 . . .
            . 8 7 8 . 8 6 .
            . 8 7 8 . 8 6 6
            . . 8 6 8 . 8 8
            . . . 8 6 8 . .
            . . . . 8 7 8 .
            . . . 6 7 7 8 .
        `,
        img`
            . . . b b b b b b b b b . . . .
            . . b 1 d d d d d d d 1 b . . .
            . b 1 1 1 1 1 1 1 1 1 1 1 b . .
            . b d b c c c c c c c b d b . .
            . b d c 6 6 6 6 6 6 6 c d b . .
            . b d c 6 d 6 6 6 6 6 c d b . .
            . b d c 6 6 6 6 6 6 6 c d b . .
            . b d c 6 6 6 6 6 6 6 c d b . .
            . b d c 6 6 6 6 6 6 6 c d b . .
            . b d c c c c c c c c c d b . .
            . c b b b b b b b b b b b c . .
            c b c c c c c c c c c c c b c .
            c 1 d d d d d d d d d d d 1 c .
            c 1 d 1 1 d 1 1 d 1 1 d 1 1 c .
            c b b b b b b b b b b b b b c .
            c c c c c c c c c c c c c c c .
        `,
    ];

    for (const im of imgs) {
        mySprite.setImage(im);
        scale2xSprite.setImage(scaling.scale2x(im));
        scale3xSprite.setImage(scaling.scale3x(im));
        scale4xSprite.setImage(scaling.scale4x(im));
        rot90Sprite.setImage(scaling.rot(im, 90));
        rot180Sprite.setImage(scaling.rot(im, 180));
        rot270Sprite.setImage(scaling.rot(im, 270));

        pause(600);
    }
    game.popScene()
}

function testTrim() {
    prepTest();
    const t = sprites.create(images.trim(img`
        . . . . . . . . . . . . . . . . . . c c f f f . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . . . c d d b b f . . . . . . . . . . . . .
        . . . . . . . . f f f f f f f f f d d b b f . . . . . . . . . . . . . .
        . . . . . . . f b b b b b b b b b f c b c f . . . . . . . . . . . . . .
        . . . . . . . f b b c 1 1 1 b f f b b c c f f f f . . . . . . . . . . .
        . . . . . . . f b 1 1 1 1 1 1 f f b b b b b c c c f f . . . . c c c c c
        . . . . . . . . f 1 c c 3 3 1 1 b b c b c b b c c c c f . . c d b b b c
        . . . . . . . . f c c 1 3 1 c 1 b b b c b c b c c c c c f c d d b b c .
        . . . . . . . . . f 1 1 1 1 1 1 b b b c b c b c c c c c c b d b b f . .
        . . . . . . . . . f 1 1 1 1 1 1 1 b b b b b c c c c c c c c b b c f . .
        . . . . . . . . . . f 1 1 1 1 1 1 b b b b c c c c c c c f f b c c f . .
        . . . . . . . . . . . c 1 1 1 1 c b b b c c c c c b d b c . f b b c f .
        . . . . . . . . . . . . c c 1 1 c b b b f d d d d d d c . . . f b b f .
        . . . . . . . . . . . . . . c f f b d b b f d d d c c . . . . . f b b f
        . . . . . . . . . . . . . . . . . f b d b b f c c . . . . . . . . f f f
        . . . . . . . . . . . . . . . . . . f f f f f . . . . . . . . . . . . .
    `))
    t.image.replace(0, 5)
    pause(600)
    game.popScene()
}

function smolStrawberry() {
    const mySprite = sprites.create(img`
        . . . . . . . 6 . . . . . . . .
        . . . . . . 8 6 6 . . . 6 8 . .
        . . . e e e 8 8 6 6 . 6 7 8 . .
        . . e 2 2 2 2 e 8 6 6 7 6 . . .
        . e 2 2 4 4 2 7 7 7 7 7 8 6 . .
        . e 2 4 4 2 6 7 7 7 6 7 6 8 8 .
        e 2 4 5 2 2 6 7 7 6 2 7 7 6 . .
        e 2 4 4 2 2 6 7 6 2 2 6 7 7 6 .
        e 2 4 2 2 2 6 6 2 2 2 e 7 7 6 .
        e 2 4 2 2 4 2 2 2 4 2 2 e 7 6 .
        e 2 4 2 2 2 2 2 2 2 2 2 e c 6 .
        e 2 2 2 2 2 2 2 4 e 2 e e c . .
        e e 2 e 2 2 4 2 2 e e e c . . .
        e e e e 2 e 2 2 e e e c . . . .
        e e e 2 e e c e c c c . . . . .
        . c c c c c c c . . . . . . . .
    `)

    mySprite.setImage(scaling.scaleDown(mySprite.image, 2));
    pause(1000)
}