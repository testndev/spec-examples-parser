import { test, expect } from '@playwright/test';
import examples from '../src/SpecExamplesParser';
import { greetings } from './greetings';

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
