import { test } from '@playwright/test';
import { SpecExamplesParser as examples } from '../src/SpecExamplesParser';
import ReportAttachments from './helper/ReportAttachments';
import { examplesListOfGherkinExamples } from "./examplesListOfGherkinExamples";
import { greetingsWithSpaces, simpleAbcValues, eatingCucumberLeft, abzWithOrdersAsNumber, eatingApplesLeft, europeanCoutriesInfos } from './expectedValues';
import { thenResultEqualsExpectedArray } from './helper/steps';



test.describe('Parsing textual Gherkin Example with magic method', () => {

  ['nominal_case', 'alt_case'].forEach(testCase => {

    test.describe('#' + testCase, () => {
      examplesListOfGherkinExamples[testCase].forEach(
        ({ textualInput, expectedList, comment }) => {
          test(`Parsing ${comment}`,
            async ({ }, testInfo) => {
              await test.step('given an "Examples" textual input with Gherkin-Style (see in attachment)', async () => {
                ReportAttachments.addInputText(testInfo, textualInput);
              });
              const result = await test.step('when SpecExamplesParser is asked to convert it to objects\' array', async () => {
                return examples.from(textualInput);
              });
              await test.step('then result is equal to expected (see \'2-expected-result.json\' in attachment)', async () => {
                await thenResultEqualsExpectedArray(testInfo, expectedList, result);
              });
            });
        });
    });
  });

});


test.describe('Parsing files with magic method', () => {

  [
    {
      testTitle: 'CSV with simple values',
      inputFilePath: './test/specexamples/csv/simple-ABC-values.csv',
      expectedList: simpleAbcValues,
    },
    {
      testTitle: 'CSV with quotes',
      inputFilePath: './test/specexamples/csv/greetings-with-quotes.csv',
      expectedList: greetingsWithSpaces,
    },
    {
      testTitle: 'TSV with quotes',
      inputFilePath: './test/specexamples/tsv/greetings-with-quotes.tsv',
      expectedList: greetingsWithSpaces,
    },
    {
      testTitle: 'Gherkin file, with by default first examples table',
      inputFilePath: './test/specexamples/gherkin/two-scenario-outlines.feature',
      expectedList: eatingCucumberLeft,
    },
    {
      testTitle: 'Gherkin file with .spec extension',
      inputFilePath: './test/specexamples/gherkin/single-scenario-outline.spec',
      expectedList: eatingApplesLeft,
    },
    {
      testTitle: 'JSON, with numbers as numerical',
      inputFilePath: './test/specexamples/json/abzWithOrdersAsNumber.json',
      expectedList: abzWithOrdersAsNumber,
    },
    {
      testTitle: 'Markdown, first table by default',
      inputFilePath: './test/specexamples/md/two-tables-countries.md',
      expectedList: europeanCoutriesInfos,
    },
    {
      testTitle: 'Markdown, table without "|"',
      inputFilePath: './test/specexamples/md/without-pipes-european-countries.md',
      expectedList: europeanCoutriesInfos,
    },
    {
      testTitle: 'non-empty TXT file',
      inputFilePath: './test/specexamples/unknownFileType.txt',
      expectedList: [],
    },
  ]
    .forEach(({ testTitle, inputFilePath, expectedList }) => {
      test(testTitle, async ({ }, testInfo) => {
        const result = await test.step(`when SpecExamplesParser is asked to parse "${inputFilePath}" file`, async () => {
          ReportAttachments.addInputFile(testInfo, inputFilePath);
          return examples.from(inputFilePath);
        });
        await thenResultEqualsExpectedArray(testInfo, expectedList, result);
      });
    });


  test('Parsing blank text with magic method', async ({ }, testInfo) => {
    const result = examples.from('   ');
    await thenResultEqualsExpectedArray(testInfo, [], result);
  });
});


