import * as fs from 'fs';
import { FileParsingOptions, FeatureFileParsingOptions } from '../const/FileParsingOptions';

const defaultEncoding: BufferEncoding = 'utf8';

function getEncoding(parsingOptions: FileParsingOptions | undefined): BufferEncoding {
  return parsingOptions?.encoding || defaultEncoding;
}

function getFullText(filePath: string, parsingOptions?: FeatureFileParsingOptions | undefined): string {
  return fs.readFileSync(filePath, getEncoding(parsingOptions));
}

export { getFullText };