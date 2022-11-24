declare function throwEmptyFileError(filePath: string): void;
declare function throwNoEnoughScenarioOutlineInFileError(filePath: string, numberOfExamplesKeywords: number, neededTableIndex: number): void;
declare function throwNotFeatureFileError(filePath: string): void;
export { throwEmptyFileError, throwNotFeatureFileError, throwNoEnoughScenarioOutlineInFileError };
