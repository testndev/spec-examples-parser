"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEncoding = exports.getFullText = void 0;
var fs = require("fs");
function getEncoding(parsingOptions) {
    var defaultEncoding = 'utf8';
    return (parsingOptions === null || parsingOptions === void 0 ? void 0 : parsingOptions.encoding) || defaultEncoding;
}
exports.getEncoding = getEncoding;
function getFullText(filePath, parsingOptions) {
    return fs.readFileSync(filePath, getEncoding(parsingOptions));
}
exports.getFullText = getFullText;
//# sourceMappingURL=fileReading.js.map