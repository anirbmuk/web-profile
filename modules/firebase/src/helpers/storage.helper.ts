import { promisify } from 'util';
import {
  brotliCompress,
  brotliDecompress,
} from 'zlib';

const asyncBrotliCompress = promisify(brotliCompress);
const asyncBrotliDecompress = promisify(brotliDecompress);

export const compress = async (data: string) => {
  const buffer = await asyncBrotliCompress(data, {
    params: {
      [1]: 4, // BROTLI_PARAM_QUALITY - 4 is a good balance (0-11)
      [2]: 22, // BROTLI_PARAM_LGWIN - 22 is default window size
    },
  });
  return buffer.toString('base64');
};

export const decompress = async (data: string) => {
  try {
    const buffer = Buffer.from(data, 'base64');
    return (await asyncBrotliDecompress(buffer)).toString();
  } catch {
    return data;
  }
};
