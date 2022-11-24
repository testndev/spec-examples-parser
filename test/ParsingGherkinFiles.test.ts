import { test, expect } from '@playwright/test';
import { thenResultEqualsExpectedArray } from './helper/steps';
import { SpecExamplesParser as examples } from '../src/SpecExamplesParser';
import ReportAttachments from './helper/ReportAttachments';
import { eatingApplesLeft, eatingCucumberLeft } from './expectedValues';

test.describe('Parsing Gherkin files', () => {
  [
    {
      testTitle: 'single examples table, simple values',
      inputFilePath: './test/specexamples/gherkin/single-scenario-outline.feature',
      expectedList: eatingApplesLeft,
    },
    {
      testTitle: 'take by default first examples table',
      inputFilePath: './test/specexamples/gherkin/two-scenario-outlines.feature',
      expectedList: eatingCucumberLeft,
    },
  ]
    .forEach(({ testTitle, inputFilePath, expectedList }) => {
      test(testTitle + ' [#nominal_case]', async ({ }, testInfo) => {
        const result = await test.step(`when SpecExamplesParser is asked to parse "${inputFilePath}" file`, async () => {
          ReportAttachments.addInputFile(testInfo, inputFilePath);
          return examples.fromGherkinFeatureFile(inputFilePath);
        });
        await thenResultEqualsExpectedArray(testInfo, expectedList, result);
      });
    });


  test('asking for 2nd examples table [#alt_case]', async ({ }, testInfo) => {
    const inputFilePath = './test/specexamples/gherkin/two-scenario-outlines.feature';
    const expectedList = eatingApplesLeft;
    const result = await test.step(`when SpecExamplesParser is asked to parse 2nd examples table of "${inputFilePath}" file`, async () => {
      ReportAttachments.addInputFile(testInfo, inputFilePath);
      return examples.fromGherkinFeatureFile(inputFilePath, { examplesTableIndex: 2 });
    });
    await thenResultEqualsExpectedArray(testInfo, expectedList, result);
  });


  [
    {
      testTitle: 'without "Scenario Outline"',
      inputFilePath: './test/specexamples/gherkin/without-scenario-outline.feature',
      partialErrorMessage: /.*doesn't contain any "Scenario Outline".*/,
    },
    {
      testTitle: 'empty file',
      inputFilePath: './test/specexamples/emptyfile.txt',
      partialErrorMessage: /.*file is empty.*/,
    },
    {
      testTitle: 'not a feature file',
      inputFilePath: './test/specexamples/csv/simple-ABC-values.csv',
      partialErrorMessage: /.*not a "feature" file.*/,
    },
  ]
    .forEach(({ testTitle, inputFilePath, partialErrorMessage }) => {
      test(testTitle + ' [#error_case]', async ({ }, testInfo) => {
        ReportAttachments.addInputFile(testInfo, inputFilePath);
        const call = () => { examples.fromGherkinFeatureFile(inputFilePath); };
        expect(call).toThrow(partialErrorMessage);
      });
    });

  test('asking for nth "examples table" for file not having enough [#error_case]', async ({ }) => {
    const inputFilePath = './test/specexamples/gherkin/two-scenario-outlines.feature';
    const partialErrorMessage = /.*Feature file contains only \d "Scenario Outline".*/;
    const call = () => { examples.fromGherkinFeatureFile(inputFilePath, { examplesTableIndex: 4 }) };
    expect(call).toThrow(partialErrorMessage);
  });

});





