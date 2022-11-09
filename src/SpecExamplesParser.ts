import * as fs from 'fs';
import { parse } from 'csv-parse/sync';

export class SpecExamplesParser {

    /**
     * Convert a text listing Examples, as in Gherkin format (Examples block in "Scenario Outline")
     * @param examplesText Examples in Gherkin format
     * @returns a list of object
     */
    static fromGherkinFormatTable(examplesText: string) {
        const dataTable = parse(examplesText, {
            columns: true, skip_empty_lines: true, delimiter: '|', relax_quotes: true, trim: true
        });
        return dataTable;
    }

    static fromCsv(filePath: string, encoding: BufferEncoding = 'utf-8') {
        const examplesText = fs.readFileSync(filePath, { encoding });
        const dataTable = parse(examplesText, {
            columns: true, skip_empty_lines: true, delimiter: ',', relax_quotes: true, trim: true
        });
        return dataTable;
    }

    static fromTsv(filePath: string, encoding: BufferEncoding = 'utf-8') {
        const examplesText = fs.readFileSync(filePath, { encoding });
        const dataTable = parse(examplesText, {
            columns: true, skip_empty_lines: true, delimiter: '\t', relax_quotes: true, trim: true
        });
        return dataTable;
    }

    static fromExcel(filePath: string) {
        throw new Error("Not implemented yet");
    }
}
