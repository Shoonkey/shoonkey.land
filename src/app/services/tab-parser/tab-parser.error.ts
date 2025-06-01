export enum TabValidationErrorCode {
  EmptyText,
  EmptyLine,
  LineLengthInconsistency,
}

export class TabValidationError extends Error {
  static errorMessages: Record<TabValidationErrorCode, string> = {
    [TabValidationErrorCode.EmptyText]:
      "The tab looks empty... I can't parse the void 😔✊",
    [TabValidationErrorCode.EmptyLine]: "I found at least one empty line in the middle of the tab and I got confused and crashed.",
    [TabValidationErrorCode.LineLengthInconsistency]:
      "It seems some of the lines in the tab are bigger than others 🤨. Nuh uh, no parsing for u 🥀",
  };

  constructor(code: TabValidationErrorCode) {
    super(TabValidationError.errorMessages[code]);
  }
}
