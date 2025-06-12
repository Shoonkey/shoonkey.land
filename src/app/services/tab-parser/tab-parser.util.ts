type ModifierType =
  | "strumUp"
  | "strumDown"
  | "hammerOn"
  | "pullOff"
  | "bend"
  | "preBend";

export type FretModifierFlags = Partial<Record<ModifierType, boolean>>;
export type Fret = { fretNumber: number; modifiers: FretModifierFlags };
export type ChordLike = Fret[];
export type ParsedTab = ChordLike[];

export function hasDigit(str: string) {
  return /\d/.test(str);
}

// Expected fret format: 0 or more modifiers, followed by a number
export const FRET_REGEX = /^(ph|h|p|b|\^\v)*(\d+)/;
export const FRET_NAMED_REGEX = /^(?<mods>(pb|h|p|b|\^|v)*)(?<fret>\d+)/;
