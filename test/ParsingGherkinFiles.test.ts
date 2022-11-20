import { test, expect } from '@playwright/test';
import { SpecExamplesParser as examples } from '../src/SpecExamplesParser';
import ReportAttachments from './helper/ReportAttachments';
import { eatingApplesLeft, eatingCucumberLeft } from './expectedValues';

test.describe('Parsing Gherkin files', () => {
  [
    {
      testTitle: 'single examples table, simple values',
      inputFilePath: './test/specexamples/gherkin/single-scenario-outline.feature',
      expectedList: eatingApplesLeft
    },
    {
      testTitle: 'take by default first examples table',
      inputFilePath: './test/specexamples/gherkin/two-scenario-outlines.feature',
      expectedList: eatingCucumberLeft
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


  test('alt case - asking for 2nd examples table', async ({ }, testInfo) => {
    const inputFilePath = './test/specexamples/gherkin/two-scenario-outlines.feature';
    const expectedList = eatingApplesLeft;
    const result = await test.step(`when SpecExamplesParser is asked to parse 2nd examples table of "${inputFilePath}" file`, async () => {
      ReportAttachments.addInputFile(testInfo, inputFilePath);
      return examples.fromGherkinFeatureFile(inputFilePath, { position: 2 });
    });
    ReportAttachments.addComparisonElements(testInfo, expectedList, result);
    expect(Array.isArray(result), { message: 'result is not a array' }).toBe(true);
    expect(result, { message: 'result is not equal to expected array, represented in attachment' }).toStrictEqual(expectedList);
  });


  [
    {
      testTitle: 'error case - without "Scenario Outline"',
      inputFilePath: './test/specexamples/gherkin/without-scenario-outline.feature',
      partialErrorMessage: /.*doesn't contain any "Scenario Outline".*/
    },
    {
      testTitle: 'error case - empty file',
      inputFilePath: './test/specexamples/emptyfile.txt',
      partialErrorMessage: /.*file is empty.*/
    }
  ]
    .forEach(({ testTitle, inputFilePath, partialErrorMessage }) => {
      test(testTitle, async ({ }, testInfo) => {
        ReportAttachments.addInputFile(testInfo, inputFilePath);
        const call = () => { examples.fromGherkinFeatureFile(inputFilePath) };
        expect(call).toThrow(partialErrorMessage);
      });
    });
});




