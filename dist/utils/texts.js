"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertToCleanTsvFormat = exports.isTextBlankOrEmpty = void 0;
function convertToCleanTsvFormat(examplesTableLines) {
    var tableLines = examplesTableLines.filter(function (line) { return !isTextBlankOrEmpty(line); });
    if (tableLines && tableLines.length > 1) {
        var header = tableLines[0];
        if (header.trim().startsWith('|')) {
            return tableLines
                .map(function (line) {
                var trim = line.trim();
                //remove '|' at begin and end
                return trim.substring(1, trim.length - 1);
            })
                .join('\n');
        }
        else {
            return tableLines
                .map(function (line) { return line.trim(); })
                .join('\n');
        }
    }
    else {
        return '';
    }
}
exports.convertToCleanTsvFormat = convertToCleanTsvFormat;
function isTextBlankOrEmpty(text) {
    return text === undefined || text.trim() === '';
}
exports.isTextBlankOrEmpty = isTextBlankOrEmpty;
//# sourceMappingURL=texts.js.map