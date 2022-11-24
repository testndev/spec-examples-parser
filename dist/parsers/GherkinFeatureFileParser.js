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
var texts_1 = require("../utils/texts");
var defaultParsingOptions_1 = require("../const/defaultParsingOptions");
var errors_1 = require("../utils/errors");
var sync_1 = require("csv-parse/sync");
var fileReading_1 = require("../utils/fileReading");
var GherkinFeatureFileParser = /** @class */ (function () {
    function GherkinFeatureFileParser() {
    }
    /**
          * Parse a Gherkin-style Feature file (SpecFlow/Cucumber),
          * take a "examples table" from it and convert to usable format
          * @param filePath feature file path
          * @param parsingOptions some optional configuration for parsing
          * @param parsingOptions.examplesTableIndex which Nth table will be taken. by default = 1
          * @returns an array of objects
          */
    GherkinFeatureFileParser.parse = function (filePath, parsingOptions) {
        var neededTableIndex = (parsingOptions === null || parsingOptions === void 0 ? void 0 : parsingOptions.examplesTableIndex) || 1;
        this.checkIsFeatureFile(filePath);
        var fullText = (0, fileReading_1.getFullText)(filePath, parsingOptions);
        this.checkScenarioOutline(fullText, neededTableIndex, filePath);
        var examplesTableText = this.extractExamplesTableText(fullText, neededTableIndex);
        return (0, sync_1.parse)(examplesTableText, __assign(__assign({}, defaultParsingOptions_1.defaultGherkinParsingOptions), parsingOptions));
    };
    GherkinFeatureFileParser.extractExamplesTableText = function (fullText, neededTableIndex) {
        var indexesOf = this.positionsOfExamplesKeywords(fullText);
        var startSearchingAtLine = indexesOf[neededTableIndex - 1];
        var examplesTableText = this.firstExamplesTableText(fullText, startSearchingAtLine);
        return examplesTableText;
    };
    GherkinFeatureFileParser.checkScenarioOutline = function (fullText, neededTableIndex, filePath) {
        var numberOfExamplesKeywords = this.numberOfExamplesKeywords(fullText);
        if (numberOfExamplesKeywords < neededTableIndex) {
            (0, errors_1.throwNoEnoughScenarioOutlineInFileError)(filePath, numberOfExamplesKeywords, neededTableIndex);
        }
        return true;
    };
    GherkinFeatureFileParser.positionsOfExamplesKeywords = function (fullText) {
        var _this = this;
        return fullText.split('\n').map(function (x, i) { return _this.isExamplesKeyword(x) ? i : -1; }).filter(function (i) { return i >= 0; });
    };
    GherkinFeatureFileParser.numberOfExamplesKeywords = function (fullText) {
        return fullText.split('\n').filter(this.isExamplesKeyword).length;
    };
    GherkinFeatureFileParser.checkIsFeatureFile = function (filePath) {
        var fullText = (0, fileReading_1.getFullText)(filePath);
        if ((0, texts_1.isTextBlankOrEmpty)(fullText)) {
            (0, errors_1.throwEmptyFileError)(filePath);
        }
        else if (!this.isGherkinFeatureText(fullText)) {
            (0, errors_1.throwNotFeatureFileError)(filePath);
        }
        else {
            return true;
        }
    };
    GherkinFeatureFileParser.isGherkinFeatureText = function (text) {
        var containsFeatureKeyword = text.toLowerCase().includes('feature:');
        return containsFeatureKeyword;
    };
    GherkinFeatureFileParser.firstExamplesTableText = function (fullText, examplesKeywordLineIndex) {
        var _this = this;
        var lines = fullText.split('\n');
        var followingLines = lines.slice(examplesKeywordLineIndex + 1);
        var examplesTableLines = [];
        // .every() stops when it return "false" (== not an "example line") 
        followingLines.every(function (line) {
            var isAnExempleLine = _this.isAnExempleLine(line);
            if (isAnExempleLine) {
                examplesTableLines.push(line);
            }
            return isAnExempleLine;
        });
        return (0, texts_1.convertToCleanTsvFormat)(examplesTableLines);
    };
    GherkinFeatureFileParser.isAnExempleLine = function (line) {
        return line.trim().startsWith('|');
    };
    GherkinFeatureFileParser.isExamplesKeyword = function (line) {
        return line.includes('Examples:');
    };
    return GherkinFeatureFileParser;
}());
exports.default = GherkinFeatureFileParser;
//# sourceMappingURL=GherkinFeatureFileParser.js.map