//% color=#164E75 icon="\uf24e"
namespace scaling {
    // using https://www.scale2x.it/algorithm

    /**
     * given:
     * 
     * [a][b][c]
     * [d][e][f]
     * [g][h][i]
     * 
     * scale pixel e to
     * 
     * [e0][e1]
     * [e2][e3]
     * 
     * any pixels that would be off the border get replaced w/
     * closed pixel inside
     */

    //% blockId=scalingextscale2 block="scale $im by 2x"
    //% im.shadow=variables_get
    //% group="Scaling" weight=65
    //% blockNamespace=scaling
    export function scale2x(im: Image): Image {
        const w = im.width;
        const h = im.height;
        const output = image.create(
            w << 1,
            h << 1
        );

        for (let x = 0; x < im.width; ++x) {
            const lb = x === 0; // left pixel oob
            const rb = x === im.width - 1; // right pixel oob
            for (let y = 0; y < im.height; ++y) {
                const tb = y === 0; // top oob
                const bb = y === im.height - 1; // bottom oob

                const e = im.getPixel(x, y);

                const b = tb ? e : im.getPixel(x, y - 1);

                const d = lb ? e : im.getPixel(x - 1, y);
                const f = rb ? e : im.getPixel(x + 1, y);

                const h = bb ? e : im.getPixel(x, y + 1);

                const outX = x << 1;
                const outY = y << 1;

                if (b != h && d != f) {
                    output.setPixel(outX, outY, d == b ? d : e); // E0
                    output.setPixel(outX + 1, outY, b == f ? f : e); // E1
                    output.setPixel(outX, outY + 1, d == h ? d : e); // E2
                    output.setPixel(outX + 1, outY + 1, h == f ? f : e); // E3
                } else {
                    output.fillRect(outX, outY, 2, 2, e);
                }
            }
        }

        return output;
    }

    /**
     * given:
     * 
     * [a][b][c]
     * [d][e][f]
     * [g][h][i]
     * 
     * scale pixel e to
     * 
     * [e0][e1][e2]
     * [e3][e4][e5]
     * [e6][e7][e8]
     * 
     * any pixels that would be off the border get replaced w/
     * closed pixel inside
     */

    //% blockId=scalingextscale3 block="scale $im by 3x"
    //% im.shadow=variables_get
    //% group="Scaling" weight=60
    //% blockNamespace=scaling
    export function scale3x(im: Image): Image {
        const w = im.width;
        const h = im.height;
        const output = image.create(
            w * 3,
            h * 3
        );

        for (let x = 0; x < im.width; ++x) {
            const lb = x === 0;
            const rb = x === im.width - 1;
            for (let y = 0; y < im.height; ++y) {
                const tb = y === 0;
                const bb = y === im.height - 1;

                const e = im.getPixel(x, y);

                const b = tb ? e : im.getPixel(x, y - 1);

                const d = lb ? e : im.getPixel(x - 1, y);
                const f = rb ? e : im.getPixel(x + 1, y);

                const h = bb ? e : im.getPixel(x, y + 1);

                const a = (tb && lb) ?
                    e : tb ?
                        d : lb ? b : im.getPixel(x - 1, y - 1);
                const c = (tb && rb) ?
                    e : tb ?
                        f : rb ? b : im.getPixel(x + 1, y - 1);
                const g = (bb && lb) ?
                    e : bb ?
                        d : lb ? h : im.getPixel(x - 1, y + 1);
                const i = (bb && rb) ?
                    e : bb ?
                        f : rb ? h : im.getPixel(x + 1, y + 1);

                const outX = x * 3;
                const outY = y * 3;

                if (b != h && d != f) {
                    const a = (tb && lb) ?
                        e : tb ?
                            d : lb ? b : im.getPixel(x - 1, y - 1);
                    const c = (tb && rb) ?
                        e : tb ?
                            f : rb ? b : im.getPixel(x + 1, y - 1);
                    const g = (bb && lb) ?
                        e : bb ?
                            d : lb ? h : im.getPixel(x - 1, y + 1);
                    const i = (bb && rb) ?
                        e : bb ?
                            f : rb ? h : im.getPixel(x + 1, y + 1);

                    output.setPixel(outX, outY, d == b ? d : e); // E0
                    output.setPixel(outX + 1, outY,
                        ((d == b && e != c) || (b == f && e != a)) ? b : e); // E1
                    output.setPixel(outX + 2, outY, b == f ? f : e); // E2

                    output.setPixel(outX, outY + 1,
                        ((d == b && e != g) || (d == h && e != a)) ? d : e); // E3
                    output.setPixel(outX + 1, outY + 1, e); // E4
                    output.setPixel(outX + 2, outY + 1,
                        ((b == f && e != i) || (h == f && e != c)) ? f : e); // E5

                    output.setPixel(outX, outY + 2, d == h ? d : e); // E6
                    output.setPixel(outX + 1, outY + 2,
                        ((d == h && e != i) || (h == f && e != g)) ? h : e); // E7
                    output.setPixel(outX + 2, outY + 2, h == f ? f : e); // E8
                } else {
                    output.fillRect(outX, outY, 3, 3, e);
                }
            }
        }

        return output;
    }

    export function scale4x(im: Image): Image {
        return scale2x(scale2x(im));
    }

    //% blockId=scalingextscalehalf block="scale $im by .5x"
    //% im.shadow=variables_get
    //% group="Scaling" weight=40
    //% blockNamespace=scaling
    export function scaleDown(im: Image, square: number) {
        const w = im.width / square;
        const h = im.height / square;
        const output = image.create(w, h);

        for (let x = 0; x < w; ++x) {
            for (let y = 0; y < h; ++y) {
                output.setPixel(
                    x,
                    y,
                    mostCommonColor(
                        im,
                        square,
                        x * square,
                        y * square
                    )
                );
            }
        }
        return output;
    }

    function mostCommonColor(im: Image, square: number, x0: number, y0: number) {
        const colors: number[] = [];
        for (let i = 0; i <= 0xF; ++i)
            colors[i] = 0;
        
        for (let x = 0; x < square; ++x) {
            for (let y = 0; y < square; ++y) {
                colors[im.getPixel(x0 + x, y0 + y)] += 1 
            }
        }

        let max = 1;
        for (let i = 1; i <= 0xF; ++i) {
            if (colors[i] >= colors[max]) {
                max = i;
            }
        }

        if (colors[max] == 0) {
            return 0;
        }

        return max;
    }
}
