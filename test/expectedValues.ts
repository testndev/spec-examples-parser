const greetingsWithSpaces = [
  { name: 'Sébastien', language: 'french', greetingWord: 'Bonjour', expectedPhrase: 'Bonjour Sébastien !' },
  { name: 'édouard', language: 'english', greetingWord: 'Hello', expectedPhrase: 'Hello Édouard!' },
  { name: 'ROSA', language: 'spanish', greetingWord: 'Hola', expectedPhrase: '¡Hola Rosa!' },
  { name: 'Paul', language: 'italian', greetingWord: 'Ciao', expectedPhrase: 'Ciao Paul!' },
  { name: 'Samuel', language: 'danish', greetingWord: 'Hej', expectedPhrase: 'Hej Samuel!' },
];

/**
 * note: one the keys contains space 
 */
const europeanCoutriesInfos = [
  { name: 'France', capital: 'Paris', currency: 'Euro', 'calling code': '+33'}, 
  { name: 'Germany', capital: 'Berlin', currency: 'Euro', 'calling code': '+49'}, 
  { name: 'Norway', capital: 'Oslo', currency: 'Norwegian krone', 'calling code': '+47'}, 
];

const eatingCucumberLeft = [
  { start: '12', eat: '5', left: '7' },
  { start: '20', eat: '5', left: '15' },
];

const eatingApplesLeft = [
  { start: '10', eat: '4', left: '6' },
];


const simpleAbcValues = [
  { letter: 'A', order: '1' },
  { letter: 'B', order: '2' },
  { letter: 'Z', order: '26' },
];

const abzWithOrdersAsNumber = [
  { letter: 'A', order: 1 },
  { letter: 'B', order: 2 },
  { letter: 'Z', order: 26 },
];

const firstValueIsEmpty = [
  { name: '', language: 'english', greetingWord: 'Hello', expectedPhrase: 'Hello!' },
];

const emptyList = [];

export {
  emptyList,
  firstValueIsEmpty,
  simpleAbcValues,
  abzWithOrdersAsNumber,
  greetingsWithSpaces,
  eatingApplesLeft,
  eatingCucumberLeft,
  europeanCoutriesInfos,
}