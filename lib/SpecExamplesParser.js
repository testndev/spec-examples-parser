"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sync_1 = require("csv-parse/sync");
class SpecExamplesParser {
    /**
     * Convert a text listing Examples, as in Gherkin format (Examples block in "Scenario Outline")
     * @param examplesText Examples in Gherkin format
     * @returns a list of object
     */
    static fromGherkinFormatTable(examplesText) {
        const dataTable = (0, sync_1.parse)(examplesText, {
            columns: true, skip_empty_lines: true, delimiter: '|', relax_quotes: true, trim: true
        });
        return dataTable;
    }
    static fromCsv(filePath) {
        throw new Error("Not implemented yet");
    }
    static fromExcel(filePath) {
        throw new Error("Not implemented yet");
    }
}
exports.default = SpecExamplesParser;
