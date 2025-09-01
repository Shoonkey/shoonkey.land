type Saved<T> = T & { id: TabID };

export type Instrument = "guitar" | "uke";

export type TabID = number;

export type Tuning = Note[];

export type TabContent = string[][];

export interface TabMetadata {
  tuning: Tuning;
  instrument: Instrument;
  title?: string;
  key?: string;
}

export type TabData = TabMetadata & { content: TabContent };

export type SavedTabMetadata = Saved<TabMetadata>;
export type SavedTabData = Saved<TabData>;

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

export interface TabDefaults {
  instrument: Instrument;
  tuning: Tuning;
  fretAmount: number;
}

export interface FretPosition {
  stringLine: number;
  fretNum: number;
}
