// TODO(future/playback): bring these back when playback is to be implemented

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

export type ChordLike = Fret[];


export type ParsedTab = ChordLike[];
