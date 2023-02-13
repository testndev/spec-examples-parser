import { FileParsingOptions, FeatureFileParsingOptions } from './const/FileParsingOptions';
declare class SpecExamplesParser {
    /**
     * Intelligent/magic `from()` method that parse any text or file to examples list
     * @param text can be either a "file path" or a raw "examples table" in text format
     * @param parsingOptions some optional configuration for parsing
     * @returns an array of objects
     */
    static from(text: string, parsingOptions?: FileParsingOptions): any;
    static fromFile(filePath: string, parsingOptions?: FileParsingOptions): any;
    static fromJsonFile(filePath: string): any;
    static fromCsvFile(filePath: string, parsingOptions?: FileParsingOptions): any;
    static fromTsvFile(filePath: string, parsingOptions?: FileParsingOptions): any;
    /**
       * Parse a Gherkin-style Feature file (SpecFlow/Cucumber),
       * take a "examples table" from it and convert to usable format
       * @param filePath feature file path
       * @param parsingOptions some optional configuration for parsing
       * @param parsingOptions.examplesTableIndex which Nth table will be taken. by default = 1
       * @returns an array of objects
       */
    static fromGherkinFeatureFile(filePath: string, parsingOptions?: FeatureFileParsingOptions): any;
    /**
       * Convert a text listing Examples, as in Gherkin format (Examples block in "Scenario Outline")
       * @param examplesText Examples in Gherkin format
       * @param parsingOptions some optional configuration for parsing
       * @returns an array of objects
       */
    static fromGherkinFormatTable(examplesText: string, parsingOptions?: FileParsingOptions): any;
}
export default SpecExamplesParser;
