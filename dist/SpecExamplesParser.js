"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpecExamplesParser = void 0;
var GherkinFeatureFileParser_1 = require("./parsers/GherkinFeatureFileParser");
var JsonFileParser_1 = require("./parsers/JsonFileParser");
var DsvFileParser_1 = require("./parsers/DsvFileParser");
var GherkinFeatureTextParser_1 = require("./parsers/GherkinFeatureTextParser");
var MarkdownFileParser_1 = require("./parsers/MarkdownFileParser");
var fileReading_1 = require("./utils/fileReading");
var SpecExamplesParser = /** @class */ (function () {
    function SpecExamplesParser() {
    }
    SpecExamplesParser.from = function (text, parsingOptions) {
        if (text && text.trim().length > 0) {
            if (text.trim().split(/\r?\n/).length === 1) {
                return SpecExamplesParser.fromFile(text, parsingOptions);
            }
            else {
                return SpecExamplesParser.fromGherkinFormatTable(text, parsingOptions);
            }
        }
        else {
            return [];
        }
    };
    SpecExamplesParser.fromFile = function (filePath, parsingOptions) {
        (0, fileReading_1.controlFileIsNotEmpty)(filePath);
        switch ((0, fileReading_1.getExtension)(filePath)) {
            case 'tsv':
                return DsvFileParser_1.default.parseTsv(filePath, parsingOptions);
            case 'csv':
                return DsvFileParser_1.default.parseCsv(filePath, parsingOptions);
            case 'md':
            case 'markdown':
                return MarkdownFileParser_1.default.parse(filePath, parsingOptions);
            case 'spec':
            case 'feature':
                return GherkinFeatureFileParser_1.default.parse(filePath, parsingOptions);
            case 'json':
                return JsonFileParser_1.default.parse(filePath);
            default:
                return [];
        }
    };
    SpecExamplesParser.fromJsonFile = function (filePath) {
        return JsonFileParser_1.default.parse(filePath);
    };
    SpecExamplesParser.fromCsvFile = function (filePath, parsingOptions) {
        return DsvFileParser_1.default.parseCsv(filePath, parsingOptions);
    };
    SpecExamplesParser.fromTsvFile = function (filePath, parsingOptions) {
        return DsvFileParser_1.default.parseTsv(filePath, parsingOptions);
    };
    /**
       * Parse a Gherkin-style Feature file (SpecFlow/Cucumber),
       * take a "examples table" from it and convert to usable format
       * @param filePath feature file path
       * @param parsingOptions some optional configuration for parsing
       * @param parsingOptions.examplesTableIndex which Nth table will be taken. by default = 1
       * @returns an array of objects
       */
    SpecExamplesParser.fromGherkinFeatureFile = function (filePath, parsingOptions) {
        return GherkinFeatureFileParser_1.default.parse(filePath, parsingOptions);
    };
    /**
       * Convert a text listing Examples, as in Gherkin format (Examples block in "Scenario Outline")
       * @param examplesText Examples in Gherkin format
       * @param parsingOptions some optional configuration for parsing
       * @returns an array of objects
       */
    SpecExamplesParser.fromGherkinFormatTable = function (examplesText, parsingOptions) {
        return GherkinFeatureTextParser_1.default.parse(examplesText, parsingOptions);
    };
    return SpecExamplesParser;
}());
exports.SpecExamplesParser = SpecExamplesParser;
//# sourceMappingURL=SpecExamplesParser.js.map