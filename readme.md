# @testndev/spec-examples-parser

![License](https://img.shields.io/github/license/testndev/spec-examples-parser)
![NPM Downloads](https://img.shields.io/npm/dw/@testndev/spec-examples-parser)

![Last commit](https://img.shields.io/github/last-commit/testndev/spec-examples-parser?style=flat-square&logo=github)
![Issues](https://img.shields.io/github/issues/testndev/spec-examples-parser?style=flat-square&logo=github)

**Specification examples parser for TypeScript tests**

A simple parser that turns specification examples (*Gherkin* style text, CSV...) into treatable array of objects, for your TypeScript tests.

Tested with those testing frameworks:
- [Jest](https://jestjs.io/)
- [Mocha](https://mochajs.org/)
- [Playwright](https://playwright.dev/)

## Samples

> See complete and detailed samples in https://github.com/testndev/spec-examples-parser-samples
  
Let's see a first sample using [Jest](https://jestjs.io/), with TypeScript test file containing:

```typescript
import { describe, expect, test } from '@jest/globals';
import { SpecExamplesParser as examples } from '@testndev/spec-examples-parser';
import { greetings } from '../greetings';

describe(`Our_App respects local greetings formats for supported languages`, () => {
  examples.fromGherkinFormatTable(`
      name      | language | greetingWord | expectedPhrase
      Sébastien | french   | Bonjour      | "Bonjour Sébastien !"
      édouard   | english  | Hello        | Hello Édouard!
      ROSA      | spanish  | Hola         | ¡Hola Rosa!
  `)
    .forEach(({ name, language, greetingWord, expectedPhrase }) => {
      test(`Our_App says "${expectedPhrase}" to "${name}" in "${language}"`, () => {
        const greetingsPhrase = greetings(name, language);
        expect(greetingsPhrase).toContain(greetingWord);
        expect(greetingsPhrase).toBe(expectedPhrase);
      });
    });
});
```

executing this test will return in terminal: 

```
  Our_App respects local greetings formats for supported languages
    √ Our_App says "Bonjour Sébastien !" to "Sébastien" in "french" (1 ms)
    √ Our_App says "Hello Édouard!" to "édouard" in "english"
    √ Our_App says "¡Hola Rosa!" to "ROSA" in "spanish"
```

## Development

<details>
<summary><b>Development hints for maintaining and improving @testndev/spec-examples-parser</b></summary>



Setting up:

```bash
git clone git@github.com:testndev/spec-examples-parser.git
cd @testndev/spec-examples-parser
npm install
```
Testing:

```bash
npm run test
```

</details>