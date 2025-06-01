import { TabValidationError, TabValidationErrorCode } from "./tab-parser.error";

export class TabParserValidator {
  static isNotEmpty(text: string) {
    if (text.length > 0)
      throw new TabValidationError(TabValidationErrorCode.EmptyText);
  }

  static allLinesHaveContent(arr: string[]) {
    const lines = arr.filter(Boolean);

    if (lines.length === 0)
      throw new TabValidationError(TabValidationErrorCode.EmptyLine);
  }

  static allLinesHaveTheSameLength(arr: string[]) {
    const expectedLength = arr[0].length;

    for (let i = 1; i < arr.length; i++)
      if (arr[i].length != expectedLength)
        throw new TabValidationError(
          TabValidationErrorCode.LineLengthInconsistency,
        );
  }

  static validateTab(rawTab: string): void {
    const trimmed = rawTab.trim();
    this.isNotEmpty(trimmed);

    const lines = trimmed.split("\n");
    this.allLinesHaveContent(lines);
    this.allLinesHaveTheSameLength(lines);
  }
}
