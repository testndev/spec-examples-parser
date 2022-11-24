import { FileParsingOptions, FeatureFileParsingOptions } from './const/FileParsingOptions';
export declare class SpecExamplesParser {
    /**
       * Convert a text listing Examples, as in Gherkin format (Examples block in "Scenario Outline")
       * @param examplesText Examples in Gherkin format
       * @returns a list of object
       */
    static fromGherkinFormatTable(examplesText: string, parsingOptions?: FileParsingOptions): any;
    static fromCsv(filePath: string, parsingOptions?: FileParsingOptions): any;
    static fromTsv(filePath: string, parsingOptions?: FileParsingOptions): any;
    /**
       * Parse a Gherkin-style Feature file (SpecFlow/Cucumber),
       * take a "examples table" from it and convert to usable format
       * @param filePath feature file path
       * @param parsingOptions some optional configuration for parsing
       * @param parsingOptions.examplesTableIndex which Nth table will be taken. by default = 1
       * @returns an array of objects
       */
    static fromGherkinFeatureFile(filePath: string, parsingOptions?: FeatureFileParsingOptions): any;
    static fromExcel(filePath: string): void;
}
