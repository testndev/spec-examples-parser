function convertToCleanTsvFormat(examplesTableLines: string[]): string {
  const tableLines = examplesTableLines.filter(line => !isTextBlankOrEmpty(line));
  if (tableLines && tableLines.length > 1) {
    const header = tableLines[0];
    if (header.trim().startsWith('|')) {
      return tableLines
        .map((line) => {
          const trim = line.trim();
          //remove '|' at begin and end
          return trim.substring(1, trim.length - 1);
        })
        .join('\n');
    } else {
      return tableLines
        .map(line => line.trim())
        .join('\n');
    }
  }
  else {
    return '';
  }
}

function isTextBlankOrEmpty(text: string) {
  return text === undefined || text.trim() === '';
}

export {
  isTextBlankOrEmpty,
  convertToCleanTsvFormat,
};
