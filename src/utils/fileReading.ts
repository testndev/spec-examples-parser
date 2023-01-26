import * as fs from 'fs';
import { FileParsingOptions, FeatureFileParsingOptions } from '../const/FileParsingOptions';
import { throwEmptyFileError } from './errors';
import { isTextBlankOrEmpty } from './texts';

const defaultEncoding: BufferEncoding = 'utf8';

function getEncoding(parsingOptions: FileParsingOptions | undefined): BufferEncoding {
  return parsingOptions?.encoding || defaultEncoding;
}

function getFullText(filePath: string, parsingOptions?: FeatureFileParsingOptions | undefined): string {
  return fs.readFileSync(filePath, getEncoding(parsingOptions));
}

function controlFileIsNotEmpty(filePath: string) {
  const fullText = getFullText(filePath)
  if (isTextBlankOrEmpty(fullText)) {
    throwEmptyFileError(filePath)
  }
}

function getExtension(filePath: string) {
  return (filePath.split('.').pop()||'').toLowerCase();

}

export { getExtension, getFullText, controlFileIsNotEmpty };