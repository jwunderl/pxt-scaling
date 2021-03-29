namespace scaling {

    //% blockId=scalingextrot block="rotate $im by $deg degrees || with $padding"
    //% im.shadow=variables_get
    //% deg.defl=90
    //% group="Scaling" weight=70
    export function rot(im: Image, deg: number, padding?: number) {
        const rangeForExact = 2;
        deg = deg < 0 ? 360 - Math.abs(deg % 360) : Math.abs(deg % 360);
        if (padding == undefined) {
            const maxDim = Math.max(im.width, im.height);
            const diag = Math.sqrt(im.width ** 2 + im.height ** 2);
            padding = Math.ceil(
                (diag - maxDim) / 2
            );
        }
 
        const base = image.create(
            im.width + (padding << 1),
            im.height + (padding << 1)
        );
        base.drawImage(im, padding, padding);

        // TODO: transposed seems to be broken; 
        // it's miscaling images. Fix in core then use it for 90/270
        if (Math.abs(deg - 90) < rangeForExact) {
            // base.flipY();
            // return base.transposed();
            return rot90(base);
        } else if (Math.abs(deg - 180) < rangeForExact) {
            base.flipX();
            base.flipY();
            return base;
        } else if (Math.abs(deg - 270) < rangeForExact) {
            // base.flipX();
            // return base.transposed();
            return rot90(rot90(rot90(base)));
        } else if (deg < rangeForExact) {
            return base;
        } else {
            return rotSprite(base, deg)
        }
    }

    //% blockId=scalingextrotarray block="array of $count rotations of $im|| with $padding padding"
    //% im.shadow=variables_get
    //% count.defl=8
    //% padding.defl=3
    //% group="Scaling" weight=60
    export function createRotations(im: Image, count: number, padding = 3): Image[] {
        const output = [];
        for (let i = 0; i < count; ++i) {
            output[i] = scaling.rot(
                im,
                i * 360 / count,
                padding
            );
        }   
        return output;
    }

    function rot90(im: Image) {
        const w = im.width;
        const h = im.height;
        const output = image.create(h, w);
        for (let x = 0; x < w; x++) {
            for (let y = 0; y < h; y++) {
                const c = im.getPixel(x, h - y - 1);
                output.setPixel(
                    y,
                    x,
                    c
                );
            }
        }
        return output;
    }

    /**
     * roughly based on https://en.m.wikipedia.org/wiki/Pixel-art_scaling_algorithms#RotSprite,
     * need to follow it a bit more closely
     */
    function rotSprite(im: Image, deg: number) {
        let base = im;
        const scaled = scaling.scale3x(base);
        const output = image.create(scaled.width, scaled.height);
        const angleAsRadian = (deg / 180) * Math.PI;

        const midX = output.width >> 1;
        const midY = output.height >> 1;

        for (let x = 0; x < output.width; ++x) {
            const xDiff = (x - midX) | 0;
            for (let y = 0; y < output.height; ++y) {
                const yDiff = (y - midY) | 0;
    
                const angleForPixel = Math.atan2(yDiff, xDiff) - angleAsRadian;
                const m = Math.sqrt(
                    xDiff * xDiff + yDiff * yDiff
                );

                output.setPixel(
                    x,
                    y,
                    scaled.getPixel(
                        midX + m * Math.cos(angleForPixel),
                        midY + m * Math.sin(angleForPixel)
                    )
                );
            }
        }

        return scaling.scaleDown(output, 3);
    }
}