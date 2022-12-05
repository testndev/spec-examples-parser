import { FeatureFileParsingOptions } from '../const/FileParsingOptions';
declare function getFullText(filePath: string, parsingOptions?: FeatureFileParsingOptions | undefined): string;
declare function controlFileIsNotEmpty(filePath: string): void;
export { getFullText, controlFileIsNotEmpty };
