import { FileParsingOptions } from "./const/FileParsingOptions";
import SpecExamplesParser from "./SpecExamplesParser";

function from(text: string, parsingOptions?: FileParsingOptions) {
    return SpecExamplesParser.from(text, parsingOptions)
}

export {
    from, 
    SpecExamplesParser
}; 