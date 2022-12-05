import { FileParsingOptions } from '../const/FileParsingOptions';
export default class DsvFileParser {
    static parseCsv(filePath: string, parsingOptions?: FileParsingOptions): any;
    static parseTsv(filePath: string, parsingOptions?: FileParsingOptions): any;
}
