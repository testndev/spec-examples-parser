import { test, expect } from '@playwright/test';
import { thenResultEqualsExpectedArray } from './helper/steps';
import { SpecExamplesParser as examples } from '../src/SpecExamplesParser';
import ReportAttachments from './helper/ReportAttachments';
import { greetingsWithSpaces, simpleAbcValues, firstValueIsEmpty } from './expectedValues';

test.describe('Parsing CSV files', () => {

  test.describe('#nominal_case', () => {

    [
      {
        testTitle: 'simple values',
        inputFilePath: './test/specexamples/csv/simple-ABC-values.csv',
        expectedList: simpleAbcValues,
      },
      {
        testTitle: 'with quotes',
        inputFilePath: './test/specexamples/csv/greetings-with-quotes.csv',
        expectedList: greetingsWithSpaces,
      },
    ]
      .forEach(({ testTitle, inputFilePath, expectedList }) => {
        test(testTitle, async ({ }, testInfo) => {
          const result = await test.step(`when SpecExamplesParser is asked to parse "${inputFilePath}" file`, async () => {
            ReportAttachments.addInputFile(testInfo, inputFilePath);
            return examples.fromCsvFile(inputFilePath);
          });
          await thenResultEqualsExpectedArray(testInfo, expectedList, result);
        });
      });

  });

  test.describe('#alt_case', () => {

    test('file with exotic encoding (latin1 / ISO 8859-1)', async ({ }, testInfo) => {
      const expectedList = greetingsWithSpaces;
      const inputFilePath = './test/specexamples/csv/greetings-with-quotes.latin1.csv';
      const result = await test.step(`when SpecExamplesParser is asked to parse "${inputFilePath}" file`, async () => {
        ReportAttachments.addInputFile(testInfo, inputFilePath);
        return examples.fromCsvFile(inputFilePath, { encoding: 'latin1' });
      });
      await thenResultEqualsExpectedArray(testInfo, expectedList, result);
    });

    [
      {
        testTitle: 'with quotes and empty cell',
        inputFilePath: './test/specexamples/csv/greetings-with-quotes-empty.csv',
        expectedList: firstValueIsEmpty,
      },
    ]
      .forEach(({ testTitle, inputFilePath, expectedList }) => {
        test(testTitle, async ({ }, testInfo) => {
          const result = await test.step(`when SpecExamplesParser is asked to parse "${inputFilePath}" file`, async () => {
            ReportAttachments.addInputFile(testInfo, inputFilePath);
            return examples.fromCsvFile(inputFilePath);
          });
          await thenResultEqualsExpectedArray(testInfo, expectedList, result);
        });
      });

  });

  test.describe('#error_case', () => {
    [
      {
        testTitle: '1 header line only',
        inputFilePath: './test/specexamples/csv/header-only.csv',
        partialErrorMessage: /.*contains an empty table.*/

      },
      {
        testTitle: 'empty file',
        inputFilePath: './test/specexamples/emptyfile.txt',
        partialErrorMessage: /.*file is empty.*/
      }
    ]
      .forEach(({ testTitle, inputFilePath, partialErrorMessage }) => {
        test(testTitle, async ({ }, testInfo) => {
          ReportAttachments.addInputFile(testInfo, inputFilePath);
          const call = () => { examples.fromCsvFile(inputFilePath); };
          expect(call).toThrow(partialErrorMessage);
        });
      });

  });

});
