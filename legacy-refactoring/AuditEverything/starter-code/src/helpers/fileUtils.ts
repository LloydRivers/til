export function sortByIndex(filePaths: string[]): string[] {
  return filePaths.sort((fileA, fileB) => {
    const matchA = fileA.match(/audit_(\d+)\.txt$/);
    const matchB = fileB.match(/audit_(\d+)\.txt$/);

    const indexA = matchA ? parseInt(matchA[1], 10) : Infinity;
    const indexB = matchB ? parseInt(matchB[1], 10) : Infinity;

    return indexA - indexB;
  });
}
