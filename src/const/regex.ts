const markdownTableRegex = /((\r?\n){2}|^)([^\r\n]*\|[^\r\n]*(\r?\n)?)+(?=(\r?\n){2}|$)/gm
const markdownTableLineRegex = /^\s*(\|?[^\|]+\|[^\|]+.*)$/g