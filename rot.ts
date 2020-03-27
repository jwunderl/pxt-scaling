
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
            return im
        }

        function rot90(im: Image) {
            const w = im.width;
            const h = im.height;
            const output = image.create(h, w);

            for (let x = 0; x < w; x++) {
                for (let y = 0; y < h; y++) {
                    output.setPixel(
                        y,
                        x,
                        im.getPixel(x, h - y - 1)
                    );
                }
            }

            return output;
        }
    }
}