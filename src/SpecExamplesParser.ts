import * as fs from 'fs';
import { parse } from 'csv-parse/sync';
import { FileParsingOptions, FeatureFileParsingOptions } from './FileParsingOptions';
import { defaultGherkinParsingOptions, defaultCsvParsingOptions, defaultTsvParsingOptions } from './const/defaultParsingOptions';
import GherkinFeatureFileParser from './parsers/GherkinFeatureFileParser';
import { convertToCleanTsvFormat } from './utils/texts';


export class SpecExamplesParser {

  /**
     * Convert a text listing Examples, as in Gherkin format (Examples block in "Scenario Outline")
     * @param examplesText Examples in Gherkin format
     * @returns a list of object
     */
  static fromGherkinFormatTable(examplesText: string, parsingOptions?: FileParsingOptions) {
    const lines = examplesText.split('\n');
    const text = convertToCleanTsvFormat(lines);
    return parse(text, { ...defaultGherkinParsingOptions, ...parsingOptions });
  }

  static fromCsv(filePath: string, parsingOptions?: FileParsingOptions) {
    const examplesText = fs.readFileSync(filePath);
    return parse(examplesText, { ...defaultCsvParsingOptions, ...parsingOptions });
  }

  static fromTsv(filePath: string, parsingOptions?: FileParsingOptions) {
    const examplesText = fs.readFileSync(filePath);
    return parse(examplesText, { ...defaultTsvParsingOptions, ...parsingOptions });
  }

  /**
     * Parse a Gherkin-style Feature file (SpecFlow/Cucumber),
     * take a "examples table" from it and convert to usable format
     * @param filePath feature file path
     * @param parsingOptions some optional configuration for parsing
     * @param parsingOptions.examplesTableIndex which Nth table will be taken. by default = 1
     * @returns an array of objects
     */
  static fromGherkinFeatureFile(filePath: string, parsingOptions?: FeatureFileParsingOptions) {
    return GherkinFeatureFileParser.parse(filePath, parsingOptions);
  }

  static fromExcel(filePath: string) {
    console.log(` try to parse ${filePath} Excel File`)
    throw new Error('Not implemented yet');
  }

}

