import { FeatureFileParsingOptions } from '../const/FileParsingOptions';
export default class GherkinFeatureFileParser {
    /**
          * Parse a Gherkin-style Feature file (SpecFlow/Cucumber),
          * take a "examples table" from it and convert to usable format
          * @param filePath feature file path
          * @param parsingOptions some optional configuration for parsing
          * @param parsingOptions.examplesTableIndex which Nth table will be taken. by default = 1
          * @returns an array of objects
          */
    static parse(filePath: string, parsingOptions?: FeatureFileParsingOptions): any;
    private static extractExamplesTableText;
    private static checkScenarioOutline;
    private static positionsOfExamplesKeywords;
    private static numberOfExamplesKeywords;
    private static checkIsFeatureFile;
    private static isGherkinFeatureText;
    private static firstExamplesTableText;
    private static isAnExempleLine;
    private static isExamplesKeyword;
}
