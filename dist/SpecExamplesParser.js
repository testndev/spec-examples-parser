"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpecExamplesParser = void 0;
var GherkinFeatureFileParser_1 = require("./parsers/GherkinFeatureFileParser");
var JsonFileParser_1 = require("./parsers/JsonFileParser");
var DsvFileParser_1 = require("./parsers/DsvFileParser");
var GherkinFeatureTextParser_1 = require("./parsers/GherkinFeatureTextParser");
var SpecExamplesParser = /** @class */ (function () {
    function SpecExamplesParser() {
    }
    SpecExamplesParser.fromJson = function (filePath) {
        return JsonFileParser_1.default.parse(filePath);
    };
    SpecExamplesParser.fromCsv = function (filePath, parsingOptions) {
        return DsvFileParser_1.default.parseCsv(filePath, parsingOptions);
    };
    SpecExamplesParser.fromTsv = function (filePath, parsingOptions) {
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
       * @returns a list of object
       */
    SpecExamplesParser.fromGherkinFormatTable = function (examplesText, parsingOptions) {
        return GherkinFeatureTextParser_1.default.parse(examplesText, parsingOptions);
    };
    return SpecExamplesParser;
}());
exports.SpecExamplesParser = SpecExamplesParser;
//# sourceMappingURL=SpecExamplesParser.js.map