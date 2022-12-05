import { parse } from 'csv-parse/sync';
import { convertToCleanTsvFormat, isTextBlankOrEmpty } from '../utils/texts';
import { FeatureFileParsingOptions } from '../const/FileParsingOptions';
import { defaultGherkinParsingOptions } from '../const/defaultParsingOptions';
import { throwEmptyTableInText, throwEmptyText } from '../utils/errors';

export default class GherkinFeatureTextParser {

  static parse(examplesText: string, parsingOptions?: FeatureFileParsingOptions) {
    if (isTextBlankOrEmpty(examplesText)) {
      throwEmptyText();
    }
    const lines = examplesText.split('\n');
    const text = convertToCleanTsvFormat(lines);
    const parsedContent = parse(text, { ...defaultGherkinParsingOptions, ...parsingOptions });
    if (parsedContent.length === 0) {
      throwEmptyTableInText();
    }
    return parsedContent;
  }

}