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
var fs = require("fs");
var sync_1 = require("csv-parse/sync");
var fileReading_1 = require("../utils/fileReading");
var errors_1 = require("../utils/errors");
var defaultParsingOptions_1 = require("../const/defaultParsingOptions");
var DsvFileParser = /** @class */ (function () {
    function DsvFileParser() {
    }
    DsvFileParser.parseCsv = function (filePath, parsingOptions) {
        (0, fileReading_1.controlFileIsNotEmpty)(filePath);
        var examplesText = fs.readFileSync(filePath);
        var parsedContent = (0, sync_1.parse)(examplesText, __assign(__assign({}, defaultParsingOptions_1.defaultCsvParsingOptions), parsingOptions));
        if (parsedContent.length === 0) {
            (0, errors_1.throwEmptyTableInFileError)(filePath);
        }
        return parsedContent;
    };
    DsvFileParser.parseTsv = function (filePath, parsingOptions) {
        (0, fileReading_1.controlFileIsNotEmpty)(filePath);
        var examplesText = fs.readFileSync(filePath);
        var parsedContent = (0, sync_1.parse)(examplesText, __assign(__assign({}, defaultParsingOptions_1.defaultTsvParsingOptions), parsingOptions));
        if (parsedContent.length === 0) {
            (0, errors_1.throwEmptyTableInFileError)(filePath);
        }
        return parsedContent;
    };
    return DsvFileParser;
}());
exports.default = DsvFileParser;
//# sourceMappingURL=DsvFileParser.js.map