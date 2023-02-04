import { FeatureFileParsingOptions } from '../const/FileParsingOptions';
export default class MarkdownFileParser {
    /**
          * Parse a Markdown file,
          * take a "examples table" from first table
          * @param filePath markdown file path
          * @param parsingOptions some optional configuration for parsing
          * @param parsingOptions.examplesTableIndex which Nth table will be taken. by default = 1
          * @returns an array of objects
          */
    static parse(filePath: string, parsingOptions?: FeatureFileParsingOptions): any;
    private static checkIsMarkdownFile;
    private static isMarkdownWithTableText;
    private static extractExamplesTableText;
    private static firstExamplesTableText;
    private static isTableLine;
}
