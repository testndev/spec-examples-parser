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
exports.defaultTsvParsingOptions = exports.defaultCsvParsingOptions = exports.defaultGherkinParsingOptions = void 0;
var defaultParsingOptions = {
    columns: true, skip_empty_lines: true, relax_quotes: true, trim: true, encoding: 'utf-8',
};
exports.defaultGherkinParsingOptions = __assign(__assign({}, defaultParsingOptions), { delimiter: '|' });
exports.defaultCsvParsingOptions = __assign(__assign({}, defaultParsingOptions), { delimiter: ',' });
exports.defaultTsvParsingOptions = __assign(__assign({}, defaultParsingOptions), { delimiter: '\t' });
//# sourceMappingURL=defaultParsingOptions.js.map