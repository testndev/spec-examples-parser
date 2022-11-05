import { test, expect } from '@playwright/test';
import examples from '../src/SpecExamplesParser';
import { greetings } from './greetings';

test.describe(`Sample: testing "greetings" function`, () => {

  // simple test, without examples
  test(`Greetings are returned in English by default`, async () => {
    expect(greetings('Tom')).toBe('Hello Tom!');
  });

  // sample test/spec, 
  // with examples table given in Gherkin textual format
  examples.fromGherkinFormatTable(`
  name      | language | greetingWord | expectedPhrase
  Sébastien | french   | Bonjour      | "Bonjour Sébastien !"
  édouard   | english  | Hello        | Hello Édouard!
  ROSA      | spanish  | Hola         | ¡Hola Rosa!
  `)
    .forEach(({ name, language, greetingWord, expectedPhrase }) => {
      test(`Greetings asked in ${language} respect local format`, () => {
        const greetingsPhrase = greetings(name, language);
        expect(greetingsPhrase).toContain(greetingWord);
        expect(greetingsPhrase).toBe(expectedPhrase);
      });
    });

  //sample with examples directly in a simple JS array
  ['italian', 'danish'].forEach((language) => {
    test(`Greetings with ${language} are not supported`, async () => {
      expect(() => {
        // @ts-ignore
        greetings('Tom', language);
      }).toThrow(`Sorry, I don't speak "${language}" language.`);
    });
  });

});