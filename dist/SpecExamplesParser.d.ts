/// <reference types="node" />
declare type GherkinParsingOptions = {
    position?: number;
    encoding?: BufferEncoding;
};
export declare class SpecExamplesParser {
    /**
     * Convert a text listing Examples, as in Gherkin format (Examples block in "Scenario Outline")
     * @param examplesText Examples in Gherkin format
     * @returns a list of object
     */
    static fromGherkinFormatTable(examplesText: string): any;
    static fromCsv(filePath: string, encoding?: BufferEncoding): any;
    static fromTsv(filePath: string, encoding?: BufferEncoding): any;
    static fromGherkinFeatureFile(filePath: string, options?: GherkinParsingOptions): never[];
    private static positionsOfExamplesKeywords;
    private static numberOfExamplesKeywords;
    static fromExcel(filePath: string): void;
    private static isFileEmpty;
    private static isFeatureFile;
}
export {};
