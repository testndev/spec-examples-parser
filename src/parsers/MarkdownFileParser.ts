import { parse } from 'csv-parse/sync';
import { getFullText } from '../utils/fileReading';
import { defaultGherkinParsingOptions } from '../const/defaultParsingOptions';

import { convertToCleanTsvFormat, isTextBlankOrEmpty } from '../utils/texts';
import { throwEmptyFileError, throwNotMarkdownFileWithTablesError } from '../utils/errors';
import { FeatureFileParsingOptions } from '../const/FileParsingOptions';


const markdownTableLineRegex = /^\s*(\|?[^|]+\|[^|]+.*)$/g
const markdownTableSeparatorLineRegex = /^\s*\|?[|-]+$/g

export default class MarkdownFileParser {
  /**
        * Parse a Markdown file,
        * take a "examples table" from first table
        * @param filePath markdown file path
        * @param parsingOptions some optional configuration for parsing
        * @param parsingOptions.examplesTableIndex which Nth table will be taken. by default = 1
        * @returns an array of objects
        */
  static parse(filePath: string, parsingOptions?: FeatureFileParsingOptions) {
    this.checkIsMarkdownFile(filePath);
    const fullText = getFullText(filePath, parsingOptions);
    const examplesTableText = this.extractExamplesTableText(fullText);
    return parse(examplesTableText, { ...defaultGherkinParsingOptions, ...parsingOptions });
  }

  private static checkIsMarkdownFile(filePath: string) {
    const fullText = getFullText(filePath);
    if (isTextBlankOrEmpty(fullText)) {
      throwEmptyFileError(filePath);
    } else if (!this.isMarkdownWithTableText(fullText)) {
      throwNotMarkdownFileWithTablesError(filePath);
    } else {
      return true;
    }
  }


  private static isMarkdownWithTableText(text: string) {
    const lines = text.split(/\r?\n/);
    const firstLineIsTitle = text.startsWith('#');
    const hasTable = lines.findIndex(line => this.isTableLine(line));
    return firstLineIsTitle && hasTable;
  }


  private static extractExamplesTableText(fullText: string) {
    const startSearchingAtLine = 0
    const examplesTableText = this.firstExamplesTableText(fullText, startSearchingAtLine);
    return examplesTableText;
  }

  private static firstExamplesTableText(fullText: string, examplesKeywordLineIndex: number) {
    const lines = fullText.split(/\r?\n/);
    const index = lines.findIndex(line => this.isTableLine(line));
    const examplesTableLines: string[] = [];
    // .every() stops when it return "false" (== not an "example line") 
    lines.slice(index).every((line) => {
      const isTableLine = this.isTableLine(line);
      if (isTableLine) {
        if (!markdownTableSeparatorLineRegex.test(line)) {
          examplesTableLines.push(line);

        }
      }
      return isTableLine;
    });
    return convertToCleanTsvFormat(examplesTableLines);
  }


  private static isTableLine(line: string) {
    return line.match(markdownTableLineRegex);
  }

}
