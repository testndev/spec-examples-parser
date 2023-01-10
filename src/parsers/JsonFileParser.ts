
import { getFullText, controlFileIsNotEmpty } from '../utils/fileReading';
import { throwFailedToParseJsonFileError, throwJsonNotRepresentingListError } from '../utils/errors';

export default class JsonFileParser {

  static parse(filePath: string) {
    controlFileIsNotEmpty(filePath);
    const fullText = getFullText(filePath);
    let parsedContent;
    try {
      parsedContent = JSON.parse(fullText);
    } catch (error) {      
      throwFailedToParseJsonFileError(filePath, error)
    }
    if (!Array.isArray(parsedContent)) {
      throwJsonNotRepresentingListError(filePath);
    }
    return parsedContent;
  }

}
