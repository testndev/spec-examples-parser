import { Options } from 'csv-parse/sync';

export interface FileParsingOptions extends Options {
  fileExtension?: string
}

/**
 * examplesTableIndex
 */
export interface FeatureFileParsingOptions extends FileParsingOptions {
  /**
     * which examples table we should take, if "feature file" contains many
     * default: 1
     */
  examplesTableIndex?: number
}

