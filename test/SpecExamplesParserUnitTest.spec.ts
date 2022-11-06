import { test, expect } from '@playwright/test';
import { SpecExamplesParser as examples} from '../src/SpecExamplesParser';

test.describe(() => {

  const examplesListOfGherkinExamples = [
    {
      comment: 'empty',
      textualInput: ``,
      expectedList: []
    },
    {
      comment: '2 columns, 3 lines',
      textualInput: `
      letter  | order 
        A     | 1   
        B     | 2  
        Z     | 26    
      `,
      expectedList: [
        { letter: 'A', order: '1' },
        { letter: 'B', order: '2' },
        { letter: 'Z', order: '26' },
      ]
    },
    {
      comment: 'with spaces and quotes',
      textualInput: `
      name      | language | greetingWord | expectedPhrase
      Sébastien | french   | Bonjour      | "Bonjour Sébastien !"
      édouard   | english  | Hello        | Hello Édouard!
      ROSA      | spanish  | Hola         | ¡Hola Rosa!
      Paul      | italian  | Ciao         | Ciao Paul!
      Samuel    | danish   | Hej          | Hej Samuel!
      `,
      expectedList: [
        { name: 'Sébastien', language: 'french', greetingWord: 'Bonjour', expectedPhrase: 'Bonjour Sébastien !' },
        { name: 'édouard', language: 'english', greetingWord: 'Hello', expectedPhrase: 'Hello Édouard!' },
        { name: 'ROSA', language: 'spanish', greetingWord: 'Hola', expectedPhrase: '¡Hola Rosa!' },
        { name: 'Paul', language: 'italian', greetingWord: 'Ciao', expectedPhrase: 'Ciao Paul!' },
        { name: 'Samuel', language: 'danish', greetingWord: 'Hej', expectedPhrase: 'Hej Samuel!' }
      ]
    }
  ]

  examplesListOfGherkinExamples
    .forEach(
      ({ textualInput, expectedList, comment }) => {
        test(`converting Gherkin Example as text to JSON array (${comment})`,
          async ({ }, testInfo) => {
            let jsonResult: any;

            await test.step(`given an "Examples" textual input with Gherkin-Style (see attachment)`, async () => {
              testInfo.attach('1-examples.txt', { body: textualInput, contentType: 'text/plain' });
            });

            await test.step(`when SpecExamplesParser is asked to convert it to objects' array`, async () => {
              jsonResult = examples.fromGherkinFormatTable(textualInput);
              testInfo.attach('3-obtained-result.json', { body: JSON.stringify(jsonResult, null, 2), contentType: 'application/json' });
            });

            await test.step(`then the result is an array`, async () => {
              testInfo.attach('2-expected-result.json', { body: JSON.stringify(expectedList, null, 2), contentType: 'application/json' });
              expect(jsonResult).toStrictEqual(expectedList);
            });

          });
      })

});