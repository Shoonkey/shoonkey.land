import { FretModifierFlags } from "../../components/tabbing/common/tabbing.types";
import { TabValidationError, TabValidationErrorCode } from "./tab-parser.error";
import { FRET_REGEX, hasDigit } from "./tab-parser.util";

export class TabParserValidator {
  static isNotEmpty(text: string) {
    if (text.length === 0)
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

  static tabHasAnyNote(lines: string[]) {
    for (const line of lines) {
      if (hasDigit(line)) return;
    }

    throw new TabValidationError(TabValidationErrorCode.NoNoteTab);
  }

  static tabHasNoInvalidCharacters(lines: string[]) {
    const validModifierCharacters = "pbh^v";

    let line: string, character: string;
    for (let i = 0; i < lines.length; i++) {
      line = lines[i];

      for (let j = 0; j < line.length; j++) {
        character = line[j];

        if (
          !hasDigit(character) &&
          character != "-" &&
          !validModifierCharacters.includes(character)
        )
          throw new TabValidationError(
            TabValidationErrorCode.FoundInvalidCharacter,
            // [i, j] // maybe give position to improve the error message in the future?
          );
      }
    }
  }

  static startsWithValidFret(str: string) {
    if (!FRET_REGEX.test(str))
      throw new TabValidationError(
        TabValidationErrorCode.InvalidFretDescription,
      );
  }

  static hasValidFretModifiers(mods: FretModifierFlags) {
    if (
      // bending inconsistency
      (mods.bend && mods.preBend) ||
      // can't hammer-on and pull-off a single fret at the same time
      (mods.hammerOn && mods.pullOff) ||
      // can't strum up and down at the same time
      (mods.strumUp && mods.strumDown)
    )
      throw new TabValidationError(
        TabValidationErrorCode.InconsistentFretModifiers,
      );
  }
}
