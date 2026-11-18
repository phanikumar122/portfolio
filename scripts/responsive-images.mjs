import fs from 'node:fs';
import { createRequire } from 'node:module';
const toolRoot = process.env.PORTFOLIO_IMAGE_TOOLS;
if (!toolRoot) throw new Error('Set PORTFOLIO_IMAGE_TOOLS to the directory containing encoder node_modules.');
const { default: encode, init } = await import(new URL('node_modules/@jsquash/webp/encode.js', 'file://' + toolRoot + '/'));

const require=createRequire(new URL('package.json', 'file://' + toolRoot + '/'));const jpeg=require('jpeg-js');
await init({wasmBinary:fs.readFileSync(new URL('node_modules/@jsquash/webp/codec/enc/webp_enc_simd.wasm', 'file://' + toolRoot + '/'))});
const dir=new URL('../src/assets/projects/', import.meta.url).pathname;
for(const file of fs.readdirSync(dir).filter(f=>f.endsWith('.jpg'))){
 const im=jpeg.decode(fs.readFileSync(dir+'/'+file));
 for(const width of [480,960,1586]){
 const height=Math.round(width*im.height/im.width), data=new Uint8ClampedArray(width*height*4);
 // Bilinear sampling preserves fine edges at phone and tablet widths.
 for(let y=0;y<height;y++)for(let x=0;x<width;x++){
 const sx=(x+.5)*im.width/width-.5,sy=(y+.5)*im.height/height-.5;
 const x0=Math.max(0,Math.floor(sx)),y0=Math.max(0,Math.floor(sy)),x1=Math.min(im.width-1,x0+1),y1=Math.min(im.height-1,y0+1),fx=Math.max(0,sx-x0),fy=Math.max(0,sy-y0);
 for(let c=0;c<3;c++)data[(y*width+x)*4+c]=(im.data[(y0*im.width+x0)*4+c]*(1-fx)+im.data[(y0*im.width+x1)*4+c]*fx)*(1-fy)+(im.data[(y1*im.width+x0)*4+c]*(1-fx)+im.data[(y1*im.width+x1)*4+c]*fx)*fy;
 data[(y*width+x)*4+3]=255;
 }
 const output=Buffer.from(await encode({data,width,height},{quality:78,method:4}));fs.writeFileSync(dir+'/'+file.replace('.jpg','-'+width+'.webp'),output);console.log(file+' '+width+': '+Math.round(output.length/1024)+' KB');
 }
}
