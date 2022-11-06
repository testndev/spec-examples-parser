"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpecExamplesParser = void 0;
var sync_1 = require("csv-parse/sync");
var SpecExamplesParser = /** @class */ (function () {
    function SpecExamplesParser() {
    }
    /**
     * Convert a text listing Examples, as in Gherkin format (Examples block in "Scenario Outline")
     * @param examplesText Examples in Gherkin format
     * @returns a list of object
     */
    SpecExamplesParser.fromGherkinFormatTable = function (examplesText) {
        var dataTable = (0, sync_1.parse)(examplesText, {
            columns: true, skip_empty_lines: true, delimiter: '|', relax_quotes: true, trim: true
        });
        return dataTable;
    };
    SpecExamplesParser.fromCsv = function (filePath) {
        throw new Error("Not implemented yet");
    };
    SpecExamplesParser.fromExcel = function (filePath) {
        throw new Error("Not implemented yet");
    };
    return SpecExamplesParser;
}());
exports.SpecExamplesParser = SpecExamplesParser;
//# sourceMappingURL=SpecExamplesParser.js.map