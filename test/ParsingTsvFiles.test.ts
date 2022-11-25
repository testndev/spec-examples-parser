import { test } from '@playwright/test';
import { SpecExamplesParser as examples } from '../src/SpecExamplesParser';
import ReportAttachments from './helper/ReportAttachments';
import { greetingsWithSpaces, simpleAbcValues, firstValueIsEmpty } from './expectedValues';
import { thenResultEqualsExpectedArray, thenResultIsAnEmptyArray } from './helper/steps';


test.describe.serial('Parsing CSV files', () => {

  test.describe('#nominal_case', () => {

    [
      {
        testTitle: 'simple values',
        inputFilePath: './test/specexamples/tsv/simple-ABC-values.tsv',
        expectedList: simpleAbcValues,
      },
      {
        testTitle: 'with quotes',
        inputFilePath: './test/specexamples/tsv/greetings-with-quotes.tsv',
        expectedList: greetingsWithSpaces,
      },
    ]
      .forEach(({ testTitle, inputFilePath, expectedList }) => {
        test(testTitle, async ({ }, testInfo) => {
          const result = await test.step(`when SpecExamplesParser is asked to parse "${inputFilePath}" file`, async () => {
            ReportAttachments.addInputFile(testInfo, inputFilePath);
            return examples.fromTsv(inputFilePath);
          });
          await thenResultEqualsExpectedArray(testInfo, expectedList, result);
        });
      });

  });

  test.describe('#alt_case', () => {
    [
      {
        testTitle: 'with quotes and empty cell',
        inputFilePath: './test/specexamples/tsv/greetings-with-quotes-empty.tsv',
        expectedList: firstValueIsEmpty,
      },
    ]
      .forEach(({ testTitle, inputFilePath, expectedList }) => {
        test(testTitle, async ({ }, testInfo) => {
          const result = await test.step(`when SpecExamplesParser is asked to parse "${inputFilePath}" file`, async () => {
            ReportAttachments.addInputFile(testInfo, inputFilePath);
            return examples.fromTsv(inputFilePath);
          });
          await thenResultEqualsExpectedArray(testInfo, expectedList, result);
        });
      });

  });

  test.describe('#error_case', () => {

    [
      {
        testTitle: 'empty result case - 1 header line only',
        inputFilePath: './test/specexamples/tsv/header-only.tsv',
      },
      {
        testTitle: 'empty result case - empty file',
        inputFilePath: './test/specexamples/emptyfile.txt',
      }
    ]
      .forEach(({ testTitle, inputFilePath }) => {
        test(testTitle, async ({ }, testInfo) => {
          ReportAttachments.addInputFile(testInfo, inputFilePath);
          const result = examples.fromCsv(inputFilePath);
          await thenResultIsAnEmptyArray(result);
        });
      });
  });

});




