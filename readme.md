# @testndev/spec-examples-parser

[![License](https://img.shields.io/github/license/testndev/spec-examples-parser)](https://github.com/testndev/spec-examples-parser/blob/main/license.txt)
[![NPM Downloads](https://img.shields.io/npm/dw/@testndev/spec-examples-parser)](https://www.npmjs.com/package/@testndev/spec-examples-parser)

[![Last commit](https://img.shields.io/github/last-commit/testndev/spec-examples-parser?style=flat-square&logo=github)](https://github.com/testndev/spec-examples-parser)
[![Issues](https://img.shields.io/github/issues/testndev/spec-examples-parser?style=flat-square&logo=github)](https://github.com/testndev/spec-examples-parser/issues)

**Specification examples parser for tests written in TypeScript**

`spec-examples-parser` is a simple parser that turns specification examples into treatable array of objects, for your TypeScript tests.

Specification examples can be given:
1. directly inside the same test file, as: 
    - ✅ [*Gherkin* style text (`Scenario Outline`)](https://cucumber.io/docs/gherkin/reference/#scenario-outline)
2. reading from files:
    - ✅ delimiter-separated values file ([CSV](https://en.wikipedia.org/wiki/Comma-separated_values) or [TSV](https://en.wikipedia.org/wiki/Tab-separated_values))
    - ✅ Feature file containing one ["`Scenario Outline`"](https://cucumber.io/docs/gherkin/reference/#scenario-outline) or more...
    - 🟥 JSON *(not yet)*
    - 🟥 markdown containing table *(not yet)*

## Works with

Tested with those testing frameworks:
- [Jest](https://jestjs.io/)
- [Mocha](https://mochajs.org/)
- [Playwright](https://playwright.dev/)

## Samples

No more chit-chat. 

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

executing this file will create and execute 3 tests, and return in terminal: 

```
  Our_App respects local greetings formats for supported languages
    √ Our_App says "Bonjour Sébastien !" to "Sébastien" in "french" (1 ms)
    √ Our_App says "Hello Édouard!" to "édouard" in "english"
    √ Our_App says "¡Hola Rosa!" to "ROSA" in "spanish"
```

> You can find more detailed samples in https://github.com/testndev/spec-examples-parser-samples. They are ready to be executed!


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