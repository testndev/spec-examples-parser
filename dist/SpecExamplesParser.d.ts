export declare class SpecExamplesParser {
    /**
     * Convert a text listing Examples, as in Gherkin format (Examples block in "Scenario Outline")
     * @param examplesText Examples in Gherkin format
     * @returns a list of object
     */
    static fromGherkinFormatTable(examplesText: string): any;
    static fromCsv(filePath: string): void;
    static fromExcel(filePath: string): void;
}
