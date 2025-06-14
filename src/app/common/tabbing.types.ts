export type ModifierType =
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
export type RawTab = string;
export type Tuning = string[];
