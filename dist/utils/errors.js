"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.throwJsonNotRepresentingListError = exports.throwFailedToParseJsonFileError = exports.throwNoEnoughScenarioOutlineInFileError = exports.throwNotMarkdownFileWithTablesError = exports.throwNotFeatureFileError = exports.throwEmptyFileError = exports.throwEmptyTableInFileError = exports.throwEmptyTableInText = exports.throwEmptyText = void 0;
function throwEmptyTableInText() {
    throw new Error("contains an empty table");
}
exports.throwEmptyTableInText = throwEmptyTableInText;
function throwEmptyText() {
    throw new Error('given textual example is empty');
}
exports.throwEmptyText = throwEmptyText;
function throwEmptyTableInFileError(filePath) {
    throw new Error("\"".concat(filePath, "\" file contains an empty table"));
}
exports.throwEmptyTableInFileError = throwEmptyTableInFileError;
function throwEmptyFileError(filePath) {
    throw new Error("\"".concat(filePath, "\" file is empty"));
}
exports.throwEmptyFileError = throwEmptyFileError;
function throwNoEnoughScenarioOutlineInFileError(filePath, numberOfExamplesKeywords, neededTableIndex) {
    if (numberOfExamplesKeywords === 0) {
        throw new Error("\"".concat(filePath, "\" Feature file doesn't contain any \"Scenario Outline\""));
    }
    throw new Error("\"".concat(filePath, "\" Feature file contains only ").concat(numberOfExamplesKeywords, " \"Scenario Outline\", asked for ").concat(neededTableIndex, "st"));
}
exports.throwNoEnoughScenarioOutlineInFileError = throwNoEnoughScenarioOutlineInFileError;
function throwNotFeatureFileError(filePath) {
    throw new Error("\"".concat(filePath, "\" file is not a \"feature\" file"));
}
exports.throwNotFeatureFileError = throwNotFeatureFileError;
function throwNotMarkdownFileWithTablesError(filePath) {
    throw new Error("\"".concat(filePath, "\" file is not a \"markdown\" file with tables"));
}
exports.throwNotMarkdownFileWithTablesError = throwNotMarkdownFileWithTablesError;
function throwJsonNotRepresentingListError(filePath) {
    throw new Error("\"".concat(filePath, "\" JSON file contains an object, not a list of objects"));
}
exports.throwJsonNotRepresentingListError = throwJsonNotRepresentingListError;
function throwFailedToParseJsonFileError(filePath, originalError) {
    throw new Error("Parsing \"".concat(filePath, "\" file to object failed. ").concat(originalError.message));
}
exports.throwFailedToParseJsonFileError = throwFailedToParseJsonFileError;
//# sourceMappingURL=errors.js.map