import { Component, computed, input, model, output } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { FretPosition, Instrument, Note, Tuning } from "../common/tabbing.types";

type FretLabel = Note | number;
type ViewMode = "note" | "number";

@Component({
  selector: "app-fretboard",
  imports: [FormsModule],
  templateUrl: "./fretboard.component.html",
  styleUrl: "./fretboard.component.css",
})
export class FretboardComponent {
  octaveNotes: Note[] = [
    "C",
    "C#",
    "D",
    "D#",
    "E",
    "F",
    "F#",
    "G",
    "G#",
    "A",
    "A#",
    "B",
  ];

  fretAmount = input.required<number>();
  instrument = input.required<Instrument>();
  tuning = input.required<Tuning>();
  key = input<string>("");

  viewMode = model<ViewMode>("number");

  fretTapped = output<FretPosition>();
  keyChanged = output<string>();

  fretboardArray = computed<FretLabel[][]>(() => this.getFretboardArray());

  handleNoteTap(line: number, col: number) {
    this.fretTapped.emit({
      fretNum: col,
      stringLine: line,
    });
  }

  handleKeyChange(e: Event) {
    this.keyChanged.emit((e.target as HTMLSelectElement).value);
  }

  getFretboardArray() {
    const arr = new Array<Array<FretLabel>>(this.tuning().length);

    // +1 in length for the "0th fret", the open sound
    const fretIndexCount = this.fretAmount() + 1;

    let subArr;

    if (this.viewMode() === "number") {
      subArr = this.getIndexArray(fretIndexCount);
      for (let i = 0; i < this.tuning().length; i++) {
        arr[i] = subArr;
      }
    } else {
      // viewMode = "note"
      for (let i = 0; i < this.tuning().length; i++) {
        subArr = this.getNoteArray(fretIndexCount, i);
        arr[i] = subArr;
      }
    }

    return arr;
  }

  getIndexArray(length: number) {
    const idxArray = new Array<number>(length);

    for (let i = 0; i < length; i++) idxArray[i] = i;

    return idxArray;
  }

  getNoteArray(length: number, tuningNoteIdx: number) {
    const noteArray = new Array<Note>(length);

    for (let i = 0; i < length; i++)
      noteArray[i] = this.getNoteFromPosition(this.tuning()[tuningNoteIdx], i);

    return noteArray;
  }

  getNoteFromPosition(tuningNote: string, fretIndex: number) {
    const noteOctaveIndex = this.getOctaveNoteIndex(tuningNote);
    const newNoteIdx = (noteOctaveIndex + fretIndex) % this.octaveNotes.length;

    return this.octaveNotes[newNoteIdx];
  }

  getOctaveNoteIndex(note: string) {
    return this.octaveNotes.findIndex((_note) => _note === note);
  }
}
