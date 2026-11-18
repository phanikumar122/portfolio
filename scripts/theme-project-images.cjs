// Run with NODE_PATH pointing to pngjs and jpeg-js installed outside the app.
// Keep the original PNGs untouched; rebuild small, theme-matched JPEG derivatives.
const fs = require('node:fs');
const path = require('node:path');
const { PNG } = require('pngjs');
const jpeg = require('jpeg-js');
const directory = path.join(__dirname, '../src/assets/projects');
const paper = [247, 245, 239];
const cobalt = [36, 87, 214];
const ink = [24, 33, 47];
for (const file of fs.readdirSync(directory).filter(name => name.endsWith('.png'))) {
  const source = PNG.sync.read(fs.readFileSync(path.join(directory, file)));
  for (let i = 0; i < source.data.length; i += 4) {
    const r = source.data[i] / 255, g = source.data[i + 1] / 255, b = source.data[i + 2] / 255;
    const brightness = .2126 * r + .7152 * g + .0722 * b;
    // A continuous photographic negative maps dark backgrounds to warm paper.
    // Saturated details become cobalt while neutral metal retains blue ink depth.
    const saturation = Math.max(r, g, b) - Math.min(r, g, b);
    const amount = Math.min(1, Math.pow(Math.max(0, (brightness - .025) / .975), .72));
    const accent = Math.min(1, saturation * 3);
    for (let c = 0; c < 3; c++) {
      const pigment = ink[c] * (1 - accent) + cobalt[c] * accent;
      source.data[i + c] = Math.round(paper[c] * (1 - amount) + pigment * amount);
    }
    source.data[i + 3] = 255;
  }
  const output = jpeg.encode(source, 84).data;
  fs.writeFileSync(path.join(directory, file.replace('.png', '.jpg')), output);
  console.log(file + ' → ' + Math.round(output.length / 1024) + ' KB');
}
