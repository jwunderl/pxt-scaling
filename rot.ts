
namespace images {
    export function rot(im: Image, deg: number) {
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
            return rotSprite(im, deg)
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

    function rotSprite(im: Image, deg: number) {
        const scaled = images.scale3x(im);
        const output = image.create(scaled.width, scaled.height);
        const angleAsRadian = (deg / 180) * Math.PI;

        const midX = output.width >> 1;
        const midY = output.height >> 1;

        for (let x = 0; x < output.width; ++x) {
            for (let y = 0; y < output.height; ++y) {
                const angleForPixel = Math.atan2(y - midY, x - midX) - angleAsRadian;
                const m = Math.sqrt(
                    Math.pow(x - midX, 2) + Math.pow(y - midY, 2)
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