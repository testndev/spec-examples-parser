"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.throwNoEnoughScenarioOutlineInFileError = exports.throwNotFeatureFileError = exports.throwEmptyFileError = void 0;
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
//# sourceMappingURL=errors.js.map