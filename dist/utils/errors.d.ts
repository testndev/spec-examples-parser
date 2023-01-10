declare function throwEmptyTableInText(): void;
declare function throwEmptyText(): void;
declare function throwEmptyTableInFileError(filePath: string): void;
declare function throwEmptyFileError(filePath: string): void;
declare function throwNoEnoughScenarioOutlineInFileError(filePath: string, numberOfExamplesKeywords: number, neededTableIndex: number): void;
declare function throwNotFeatureFileError(filePath: string): void;
declare function throwJsonNotRepresentingListError(filePath: string): void;
declare function throwFailedToParseJsonFileError(filePath: string, originalError: Error): void;
export { throwEmptyText, throwEmptyTableInText, throwEmptyTableInFileError, throwEmptyFileError, throwNotFeatureFileError, throwNoEnoughScenarioOutlineInFileError, throwFailedToParseJsonFileError, throwJsonNotRepresentingListError };
