import fs from 'fs';

export default class ReportAttachments {

  static addComparisonElements(testInfo, expectedList, parsingResult) {
    const contentType = 'application/json';
    const stringifiedExpectedJson = JSON.stringify(expectedList, null, 2);
    const stringifiedResult = JSON.stringify(parsingResult, null, 2);
    testInfo.attach('2-expected-result.json', { body: stringifiedExpectedJson, contentType });
    if (stringifiedResult) {
      testInfo.attach('3-obtained-result.json', { body: stringifiedResult, contentType });
    }
  }

  static addInputFile(testInfo, datasetFilePath: string, encoding: BufferEncoding = 'utf-8') {
    testInfo.attach(datasetFilePath, { body: fs.readFileSync(datasetFilePath, { encoding }), contentType: 'text/plain' });
  }

  static addInputText(testInfo, textualInput: string, encoding: BufferEncoding = 'utf-8') {
    if (textualInput !== undefined) {
      testInfo.attach('textual input', { body: textualInput, encoding: encoding, contentType: 'text/plain' });
    }
  }
}