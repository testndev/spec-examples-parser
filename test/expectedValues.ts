export const greetingsWithSpaces = [
  { name: 'Sébastien', language: 'french', greetingWord: 'Bonjour', expectedPhrase: 'Bonjour Sébastien !' },
  { name: 'édouard', language: 'english', greetingWord: 'Hello', expectedPhrase: 'Hello Édouard!' },
  { name: 'ROSA', language: 'spanish', greetingWord: 'Hola', expectedPhrase: '¡Hola Rosa!' },
  { name: 'Paul', language: 'italian', greetingWord: 'Ciao', expectedPhrase: 'Ciao Paul!' },
  { name: 'Samuel', language: 'danish', greetingWord: 'Hej', expectedPhrase: 'Hej Samuel!' }
];

export const eatingLeft = [
  { start: '12', eat: '5' , left: '7'},
  { start: '20', eat: '5' , left: '15'},
];

export const simpleAbcValues = [
  { letter: 'A', order: '1' },
  { letter: 'B', order: '2' },
  { letter: 'Z', order: '26' },
];

export const firstValueIsEmpty = [
  { name: '', language: 'english', greetingWord: 'Hello', expectedPhrase: 'Hello!' }
];

export const emptyList = [];

export const examplesListOfGherkinExamples = [
  {
    comment: 'empty text',
    textualInput: '  ',
    expectedList: emptyList
  },
  {
    comment: 'text representing table of simple values, with 2 columns and 3 lines',
    textualInput: `
    letter  | order 
      A     | 1   
      B     | 2  
      Z     | 26    
    `,
    expectedList: simpleAbcValues
  },
  {
    comment: 'text representing table with values having spaces and quotes',
    textualInput: `
    name      | language | greetingWord | expectedPhrase
    Sébastien | french   | Bonjour      | "Bonjour Sébastien !"
    édouard   | english  | Hello        | Hello Édouard!
    ROSA      | spanish  | Hola         | ¡Hola Rosa!
    Paul      | italian  | Ciao         | Ciao Paul!
    Samuel    | danish   | Hej          | Hej Samuel!
    `,
    expectedList: greetingsWithSpaces
  }
];
