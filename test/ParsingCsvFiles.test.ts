import { test, expect } from '@playwright/test';
import { SpecExamplesParser as examples } from '../src/SpecExamplesParser';
import ReportAttachments from './helper/ReportAttachments';
import { greetingsWithSpaces, simpleAbcValues, firstValueIsEmpty } from './expectedValues';

test.describe('Parsing CSV files', () => {
  [
    {
      testTitle: 'nominal case - simple values',
      inputFilePath: './test/specexamples/csv/simple-ABC-values.csv',
      expectedList: simpleAbcValues
    },
    {
      testTitle: 'nominal case - with quotes',
      inputFilePath: './test/specexamples/csv/greetings-with-quotes.csv',
      expectedList: greetingsWithSpaces
    },
    {
      testTitle: 'alt case - with quotes and empty cell',
      inputFilePath: './test/specexamples/csv/greetings-with-quotes-empty.csv',
      expectedList: firstValueIsEmpty
    },
  ]
    .forEach(({ testTitle, inputFilePath, expectedList }) => {
      test(testTitle, async ({ }, testInfo) => {
        const result = await test.step(`when SpecExamplesParser is asked to parse "${inputFilePath}" file`, async () => {
          ReportAttachments.addInputFile(testInfo, inputFilePath);
          return examples.fromCsv(inputFilePath);
        });
        ReportAttachments.addComparisonElements(testInfo, expectedList, result);
        expect(Array.isArray(result), { message: 'result is not a array' }).toBe(true);
        expect(result, { message: 'result is not equal to expected array, represented in attachment' }).toStrictEqual(expectedList);
      });
    });

  [
    {
      testTitle: 'empty result case - 1 header line only',
      inputFilePath: './test/specexamples/csv/header-only.csv'
    },
    {
      testTitle: 'empty result case - empty file',
      inputFilePath: './test/specexamples/emptyfile.txt'
    }].forEach(({ testTitle, inputFilePath }) => {
      test(testTitle, async ({ }, testInfo) => {
        ReportAttachments.addInputFile(testInfo, inputFilePath);
        const result = examples.fromCsv(inputFilePath);
        expect(Array.isArray(result), { message: 'result is not a array' }).toBe(true);
        expect(result, { message: 'result is not empty' }).toHaveLength(0);
      });
    });
});




