import { Injectable } from '@nestjs/common';
import { createCanvas } from 'canvas';

const range = (min, max) => Math.floor(Math.random() * (max - min) + min);

@Injectable()
export class ImageService {
  getimage(code: string) {
    const width = 600;
    const height = 400;

    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    const box = 20;
    const hue = range(0, 360);
    const xhue = range(-3, 3);
    const yhue = range(-3, 3);
    const saturation = range(40, 80);
    for (let x = 0; x < width / box; x++) {
      for (let y = 0; y < height / box; y++) {
        const lightness = range(60, 80);
        ctx.fillStyle = `hsl(${(hue + xhue * x + yhue * y) %
          360}, ${saturation}%, ${lightness}%)`;
        ctx.fillRect(x * box, y * box, box, box);
      }
    }

    ctx.fillStyle = '#000';
    ctx.fillText(code, 20, 30);

    const buffer = canvas.toBuffer('image/png');
    return buffer;
  }
}
