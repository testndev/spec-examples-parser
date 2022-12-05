"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fileReading_1 = require("../utils/fileReading");
var errors_1 = require("../utils/errors");
var JsonFileParser = /** @class */ (function () {
    function JsonFileParser() {
    }
    JsonFileParser.parse = function (filePath) {
        (0, fileReading_1.controlFileIsNotEmpty)(filePath);
        var fullText = (0, fileReading_1.getFullText)(filePath);
        var parsedContent;
        try {
            parsedContent = JSON.parse(fullText);
        }
        catch (error) {
            if (error.message.includes('at position 0')) {
                (0, errors_1.throwNotJsonParseableFileError)(filePath);
            }
            else {
                (0, errors_1.throwFailedToParseJsonFileError)(filePath, error);
            }
        }
        if (!Array.isArray(parsedContent)) {
            (0, errors_1.throwJsonNotRepresentingListError)(filePath);
        }
        return parsedContent;
    };
    return JsonFileParser;
}());
exports.default = JsonFileParser;
//# sourceMappingURL=JsonFileParser.js.map