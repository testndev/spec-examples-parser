import { convertToCleanTsvFormat, isTextBlankOrEmpty } from '../utils/texts';
import { FeatureFileParsingOptions } from '../FileParsingOptions';
import { defaultGherkinParsingOptions } from '../const/defaultParsingOptions';
import { throwNoEnoughScenarioOutlineInFileError, throwEmptyFileError, throwNotFeatureFileError } from '../utils/errors';
import { parse } from 'csv-parse/sync';
import { getFullText } from '../utils/fileReading';

export default class GherkinFeatureFileParser {
  /**
        * Parse a Gherkin-style Feature file (SpecFlow/Cucumber),
        * take a "examples table" from it and convert to usable format
        * @param filePath feature file path
        * @param parsingOptions some optional configuration for parsing
        * @param parsingOptions.examplesTableIndex which Nth table will be taken. by default = 1
        * @returns an array of objects
        */
  static parse(filePath: string, parsingOptions?: FeatureFileParsingOptions) {
    const neededTableIndex = parsingOptions?.examplesTableIndex || 1;
    this.checkIsFeatureFile(filePath);
    const fullText = getFullText(filePath, parsingOptions);
    this.checkScenarioOutline(fullText, neededTableIndex, filePath);
    const examplesTableText = this.extractExamplesTableText(fullText, neededTableIndex);
    return parse(examplesTableText, { ...defaultGherkinParsingOptions, ...parsingOptions });
  }


  private static extractExamplesTableText(fullText: string, neededTableIndex: number) {
    const indexesOf = this.positionsOfExamplesKeywords(fullText);
    const startSearchingAtLine = indexesOf[neededTableIndex - 1];
    const examplesTableText = this.firstExamplesTableText(fullText, startSearchingAtLine);
    return examplesTableText;
  }

  private static checkScenarioOutline(fullText: string, neededTableIndex: number, filePath: string) {
    const numberOfExamplesKeywords = this.numberOfExamplesKeywords(fullText);
    if (numberOfExamplesKeywords < neededTableIndex) {
      throwNoEnoughScenarioOutlineInFileError(filePath, numberOfExamplesKeywords, neededTableIndex);
    }
    return true;
  }

  private static positionsOfExamplesKeywords(fullText: string): number[] {
    return fullText.split('\n').map((x, i) => this.isExamplesKeyword(x) ? i : -1).filter(i => i >= 0);
  }


  private static numberOfExamplesKeywords(fullText: string) {
    return fullText.split('\n').filter(this.isExamplesKeyword).length;
  }

  private static checkIsFeatureFile(filePath: string) {
    const fullText = getFullText(filePath);
    if (isTextBlankOrEmpty(fullText)) {
      throwEmptyFileError(filePath);
    } else if (!this.isGherkinFeatureText(fullText)) {
      throwNotFeatureFileError(filePath);
    } else {
      return true;
    }
  }

  private static isGherkinFeatureText(text: string) {
    const containsFeatureKeyword = text.toLowerCase().includes('feature:');
    return containsFeatureKeyword;
  }

  private static firstExamplesTableText(fullText: string, examplesKeywordLineIndex: number) {
    const lines = fullText.split('\n');
    const followingLines = lines.slice(examplesKeywordLineIndex + 1);
    const examplesTableLines: string[] = [];
    // .every() stops when it return "false" (== not an "example line") 
    followingLines.every((line) => {
      const isAnExempleLine = this.isAnExempleLine(line);
      if (isAnExempleLine) {
        examplesTableLines.push(line);
      }
      return isAnExempleLine;
    });
    return convertToCleanTsvFormat(examplesTableLines);
  }

  private static isAnExempleLine(line: string) {
    return line.trim().startsWith('|');
  }

  private static isExamplesKeyword(line: string): boolean {
    return line.includes('Examples:');
  }


}
