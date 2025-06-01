import { Injectable } from "@angular/core";

import { TabParserValidator } from "./tab-parser.validator";

type Fret = number | undefined;
type ChordLike = Fret[];
type ParsedTab = ChordLike[];

@Injectable({
  providedIn: "root",
})
export class TabParserService {
  private isDigit(character: string): boolean {
    return /\d/.test(character);
  }

  private getNextNonDigitIdx(str: string, firstDigitIdx: number): number {
    if (firstDigitIdx === str.length - 1) return firstDigitIdx;

    let searchIdx = firstDigitIdx + 1;
    let currentCharacter = str[searchIdx];
    while (searchIdx < str.length && currentCharacter != "-") {
      searchIdx++;
      currentCharacter = str[searchIdx];
    }

    return searchIdx;
  }

  parseTab(rawTab: string): ParsedTab | null {
    const trimmed = rawTab.trim();
    TabParserValidator.isNotEmpty(trimmed);

    const lines = trimmed.split("\n");
    TabParserValidator.allLinesHaveContent(lines);
    TabParserValidator.allLinesHaveTheSameLength(lines);

    // TODO: TabParserValidator.tabHasAnyNote(lines);

    const parsedTab: ParsedTab = [];
    let chordLike: ChordLike;

    for (let i = 0; i < lines[0].length; i++) {
      for (let j = 0; j < lines.length; j++) {
        // TODO: TabParserValidator.characterIsValid(lines[j][i]);

        if (lines[j][i] == '-') continue;

        // TODO: Parse tab sign (fret number / symbol) and adjust `i` as needed

      }
    }

    return parsedTab;
  }
}
