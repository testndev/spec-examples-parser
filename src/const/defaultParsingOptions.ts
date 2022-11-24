import { FileParsingOptions } from '../FileParsingOptions';

const defaultParsingOptions: FileParsingOptions = {
  columns: true, skip_empty_lines: true, relax_quotes: true, trim: true, encoding: 'utf-8',
};
export const defaultGherkinParsingOptions = { ...defaultParsingOptions, delimiter: '|' };
export const defaultCsvParsingOptions = { ...defaultParsingOptions, delimiter: ',' };
export const defaultTsvParsingOptions = { ...defaultParsingOptions, delimiter: '\t' };
