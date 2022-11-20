import { test, expect } from '@playwright/test';
import { SpecExamplesParser as examples } from '../src/SpecExamplesParser';
import ReportAttachments from './helper/ReportAttachments';
import { eatingLeft } from './expectedValues';

test.describe('Parsing Gherkin files', () => {
  [
    {
      testTitle: 'nominal case - simple values',
      inputFilePath: './test/specexamples/gherkin/eating-cucumber.feature',
      expectedList: eatingLeft
    },
  ]
    .forEach(({ testTitle, inputFilePath, expectedList }) => {
      test(testTitle, async ({ }, testInfo) => {
        const result = await test.step(`when SpecExamplesParser is asked to parse "${inputFilePath}" file`, async () => {
          ReportAttachments.addInputFile(testInfo, inputFilePath);
          return examples.fromGherkinFeatureFile(inputFilePath);
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




