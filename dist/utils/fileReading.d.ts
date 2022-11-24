/// <reference types="node" />
import { FileParsingOptions, FeatureFileParsingOptions } from '../const/FileParsingOptions';
declare function getEncoding(parsingOptions: FileParsingOptions | undefined): BufferEncoding;
declare function getFullText(filePath: string, parsingOptions?: FeatureFileParsingOptions | undefined): string;
export { getFullText, getEncoding, };
