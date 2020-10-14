
namespace images {


    //% blockId=scalingextrot block="rotate $im by $deg degrees"
    //% im.shadow=variables_get
    //% deg.defl=90
    //% group="Scaling" weight=70
    //% blockNamespace=scaling
    export function rot(im: Image, deg: number, padding?: number) {
        const rangeForExact = 3;
        deg = deg < 0 ? 360 - Math.abs(deg % 360) : Math.abs(deg % 360);
        if (Math.abs(deg - 90) < rangeForExact) {
            return rot90(im);
        } else if (Math.abs(deg - 180) < rangeForExact) {
            return rot90(rot90(im));
        } else if (Math.abs(deg - 270) < rangeForExact) {
            return rot90(rot90(rot90(im)));
        } else if (deg < rangeForExact) {
            return im.clone();
        } else {
            // todo rotsprite for non square rots
            return rotSprite(im, deg, padding)
        }
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
    function rotSprite(im: Image, deg: number, padding?: number) {
        let base = im;
        if (padding > 0) {
            base = image.create(
                im.width + (padding << 1),
                im.height + (padding << 1)
            );
            base.drawImage(im, padding, padding);
        }
        const scaled = images.scale3x(base);
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

        return images.scaleDown(output, 3);
    }
}