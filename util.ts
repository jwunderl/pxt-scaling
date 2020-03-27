
namespace images {
    export function trim(im: Image) {
        let minX = im.width;
        let minY = im.height;
        let maxX = 0;
        let maxY = 0;

        for (let c = 0; c < im.width; c++) {
            for (let r = 0; r < im.height; r++) {
                if (im.getPixel(c, r)) {
                    minX = Math.min(minX, c);
                    minY = Math.min(minY, r);
                    maxX = Math.max(maxX, c);
                    maxY = Math.max(maxY, r);
                }
            }
        }

        const output = image.create(
            maxX - minX + 1,
            maxY - minY + 1
        );

        output.drawImage(
            im,
            -minX,
            -minY
        );

        return output;
    }
}