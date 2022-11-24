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

export {
  throwEmptyFileError,
  throwNotFeatureFileError,
  throwNoEnoughScenarioOutlineInFileError
}