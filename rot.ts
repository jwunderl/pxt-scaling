
namespace images {
    export function rot(im: Image, deg: number) {
        if (deg == 90) {
            return rot90(im);
        } else if (deg == 180) {
            return rot90(rot90(im));
        } else if (deg == 270) {
            return rot90(rot90(rot90(im)));
        } else {
            // todo rotsprite for non 90deg
            return im
        }

        function rot90(im: Image) {
            const w = im.width;
            const h = im.height;
            const output = image.create(h, w);

            for (let x = 0; x < w; x++) {
                for (let y = 0; y < h; y++) {
                    output.setPixel(y, x, im.getPixel(x, h - y - 1));
                }
            }
            return output;
        }
    }
}