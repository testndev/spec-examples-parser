import * as fs from 'fs';
import { FileParsingOptions, FeatureFileParsingOptions } from '../const/FileParsingOptions';

function getEncoding(parsingOptions: FileParsingOptions | undefined): BufferEncoding {
  const defaultEncoding: BufferEncoding = 'utf8';
  return parsingOptions?.encoding || defaultEncoding;
}

function getFullText(filePath: string, parsingOptions?: FeatureFileParsingOptions | undefined): string {
  return fs.readFileSync(filePath, getEncoding(parsingOptions));
}

export {
  getFullText,
  getEncoding,
};