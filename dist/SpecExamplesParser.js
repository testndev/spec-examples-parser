"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpecExamplesParser = void 0;
var fs = require("fs");
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
    SpecExamplesParser.fromCsv = function (filePath, encoding) {
        if (encoding === void 0) { encoding = 'utf-8'; }
        var examplesText = fs.readFileSync(filePath, { encoding: encoding });
        var dataTable = (0, sync_1.parse)(examplesText, {
            columns: true, skip_empty_lines: true, delimiter: ',', relax_quotes: true, trim: true
        });
        return dataTable;
    };
    SpecExamplesParser.fromTsv = function (filePath, encoding) {
        if (encoding === void 0) { encoding = 'utf-8'; }
        var examplesText = fs.readFileSync(filePath, { encoding: encoding });
        var dataTable = (0, sync_1.parse)(examplesText, {
            columns: true, skip_empty_lines: true, delimiter: '\t', relax_quotes: true, trim: true
        });
        return dataTable;
    };
    SpecExamplesParser.fromGherkinFeatureFile = function (filePath, options) {
        var encoding = (options === null || options === void 0 ? void 0 : options.encoding) || 'utf-8';
        var neededTableOrder = (options === null || options === void 0 ? void 0 : options.position) || 1;
        var fullText = fs.readFileSync(filePath, { encoding: encoding });
        var dataTable = [];
        if (this.isFileEmpty(fullText)) {
            throw new Error("\"".concat(filePath, "\" file is empty"));
        }
        else {
            if (!this.isFeatureFile(fullText)) {
                throw new Error("\"".concat(filePath, "\" file is not a \"feature\" file"));
            }
            else {
                var numberOfExamplesKeywords = this.numberOfExamplesKeywords(fullText);
                if (numberOfExamplesKeywords > 0) {
                    if (numberOfExamplesKeywords >= neededTableOrder) {
                        var indexesOf = SpecExamplesParser.positionsOfExamplesKeywords(fullText);
                        var startSearchingAtLine = indexesOf[neededTableOrder - 1];
                        var examplesTableText = firstExamplesTableText(fullText, startSearchingAtLine);
                        dataTable = (0, sync_1.parse)(examplesTableText, {
                            columns: true,
                            skip_empty_lines: true,
                            delimiter: '|',
                            relax_quotes: true,
                            trim: true
                        });
                    }
                    else {
                        throw new Error("\"".concat(filePath, "\" Feature file contains only ").concat(numberOfExamplesKeywords, " \"Scenario Outline\", asked for ").concat(neededTableOrder, "st"));
                    }
                }
                else {
                    throw new Error("\"".concat(filePath, "\" Feature file doesn't contain any \"Scenario Outline\""));
                }
            }
        }
        return dataTable;
    };
    SpecExamplesParser.positionsOfExamplesKeywords = function (fullText) {
        return fullText.split('\n').map(function (x, i) { return isExamplesKeyword(x) ? i : -1; }).filter(function (i) { return i >= 0; });
    };
    SpecExamplesParser.numberOfExamplesKeywords = function (fullText) {
        return fullText.split('\n').filter(isExamplesKeyword).length;
    };
    SpecExamplesParser.fromExcel = function (filePath) {
        throw new Error("Not implemented yet");
    };
    SpecExamplesParser.isFileEmpty = function (text) {
        return text === undefined || text.trim() === '';
    };
    SpecExamplesParser.isFeatureFile = function (text) {
        return text.toLowerCase().includes('feature:');
    };
    return SpecExamplesParser;
}());
exports.SpecExamplesParser = SpecExamplesParser;
function firstExamplesTableText(fullText, examplesKeywordLineIndex) {
    var lines = fullText.split('\n');
    var followingLines = lines.slice(examplesKeywordLineIndex + 1);
    var examplesTableLines = [];
    followingLines.every(function (line) {
        var isAnExempleLine = line.trim().startsWith('|');
        if (isAnExempleLine) {
            examplesTableLines.push(line);
        }
        return isAnExempleLine;
    });
    return cleanExamplesTable(examplesTableLines).join('\n');
}
function isExamplesKeyword(line) {
    return line.includes('Examples:');
}
function cleanExamplesTable(examplesTableLines) {
    if (examplesTableLines && examplesTableLines.length === 0)
        return [];
    var header = examplesTableLines[0];
    if (header.trim().startsWith('|')) {
        return examplesTableLines
            .map(function (line) {
            var trim = line.trim();
            //remove '|' at begin and end
            return trim.substring(1, trim.length - 1);
        });
    }
    else {
        return examplesTableLines.map(function (line) { return line.trim(); });
    }
}
//# sourceMappingURL=SpecExamplesParser.js.map