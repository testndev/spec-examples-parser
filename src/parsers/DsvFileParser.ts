import * as fs from 'fs';
import { parse } from 'csv-parse/sync';
import { controlFileIsNotEmpty } from '../utils/fileReading';
import { throwEmptyTableInFileError } from '../utils/errors';
import { defaultCsvParsingOptions, defaultTsvParsingOptions } from '../const/defaultParsingOptions';
import { FileParsingOptions } from '../const/FileParsingOptions';

export default class DsvFileParser {


  static parseCsv(filePath: string, parsingOptions?: FileParsingOptions) {
    controlFileIsNotEmpty(filePath);
    const examplesText = fs.readFileSync(filePath);
    const parsedContent = parse(examplesText, { ...defaultCsvParsingOptions, ...parsingOptions });
    if (parsedContent.length === 0) {
      throwEmptyTableInFileError(filePath)
    }
    return parsedContent;
  }

  static parseTsv(filePath: string, parsingOptions?: FileParsingOptions) {
    controlFileIsNotEmpty(filePath);
    const examplesText = fs.readFileSync(filePath);
    const parsedContent = parse(examplesText, { ...defaultTsvParsingOptions, ...parsingOptions });
    if (parsedContent.length === 0) {
      throwEmptyTableInFileError(filePath)
    }
    return parsedContent;
  }

}
