"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpecExamplesParser = void 0;
var fs = require("fs");
var sync_1 = require("csv-parse/sync");
var defaultParsingOptions_1 = require("./const/defaultParsingOptions");
var GherkinFeatureFileParser_1 = require("./parsers/GherkinFeatureFileParser");
var texts_1 = require("./utils/texts");
var SpecExamplesParser = /** @class */ (function () {
    function SpecExamplesParser() {
    }
    /**
       * Convert a text listing Examples, as in Gherkin format (Examples block in "Scenario Outline")
       * @param examplesText Examples in Gherkin format
       * @returns a list of object
       */
    SpecExamplesParser.fromGherkinFormatTable = function (examplesText, parsingOptions) {
        var lines = examplesText.split('\n');
        var text = (0, texts_1.convertToCleanTsvFormat)(lines);
        return (0, sync_1.parse)(text, __assign(__assign({}, defaultParsingOptions_1.defaultGherkinParsingOptions), parsingOptions));
    };
    SpecExamplesParser.fromCsv = function (filePath, parsingOptions) {
        var examplesText = fs.readFileSync(filePath);
        return (0, sync_1.parse)(examplesText, __assign(__assign({}, defaultParsingOptions_1.defaultCsvParsingOptions), parsingOptions));
    };
    SpecExamplesParser.fromTsv = function (filePath, parsingOptions) {
        var examplesText = fs.readFileSync(filePath);
        return (0, sync_1.parse)(examplesText, __assign(__assign({}, defaultParsingOptions_1.defaultTsvParsingOptions), parsingOptions));
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
    SpecExamplesParser.fromExcel = function (filePath) {
        console.log(" try to parse ".concat(filePath, " Excel File"));
        throw new Error('Not implemented yet');
    };
    return SpecExamplesParser;
}());
exports.SpecExamplesParser = SpecExamplesParser;
//# sourceMappingURL=SpecExamplesParser.js.map