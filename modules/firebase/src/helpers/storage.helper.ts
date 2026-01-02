import { promisify } from 'util';
import {
  gzip,
  gunzip,
} from 'zlib';

const asyncDeflate = promisify(gzip);
const asyncUnzip = promisify(gunzip);

export const compress = async (data: string) => {
  const buffer = await asyncDeflate(data);
  return buffer.toString('base64');
};

export const decompress = async (data: string) => {
  try {
    const buffer = Buffer.from(data, 'base64');
    return (await asyncUnzip(buffer)).toString();
  } catch {
    return data;
  }
};
