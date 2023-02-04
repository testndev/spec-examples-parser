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
var sync_1 = require("csv-parse/sync");
var fileReading_1 = require("../utils/fileReading");
var defaultParsingOptions_1 = require("../const/defaultParsingOptions");
var texts_1 = require("../utils/texts");
var errors_1 = require("../utils/errors");
var markdownTableLineRegex = /^\s*(\|?[^|]+\|[^|]+.*)$/g;
var markdownTableSeparatorLineRegex = /^\s*\|?[|-]+$/g;
var MarkdownFileParser = /** @class */ (function () {
    function MarkdownFileParser() {
    }
    /**
          * Parse a Markdown file,
          * take a "examples table" from first table
          * @param filePath markdown file path
          * @param parsingOptions some optional configuration for parsing
          * @param parsingOptions.examplesTableIndex which Nth table will be taken. by default = 1
          * @returns an array of objects
          */
    MarkdownFileParser.parse = function (filePath, parsingOptions) {
        this.checkIsMarkdownFile(filePath);
        var fullText = (0, fileReading_1.getFullText)(filePath, parsingOptions);
        var examplesTableText = this.extractExamplesTableText(fullText);
        return (0, sync_1.parse)(examplesTableText, __assign(__assign({}, defaultParsingOptions_1.defaultGherkinParsingOptions), parsingOptions));
    };
    MarkdownFileParser.checkIsMarkdownFile = function (filePath) {
        var fullText = (0, fileReading_1.getFullText)(filePath);
        if ((0, texts_1.isTextBlankOrEmpty)(fullText)) {
            (0, errors_1.throwEmptyFileError)(filePath);
        }
        else if (!this.isMarkdownWithTableText(fullText)) {
            (0, errors_1.throwNotMarkdownFileWithTablesError)(filePath);
        }
        else {
            return true;
        }
    };
    MarkdownFileParser.isMarkdownWithTableText = function (text) {
        var _this = this;
        var lines = text.split(/\r?\n/);
        var firstLineIsTitle = text.startsWith('#');
        var hasTable = lines.findIndex(function (line) { return _this.isTableLine(line); });
        return firstLineIsTitle && hasTable;
    };
    MarkdownFileParser.extractExamplesTableText = function (fullText) {
        var startSearchingAtLine = 0;
        var examplesTableText = this.firstExamplesTableText(fullText, startSearchingAtLine);
        return examplesTableText;
    };
    MarkdownFileParser.firstExamplesTableText = function (fullText, examplesKeywordLineIndex) {
        var _this = this;
        var lines = fullText.split(/\r?\n/);
        var index = lines.findIndex(function (line) { return _this.isTableLine(line); });
        var examplesTableLines = [];
        // .every() stops when it return "false" (== not an "example line") 
        lines.slice(index).every(function (line) {
            var isTableLine = _this.isTableLine(line);
            if (isTableLine) {
                if (!markdownTableSeparatorLineRegex.test(line)) {
                    examplesTableLines.push(line);
                }
            }
            return isTableLine;
        });
        return (0, texts_1.convertToCleanTsvFormat)(examplesTableLines);
    };
    MarkdownFileParser.isTableLine = function (line) {
        return line.match(markdownTableLineRegex);
    };
    return MarkdownFileParser;
}());
exports.default = MarkdownFileParser;
//# sourceMappingURL=MarkdownFileParser.js.map