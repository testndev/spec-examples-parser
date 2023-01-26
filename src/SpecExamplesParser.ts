import { FileParsingOptions, FeatureFileParsingOptions } from './const/FileParsingOptions';
import GherkinFeatureFileParser from './parsers/GherkinFeatureFileParser';
import JsonFileParser from './parsers/JsonFileParser';
import DsvFileParser from './parsers/DsvFileParser';
import GherkinFeatureTextParser from './parsers/GherkinFeatureTextParser';


export class SpecExamplesParser {

  static fromJsonFile(filePath: string) {
    return JsonFileParser.parse(filePath);
  }

  static fromCsvFile(filePath: string, parsingOptions?: FileParsingOptions) {
    return DsvFileParser.parseCsv(filePath, parsingOptions);
  }

  static fromTsvFile(filePath: string, parsingOptions?: FileParsingOptions) {
    return DsvFileParser.parseTsv(filePath, parsingOptions);
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

  /**
     * Convert a text listing Examples, as in Gherkin format (Examples block in "Scenario Outline")
     * @param examplesText Examples in Gherkin format
     * @param parsingOptions some optional configuration for parsing
     * @returns an array of objects
     */
  static fromGherkinFormatTable(examplesText: string, parsingOptions?: FileParsingOptions) {
    return GherkinFeatureTextParser.parse(examplesText, parsingOptions);
  }

}
