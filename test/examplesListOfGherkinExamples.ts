import { emptyList, simpleAbcValues, greetingsWithSpaces } from "./expectedValues";

const nominalCases = [
  {
    testCase: '#nominal_case',
    comment: 'text with header, with 2 columns and 1 line',
    textualInput: `
    letter  | order     
    A       | 1   
    `,
    expectedList: [{ "letter": "A", "order": "1" }],
  },
  {
    testCase: '#nominal_case',
    comment: 'text representing table of simple values, with 2 columns and 3 lines',
    textualInput: `
    letter  | order 
      A     | 1   
      B     | 2  
      Z     | 26    
    `,
    expectedList: simpleAbcValues,
  },
  {
    testCase: '#nominal_case',
    comment: 'text representing table with values having spaces and quotes',
    textualInput: `
    name      | language | greetingWord | expectedPhrase
    Sébastien | french   | Bonjour      | "Bonjour Sébastien !"
    édouard   | english  | Hello        | Hello Édouard!
    ROSA      | spanish  | Hola         | ¡Hola Rosa!
    Paul      | italian  | Ciao         | Ciao Paul!
    Samuel    | danish   | Hej          | Hej Samuel!
    `,
    expectedList: greetingsWithSpaces,
  },
]

const errorCases = [
  {
    testCase: '#error_case',
    comment: 'empty text',
    textualInput: '',
    partialErrorMessage: /.*given textual example is empty.*/
  },
  {
    testCase: '#error_case',
    comment: 'blank text',
    textualInput: '  ',
    partialErrorMessage: /.*given textual example is empty.*/
  },
  {
    testCase: '#error_case',
    comment: 'blank multiline text',
    textualInput: `
    
    
    `,
    partialErrorMessage: /.*given textual example is empty.*/
  },
  {
    testCase: '#error_case',
    comment: 'only 1 character',
    textualInput: 'a',
    partialErrorMessage: /.*contains an empty table.*/
  },
  {
    testCase: '#error_case',
    comment: 'text with only header',
    textualInput: `letter  | order`,
    partialErrorMessage: /.*contains an empty table.*/
  },
]

export const altCases = [

  {
    testCase: '#alt_case',
    comment: 'text representing table with values having spaces and quotes + pipes at begin/end',
    textualInput: `
    | name      | language | greetingWord | expectedPhrase        | 
    | Sébastien | french   | Bonjour      | "Bonjour Sébastien !" |  
    | édouard   | english  | Hello        | Hello Édouard!        | 
    | ROSA      | spanish  | Hola         | ¡Hola Rosa!           |   
    | Paul      | italian  | Ciao         | Ciao Paul!            |   
    | Samuel    | danish   | Hej          | Hej Samuel!           |
    `,
    expectedList: greetingsWithSpaces,
  },
]
export const examplesListOfGherkinExamples = {
  "nominal_case": nominalCases,
  "error_case": errorCases,
  "alt_case": altCases
};
