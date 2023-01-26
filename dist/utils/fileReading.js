"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controlFileIsNotEmpty = exports.getFullText = exports.getExtension = void 0;
var fs = require("fs");
var errors_1 = require("./errors");
var texts_1 = require("./texts");
var defaultEncoding = 'utf8';
function getEncoding(parsingOptions) {
    return (parsingOptions === null || parsingOptions === void 0 ? void 0 : parsingOptions.encoding) || defaultEncoding;
}
function getFullText(filePath, parsingOptions) {
    return fs.readFileSync(filePath, getEncoding(parsingOptions));
}
exports.getFullText = getFullText;
function controlFileIsNotEmpty(filePath) {
    var fullText = getFullText(filePath);
    if ((0, texts_1.isTextBlankOrEmpty)(fullText)) {
        (0, errors_1.throwEmptyFileError)(filePath);
    }
}
exports.controlFileIsNotEmpty = controlFileIsNotEmpty;
function getExtension(filePath) {
    return (filePath.split('.').pop() || '').toLowerCase();
}
exports.getExtension = getExtension;
//# sourceMappingURL=fileReading.js.map