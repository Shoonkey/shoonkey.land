export type ModifierType =
  | "strumUp"
  | "strumDown"
  | "hammerOn"
  | "pullOff"
  | "bend"
  | "preBend";

export type FretModifierFlags = Partial<Record<ModifierType, boolean>>;

export interface Fret {
  fretNumber: number;
  modifiers: FretModifierFlags;
}

export interface FretPosition {
  stringLine: number;
  fretNum: number;
}

export type ChordLike = Fret[];

export type Instrument = "guitar" | "uke";

export type TabID = number;

export type Tuning = Note[];

export interface TabData {
  id?: TabID;
  key?: string;
  tuning: Tuning;
  instrument: Instrument;
  tab: string[][];
}

export type Note =
  | "C"
  | "C#"
  | "D"
  | "D#"
  | "E"
  | "F"
  | "F#"
  | "G"
  | "G#"
  | "A"
  | "A#"
  | "B";

// TODO: bring this back when playback is to be implemented
export type ParsedTab = ChordLike[];
