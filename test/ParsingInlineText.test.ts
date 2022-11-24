import { test, expect } from '@playwright/test';
import { SpecExamplesParser as examples } from '../src/SpecExamplesParser';
import ReportAttachments from './helper/ReportAttachments';
import { examplesListOfGherkinExamples } from './expectedValues';

test.describe('Parsing textual Gherkin Example', () => {
  examplesListOfGherkinExamples.forEach(
    ({ textualInput, expectedList, comment }) => {
      test(`Parsing ${comment}`,
        async ({}, testInfo) => { 
          await test.step('given an "Examples" textual input with Gherkin-Style (see in attachment)', async () => {
            ReportAttachments.addInputText(testInfo, textualInput);
          });
          const result = await test.step('when SpecExamplesParser is asked to convert it to objects\' array', async () => {
            return examples.fromGherkinFormatTable(textualInput);
          });
          await test.step('then result is equal to expected (see \'2-expected-result.json\' in attachment)', async () => {
            ReportAttachments.addComparisonElements(testInfo, expectedList, result);
            expect(Array.isArray(result)).toBe(true);
            expect(result).toStrictEqual(expectedList);
          });

        });
    });

});


