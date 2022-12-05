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
var texts_1 = require("../utils/texts");
var defaultParsingOptions_1 = require("../const/defaultParsingOptions");
var errors_1 = require("../utils/errors");
var GherkinFeatureTextParser = /** @class */ (function () {
    function GherkinFeatureTextParser() {
    }
    GherkinFeatureTextParser.parse = function (examplesText, parsingOptions) {
        if ((0, texts_1.isTextBlankOrEmpty)(examplesText)) {
            (0, errors_1.throwEmptyText)();
        }
        var lines = examplesText.split('\n');
        var text = (0, texts_1.convertToCleanTsvFormat)(lines);
        var parsedContent = (0, sync_1.parse)(text, __assign(__assign({}, defaultParsingOptions_1.defaultGherkinParsingOptions), parsingOptions));
        if (parsedContent.length === 0) {
            (0, errors_1.throwEmptyTableInText)();
        }
        return parsedContent;
    };
    return GherkinFeatureTextParser;
}());
exports.default = GherkinFeatureTextParser;
//# sourceMappingURL=GherkinFeatureTextParser.js.map