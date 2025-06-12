export enum TabValidationErrorCode {
  EmptyText,
  EmptyLine,
  LineLengthInconsistency,
  NoNoteTab,
  FoundInvalidCharacter,
  InvalidFretDescription,
  InconsistentFretModifiers,
}

export class TabValidationError extends Error {
  static errorMessages: Record<TabValidationErrorCode, string> = {
    [TabValidationErrorCode.EmptyText]:
      "The tab looks empty... I can't parse the void 😔✊",
    [TabValidationErrorCode.EmptyLine]:
      "I found at least one empty line in the middle of the tab and I got confused and crashed.",
    [TabValidationErrorCode.LineLengthInconsistency]:
      "It seems some of the lines in the tab are bigger than others 🤨. Nuh uh, no parsing for u 🥀",
    [TabValidationErrorCode.NoNoteTab]: "No notes found in the tab.",
    [TabValidationErrorCode.FoundInvalidCharacter]:
      "Found invalid character; unable to parse properly.",
    [TabValidationErrorCode.InvalidFretDescription]:
      "Found invalid fret description in the tab; unable to parse properly.",
    [TabValidationErrorCode.InconsistentFretModifiers]:
      "Found inconsistent fret modifiers and couldn't finish parsing. " +
      "Make sure the modifiers make sense, for example: don't add both a hammer-on and a pull-off on the same fret",
  };

  constructor(code: TabValidationErrorCode) {
    super(TabValidationError.errorMessages[code]);
  }
}
