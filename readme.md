# Specs' examples parser (*SpExParser*)

[![License](https://img.shields.io/github/license/testndev/spec-examples-parser)](https://github.com/testndev/spec-examples-parser/blob/main/license.txt)
[![NPM Downloads](https://img.shields.io/npm/dw/@testndev/spec-examples-parser)](https://www.npmjs.com/package/@testndev/spec-examples-parser)
[![Last commit](https://img.shields.io/github/last-commit/testndev/spec-examples-parser?style=flat-square&logo=github)](https://github.com/testndev/spec-examples-parser)
[![Issues](https://img.shields.io/github/issues/testndev/spec-examples-parser?style=flat-square&logo=github)](https://github.com/testndev/spec-examples-parser/issues)
[![Build status](https://img.shields.io/github/actions/workflow/status/testndev/spec-examples-parser/ci.yaml)](https://github.com/testndev/spec-examples-parser/actions)
[![codecov](https://codecov.io/gh/testndev/spec-examples-parser/branch/main/graph/badge.svg?token=MX4BJTNFIN)](https://codecov.io/gh/testndev/spec-examples-parser)

**Specification examples parser for tests written in TypeScript**

![](SpExParser-logo.svg)

`spec-examples-parser` is a simple parser that turns specification examples into treatable array of objects, for your TypeScript tests.

Specification examples can be given:
1. directly inside the same test file, as: 
    - ☑️ [*Gherkin* style text (`Scenario Outline`)](https://cucumber.io/docs/gherkin/reference/#scenario-outline)
2. reading from files:
    - ☑️ delimiter-separated values file ([CSV](https://en.wikipedia.org/wiki/Comma-separated_values) or [TSV](https://en.wikipedia.org/wiki/Tab-separated_values))
    - ☑️ Feature file (Cucumber/SpecFlow...) containing one ["`Scenario Outline`"](https://cucumber.io/docs/gherkin/reference/#scenario-outline) or more...
    - ☑️ [JSON](https://en.wikipedia.org/wiki/JSON) file
    - ☑️ Markdown containing [table](https://github.github.com/gfm/#table), based on [GitHub Flavored Markdown](https://github.github.com/gfm/#tables-extension-) specs

## Works with

Tested with those testing frameworks:
- [Jest](https://jestjs.io/)
- [Mocha](https://mochajs.org/)
- [Playwright](https://playwright.dev/)

## Install

```
npm install @testndev/spec-examples-parser
```

## Samples

No more chit-chat. 

Let's see a first sample using [Jest](https://jestjs.io/), with TypeScript test file containing:

Instead of writing this:

```typescript
import { describe, expect, test } from '@jest/globals';
import { greetings } from '../greetings';

describe(`Our_App respects local greetings formats for supported languages`, () => {
    [
        { name: 'Sébastien', language: 'french', greetingWord: 'Bonjour', expectedPhrase: 'Bonjour Sébastien !' },
        { name: 'édouard', language: 'english', greetingWord: 'Hello', expectedPhrase: 'Hello Édouard!' },
        { name: 'ROSA', language: 'spanish', greetingWord: 'Hola', expectedPhrase: '¡Hola Rosa!' },
    ].forEach(({ name, language, greetingWord, expectedPhrase }) => {
        test(`Our_App says "${expectedPhrase}" to "${name}" in "${language}"`, () => {
            const greetingsPhrase = greetings(name, language);
            expect(greetingsPhrase).toContain(greetingWord);
            expect(greetingsPhrase).toBe(expectedPhrase);
        });
    });
});
```

*SpExParser* offers this (more human-readable) alternative: 

```typescript
import { describe, expect, test } from '@jest/globals';
import { SpecExamplesParser as examples } from '@testndev/spec-examples-parser';
import { greetings } from '../greetings';

describe(`Our_App respects local greetings formats for supported languages`, () => {
    examples.from(`
      name      | language | greetingWord | expectedPhrase
      Sébastien | french   | Bonjour      | "Bonjour Sébastien !"
      édouard   | english  | Hello        | Hello Édouard!
      ROSA      | spanish  | Hola         | ¡Hola Rosa!
  `).forEach(({ name, language, greetingWord, expectedPhrase }) => {
        test(`Our_App says "${expectedPhrase}" to "${name}" in "${language}"`, () => {
            const greetingsPhrase = greetings(name, language);
            expect(greetingsPhrase).toContain(greetingWord);
            expect(greetingsPhrase).toBe(expectedPhrase);
        });
    });
});
```

Our magic `.from()` method can consume [file](test/specexamples/csv/greetings-fr-es-en.csv), simply with file path:

```typescript
examples.from('test/specexamples/csv/greetings-fr-es-en.csv') //...
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