"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertToCleanTsvFormat = exports.isTextBlankOrEmpty = void 0;
function convertToCleanTsvFormat(examplesTableLines) {
    var header = examplesTableLines[0];
    if (header.trim().startsWith('|')) {
        return examplesTableLines
            .map(function (line) {
            var trim = line.trim();
            //remove '|' at begin and end
            return trim.substring(1, trim.length - 1);
        })
            .join('\n');
    }
    else {
        return examplesTableLines
            .map(function (line) { return line.trim(); })
            .join('\n');
    }
}
exports.convertToCleanTsvFormat = convertToCleanTsvFormat;
function isTextBlankOrEmpty(text) {
    return text === undefined || text.trim() === '';
}
exports.isTextBlankOrEmpty = isTextBlankOrEmpty;
//# sourceMappingURL=texts.js.map