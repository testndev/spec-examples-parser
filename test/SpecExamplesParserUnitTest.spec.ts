import { test, expect } from '@playwright/test';
import { SpecExamplesParser as examples} from '../src/SpecExamplesParser';
import { examplesListOfGherkinExamples } from './examplesListOfGherkinExamples';

test.describe('Parsing "Gherkin Example', () => {
  examplesListOfGherkinExamples.forEach(
      ({ textualInput, expectedList, comment }) => {
        test(`Parsing ${comment}`,
          async ({ }, testInfo) => {
            let jsonResult: any;

            await test.step(`given an "Examples" textual input with Gherkin-Style (see '1-examples.txt' in attachment)`, async () => {
              testInfo.attach('1-examples.txt', { body: textualInput, contentType: 'text/plain' });
            });

            await test.step(`when SpecExamplesParser is asked to convert it to objects' array`, async () => {
              jsonResult = examples.fromGherkinFormatTable(textualInput);
            });

            await test.step(`then the result is an array`, async () => {
              expect(Array.isArray(jsonResult)).toBe(true);
            });

            await test.step(`and result is equal to expected (see '2-expected-result.json' in attachment)`, async () => {
              testInfo.attach('2-expected-result.json', { body: JSON.stringify(expectedList, null, 2), contentType: 'application/json' });
              testInfo.attach('3-obtained-result.json', { body: JSON.stringify(jsonResult, null, 2), contentType: 'application/json' });
              expect(jsonResult).toStrictEqual(expectedList);
            });

          });
      })

});