import * as fs from 'fs';
import { parse } from 'csv-parse/sync';

type GherkinParsingOptions = {
    position?: number,
    encoding?: BufferEncoding
};

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

    static fromGherkinFeatureFile(filePath: string, options?: GherkinParsingOptions) {
        const encoding = options?.encoding || 'utf-8';
        const neededTableOrder = options?.position || 1;
        const fullText = fs.readFileSync(filePath, { encoding });
        let dataTable = [];
        if (this.isFileEmpty(fullText)) {
            throw new Error(`"${filePath}" file is empty`);
        }
        else {
            if (!this.isFeatureFile(fullText)) {
                throw new Error(`"${filePath}" file is not a "feature" file`);
            }
            else {
                const numberOfExamplesKeywords = this.numberOfExamplesKeywords(fullText);
                if (numberOfExamplesKeywords > 0) {
                    if (numberOfExamplesKeywords >= neededTableOrder) {
                        const indexesOf = SpecExamplesParser.positionsOfExamplesKeywords(fullText);
                        const startSearchingAtLine = indexesOf[neededTableOrder - 1];
                        const examplesTableText = firstExamplesTableText(fullText, startSearchingAtLine);
                        dataTable = parse(examplesTableText, {
                            columns: true,
                            skip_empty_lines: true,
                            delimiter: '|',
                            relax_quotes: true,
                            trim: true
                        });
                    } else {
                        throw new Error(`"${filePath}" Feature file contains only ${numberOfExamplesKeywords} "Scenario Outline", asked for ${neededTableOrder}st`);
                    }
                }
                else {
                    throw new Error(`"${filePath}" Feature file doesn't contain any "Scenario Outline"`);
                }
            }
        }


        return dataTable;
    }

    private static positionsOfExamplesKeywords(fullText: string): number[] {
        return fullText.split('\n').map((x, i) => isExamplesKeyword(x) ? i : -1).filter(i => i >= 0);
    }


    private static numberOfExamplesKeywords(fullText: string) {
        return fullText.split('\n').filter(isExamplesKeyword).length;
    }

    static fromExcel(filePath: string) {
        throw new Error("Not implemented yet");
    }

    private static isFileEmpty(text: string) {
        return text === undefined || text.trim() === '';
    }

    private static isFeatureFile(text: string) {
        return text.toLowerCase().includes('feature:');
    }

}

function firstExamplesTableText(fullText: string, examplesKeywordLineIndex: number) {
    const lines = fullText.split('\n');
    let followingLines = lines.slice(examplesKeywordLineIndex + 1);
    let examplesTableLines: string[] = [];
    followingLines.every((line) => {
        const isAnExempleLine = line.trim().startsWith('|');
        if (isAnExempleLine) {
            examplesTableLines.push(line);
        }
        return isAnExempleLine;
    });
    return cleanExamplesTable(examplesTableLines).join('\n');
}

function isExamplesKeyword(line: string): boolean {
    return line.includes('Examples:');
}

function cleanExamplesTable(examplesTableLines: string[]) {
    if (examplesTableLines && examplesTableLines.length === 0) return [];
    const header = examplesTableLines[0];
    if (header.trim().startsWith('|')) {
        return examplesTableLines
            .map((line) => {
                const trim = line.trim();
                //remove '|' at begin and end
                return trim.substring(1, trim.length - 1);
            });
    }
    else {
        return examplesTableLines.map(line => line.trim());
    }

}

