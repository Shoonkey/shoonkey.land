import { Injectable } from "@angular/core";

import { TabParserValidator } from "./tab-parser.validator";
import {
  ParsedTab,
  ChordLike,
  Fret,
  FretModifierFlags,
  FRET_NAMED_REGEX,
} from "./tab-parser.util";

type FretSearchData = {
  fret: Fret;
  nextSearchIdx: number;
};

type ChordSearchData = {
  chord: ChordLike;
  nextSearchIdx: number;
};

@Injectable({
  providedIn: "root",
})
export class TabParserService {
  private columnHasChord(lines: string[], columnIdx: number): boolean {
    for (const line of lines) {
      if (line[columnIdx] != "-") return true;
    }

    return false;
  }

  private parseFretModifiers(modifierStr: string): FretModifierFlags {
    console.log(`Analyzing modifiers "${modifierStr}"`);
    const mods: FretModifierFlags = {};

    let currentChar: string;
    for (let i = 0; i < modifierStr.length; i++) {
      currentChar = modifierStr[i];

      if (currentChar === "p") {
        // PS: using `.at()` here for the out-of-bounds edge case
        if (modifierStr.at(i + 1) === "b") {
          mods.preBend = true;
          i++; // skip next character (the 'b' of 'pb', pre-bend)
        } else {
          mods.pullOff = true;
        }
      } else if (currentChar === "h") {
        mods.hammerOn = true;
      } else if (currentChar === "^") {
        mods.strumUp = true;
      } else if (currentChar === "v") {
        mods.strumDown = true;
      }
    }

    TabParserValidator.hasValidFretModifiers(mods);

    return mods;
  }

  private parseFret(str: string, searchIdx: number): FretSearchData {
    const relevantString = str.substring(searchIdx);
    TabParserValidator.startsWithValidFret(relevantString);

    const match = relevantString.match(FRET_NAMED_REGEX)!;
    const strData = match.groups as { fret: string; mods: string };

    const fret: Fret = {
      fretNumber: parseInt(strData.fret, 10),
      modifiers: this.parseFretModifiers(strData.mods),
    };

    const nextSearchIdx = searchIdx + (strData.fret + strData.mods).length + 1;

    return {
      fret,
      nextSearchIdx,
    };
  }

  private parseChord(lines: string[], columnIdx: number): ChordSearchData {
    const chord: ChordLike = new Array<Fret>(lines.length);

    let nextChordSearchIdx: number = -1;
    for (let j = 0; j < lines.length; j++) {
      const { fret, nextSearchIdx: fretNextSearchIdx } = this.parseFret(
        lines[j],
        columnIdx,
      );

      chord[j] = fret;

      if (nextChordSearchIdx === -1 || fretNextSearchIdx > nextChordSearchIdx)
        nextChordSearchIdx = fretNextSearchIdx;
    }

    return {
      chord,
      nextSearchIdx: nextChordSearchIdx,
    };
  }

  parseTab(rawTab: string): ParsedTab | null {
    const trimmed = rawTab.trim();
    TabParserValidator.isNotEmpty(trimmed);

    const lines = trimmed.split("\n");
    TabParserValidator.allLinesHaveContent(lines);
    TabParserValidator.allLinesHaveTheSameLength(lines);
    TabParserValidator.tabHasAnyNote(lines);
    TabParserValidator.tabHasNoInvalidCharacters(lines);

    const parsedTab: ParsedTab = [];
    const lineLength = lines[0].length;
    for (let columnIdx = 0; columnIdx < lineLength; columnIdx++) {
      if (!this.columnHasChord(lines, columnIdx)) continue;

      // TODO: Make sure the parsing occurs correctly
      const { chord, nextSearchIdx } = this.parseChord(lines, columnIdx);
      columnIdx = nextSearchIdx;

      parsedTab.push(chord);
    }

    return parsedTab;
  }
}
