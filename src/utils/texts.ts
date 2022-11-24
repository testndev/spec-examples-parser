function convertToCleanTsvFormat(examplesTableLines: string[]): string {
  const header = examplesTableLines[0];
  if (header.trim().startsWith('|')) {
    return examplesTableLines
      .map((line) => {
        const trim = line.trim();
        //remove '|' at begin and end
        return trim.substring(1, trim.length - 1);
      })
      .join('\n');
  } else {
    return examplesTableLines
      .map(line => line.trim())
      .join('\n');
  }
}

function isTextBlankOrEmpty(text: string) {
  return text === undefined || text.trim() === '';
}

export {
  isTextBlankOrEmpty,
  convertToCleanTsvFormat,
};
