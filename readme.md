# @testndev/spec-examples-parser

![License](https://img.shields.io/github/license/testndev/spec-examples-parser)
![NPM Downloads](https://img.shields.io/npm/dw/@testndev/spec-examples-parser)

![Last commit](https://img.shields.io/github/last-commit/testndev/spec-examples-parser?style=flat-square&logo=github)
![Issues](https://img.shields.io/github/issues/testndev/spec-examples-parser?style=flat-square&logo=github)

**Specification examples parser for Javascript tests**


A simple parser that turns specification examples into treatable array, for your Javascript tests.


## Example

See samples in [samples/](samples/) directory
  
Here a sample using [Playwright Test](https://playwright.dev) framework.

```javascript
import { test, expect } from '@playwright/test';
import examples from '@testndev/spec-examples-parser';
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