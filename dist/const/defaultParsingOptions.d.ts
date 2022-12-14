/// <reference types="node" />
export declare const defaultGherkinParsingOptions: {
    delimiter: string;
    fileExtension?: string | undefined;
    auto_parse?: boolean | import("csv-parse/.").CastingFunction | undefined;
    autoParse?: boolean | import("csv-parse/.").CastingFunction | undefined;
    auto_parse_date?: boolean | import("csv-parse/.").CastingDateFunction | undefined;
    autoParseDate?: boolean | import("csv-parse/.").CastingDateFunction | undefined;
    bom?: boolean | undefined;
    cast?: boolean | import("csv-parse/.").CastingFunction | undefined;
    cast_date?: boolean | import("csv-parse/.").CastingDateFunction | undefined;
    castDate?: boolean | import("csv-parse/.").CastingDateFunction | undefined;
    columns?: boolean | import("csv-parse/.").ColumnOption[] | ((record: any) => import("csv-parse/.").ColumnOption[]) | undefined;
    group_columns_by_name?: boolean | undefined;
    groupColumnsByName?: boolean | undefined;
    comment?: string | undefined;
    encoding?: BufferEncoding | undefined;
    escape?: string | false | Buffer | null | undefined;
    from?: number | undefined;
    from_line?: number | undefined;
    fromLine?: number | undefined;
    ignore_last_delimiters?: number | boolean | undefined;
    info?: boolean | undefined;
    ltrim?: boolean | undefined;
    max_record_size?: number | undefined;
    maxRecordSize?: number | undefined;
    objname?: string | undefined;
    on_record?: ((record: any, context: import("csv-parse/.").CastingContext) => any) | undefined;
    onRecord?: ((record: any, context: import("csv-parse/.").CastingContext) => any) | undefined;
    quote?: string | boolean | Buffer | null | undefined;
    raw?: boolean | undefined;
    relax_column_count?: boolean | undefined;
    relaxColumnCount?: boolean | undefined;
    relax_column_count_less?: boolean | undefined;
    relaxColumnCountLess?: boolean | undefined;
    relax_column_count_more?: boolean | undefined;
    relaxColumnCountMore?: boolean | undefined;
    relax_quotes?: boolean | undefined;
    relaxQuotes?: boolean | undefined;
    record_delimiter?: string | string[] | Buffer | Buffer[] | undefined;
    recordDelimiter?: string | string[] | Buffer | Buffer[] | undefined;
    rtrim?: boolean | undefined;
    skip_empty_lines?: boolean | undefined;
    skipEmptyLines?: boolean | undefined;
    skip_records_with_error?: boolean | undefined;
    skipRecordsWithError?: boolean | undefined;
    skip_records_with_empty_values?: boolean | undefined;
    skipRecordsWithEmptyValues?: boolean | undefined;
    to?: number | undefined;
    to_line?: number | undefined;
    toLine?: number | undefined;
    trim?: boolean | undefined;
};
export declare const defaultCsvParsingOptions: {
    delimiter: string;
    fileExtension?: string | undefined;
    auto_parse?: boolean | import("csv-parse/.").CastingFunction | undefined;
    autoParse?: boolean | import("csv-parse/.").CastingFunction | undefined;
    auto_parse_date?: boolean | import("csv-parse/.").CastingDateFunction | undefined;
    autoParseDate?: boolean | import("csv-parse/.").CastingDateFunction | undefined;
    bom?: boolean | undefined;
    cast?: boolean | import("csv-parse/.").CastingFunction | undefined;
    cast_date?: boolean | import("csv-parse/.").CastingDateFunction | undefined;
    castDate?: boolean | import("csv-parse/.").CastingDateFunction | undefined;
    columns?: boolean | import("csv-parse/.").ColumnOption[] | ((record: any) => import("csv-parse/.").ColumnOption[]) | undefined;
    group_columns_by_name?: boolean | undefined;
    groupColumnsByName?: boolean | undefined;
    comment?: string | undefined;
    encoding?: BufferEncoding | undefined;
    escape?: string | false | Buffer | null | undefined;
    from?: number | undefined;
    from_line?: number | undefined;
    fromLine?: number | undefined;
    ignore_last_delimiters?: number | boolean | undefined;
    info?: boolean | undefined;
    ltrim?: boolean | undefined;
    max_record_size?: number | undefined;
    maxRecordSize?: number | undefined;
    objname?: string | undefined;
    on_record?: ((record: any, context: import("csv-parse/.").CastingContext) => any) | undefined;
    onRecord?: ((record: any, context: import("csv-parse/.").CastingContext) => any) | undefined;
    quote?: string | boolean | Buffer | null | undefined;
    raw?: boolean | undefined;
    relax_column_count?: boolean | undefined;
    relaxColumnCount?: boolean | undefined;
    relax_column_count_less?: boolean | undefined;
    relaxColumnCountLess?: boolean | undefined;
    relax_column_count_more?: boolean | undefined;
    relaxColumnCountMore?: boolean | undefined;
    relax_quotes?: boolean | undefined;
    relaxQuotes?: boolean | undefined;
    record_delimiter?: string | string[] | Buffer | Buffer[] | undefined;
    recordDelimiter?: string | string[] | Buffer | Buffer[] | undefined;
    rtrim?: boolean | undefined;
    skip_empty_lines?: boolean | undefined;
    skipEmptyLines?: boolean | undefined;
    skip_records_with_error?: boolean | undefined;
    skipRecordsWithError?: boolean | undefined;
    skip_records_with_empty_values?: boolean | undefined;
    skipRecordsWithEmptyValues?: boolean | undefined;
    to?: number | undefined;
    to_line?: number | undefined;
    toLine?: number | undefined;
    trim?: boolean | undefined;
};
export declare const defaultTsvParsingOptions: {
    delimiter: string;
    fileExtension?: string | undefined;
    auto_parse?: boolean | import("csv-parse/.").CastingFunction | undefined;
    autoParse?: boolean | import("csv-parse/.").CastingFunction | undefined;
    auto_parse_date?: boolean | import("csv-parse/.").CastingDateFunction | undefined;
    autoParseDate?: boolean | import("csv-parse/.").CastingDateFunction | undefined;
    bom?: boolean | undefined;
    cast?: boolean | import("csv-parse/.").CastingFunction | undefined;
    cast_date?: boolean | import("csv-parse/.").CastingDateFunction | undefined;
    castDate?: boolean | import("csv-parse/.").CastingDateFunction | undefined;
    columns?: boolean | import("csv-parse/.").ColumnOption[] | ((record: any) => import("csv-parse/.").ColumnOption[]) | undefined;
    group_columns_by_name?: boolean | undefined;
    groupColumnsByName?: boolean | undefined;
    comment?: string | undefined;
    encoding?: BufferEncoding | undefined;
    escape?: string | false | Buffer | null | undefined;
    from?: number | undefined;
    from_line?: number | undefined;
    fromLine?: number | undefined;
    ignore_last_delimiters?: number | boolean | undefined;
    info?: boolean | undefined;
    ltrim?: boolean | undefined;
    max_record_size?: number | undefined;
    maxRecordSize?: number | undefined;
    objname?: string | undefined;
    on_record?: ((record: any, context: import("csv-parse/.").CastingContext) => any) | undefined;
    onRecord?: ((record: any, context: import("csv-parse/.").CastingContext) => any) | undefined;
    quote?: string | boolean | Buffer | null | undefined;
    raw?: boolean | undefined;
    relax_column_count?: boolean | undefined;
    relaxColumnCount?: boolean | undefined;
    relax_column_count_less?: boolean | undefined;
    relaxColumnCountLess?: boolean | undefined;
    relax_column_count_more?: boolean | undefined;
    relaxColumnCountMore?: boolean | undefined;
    relax_quotes?: boolean | undefined;
    relaxQuotes?: boolean | undefined;
    record_delimiter?: string | string[] | Buffer | Buffer[] | undefined;
    recordDelimiter?: string | string[] | Buffer | Buffer[] | undefined;
    rtrim?: boolean | undefined;
    skip_empty_lines?: boolean | undefined;
    skipEmptyLines?: boolean | undefined;
    skip_records_with_error?: boolean | undefined;
    skipRecordsWithError?: boolean | undefined;
    skip_records_with_empty_values?: boolean | undefined;
    skipRecordsWithEmptyValues?: boolean | undefined;
    to?: number | undefined;
    to_line?: number | undefined;
    toLine?: number | undefined;
    trim?: boolean | undefined;
};
