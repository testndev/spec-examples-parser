import { test , expect} from '@playwright/test';
import { thenResultEqualsExpectedArray } from './helper/steps';
import SpecExamplesParser from '../src/SpecExamplesParser';
import ReportAttachments from './helper/ReportAttachments';
import { greetingsWithSpaces, simpleAbcValues, emptyList,abzWithOrdersAsNumber } from './expectedValues';

test.describe('Parsing JSON files', () => {

  test.describe('#nominal_case', () => {

    [
      {
        testTitle: 'simple, all strings',
        inputFilePath: './test/specexamples/json/simpleAbc.json',
        expectedList: simpleAbcValues,
      },
      {
        testTitle: 'with numbers as numerical',
        inputFilePath: './test/specexamples/json/abzWithOrdersAsNumber.json',
        expectedList: abzWithOrdersAsNumber,
      },
      {
        testTitle: 'text with space',
        inputFilePath: './test/specexamples/json/greetings.json',
        expectedList: greetingsWithSpaces,
      },
    ]
      .forEach(({ testTitle, inputFilePath, expectedList }) => {
        test(testTitle, async ({ }, testInfo) => {
          const result = await test.step(`when SpecExamplesParser is asked to parse "${inputFilePath}" file`, async () => {
            ReportAttachments.addInputFile(testInfo, inputFilePath);
            return SpecExamplesParser.fromJsonFile(inputFilePath);
          });
          await thenResultEqualsExpectedArray(testInfo, expectedList, result);
        });
      });

  });


  test.describe('#alt_case', () => {

    [
      {
        testTitle: 'empty list in JSON',
        inputFilePath: './test/specexamples/json/emptyList.json',
        expectedList: emptyList,
      },
    ]
      .forEach(({ testTitle, inputFilePath, expectedList }) => {
        test(testTitle, async ({ }, testInfo) => {
          const result = await test.step(`when SpecExamplesParser is asked to parse "${inputFilePath}" file`, async () => {
            ReportAttachments.addInputFile(testInfo, inputFilePath);
            return SpecExamplesParser.fromJsonFile(inputFilePath);
          });
          await thenResultEqualsExpectedArray(testInfo, expectedList, result);
        });
      });

  });
 
  test.describe('#error_case', () => {
    [
      {
        testTitle: 'empty file',
        inputFilePath: './test/specexamples/emptyfile.txt',
        partialErrorMessage: /.*file is empty.*/,
      },
      {
        testTitle: 'not a JSON parsable',
        inputFilePath: './test/specexamples/csv/simple-ABC-values.csv',
        partialErrorMessage: /.*Parsing ".*" file to object failed.*/,
      },
      {
        testTitle: 'with a JSON parsing error',
        inputFilePath: './test/specexamples/json/withJsonError.json',
        partialErrorMessage: /.*Parsing ".*" file to object failed.*/,
      },
      {
        testTitle: 'not a list in JSON file',
        inputFilePath: './test/specexamples/json/emptyObject.json',
        partialErrorMessage: /.*JSON file contains an object, not a list of objects.*/,
      },
    ]
      .forEach(({ testTitle, inputFilePath, partialErrorMessage }) => {
        test(testTitle, async ({ }, testInfo) => {
          ReportAttachments.addInputFile(testInfo, inputFilePath);
          const call = () => { SpecExamplesParser.fromJsonFile(inputFilePath); };
          expect(call).toThrow(partialErrorMessage);
        });
      });

     
  });

});
