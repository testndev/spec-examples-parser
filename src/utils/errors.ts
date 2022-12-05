function throwEmptyFileError(filePath: string) {
  throw new Error(`"${filePath}" file is empty`);
}

function throwNoEnoughScenarioOutlineInFileError(filePath: string, numberOfExamplesKeywords: number, neededTableIndex: number) {
  if (numberOfExamplesKeywords === 0) {
    throw new Error(`"${filePath}" Feature file doesn't contain any "Scenario Outline"`);
  }
  throw new Error(`"${filePath}" Feature file contains only ${numberOfExamplesKeywords} "Scenario Outline", asked for ${neededTableIndex}st`);
}

function throwNotFeatureFileError(filePath: string) {
  throw new Error(`"${filePath}" file is not a "feature" file`);
}

function throwJsonNotRepresentingListError(filePath: string) {
  throw new Error(`"${filePath}" JSON file contains an object, not a list of objects`);
}

function throwNotJsonParseableFileError(filePath: string) {
  throw new Error(`"${filePath}" file is not a JSON-parseable file (error at first character)`);
}

function throwFailedToParseJsonFileError(filePath: string, originalError: Error) {
  throw new Error(`Parsing "${filePath}" JSON file failed. ${originalError.message}`);
}


export {
  throwEmptyFileError,
  throwNotFeatureFileError,
  throwNoEnoughScenarioOutlineInFileError,
  throwNotJsonParseableFileError,
  throwFailedToParseJsonFileError,
  throwJsonNotRepresentingListError
}