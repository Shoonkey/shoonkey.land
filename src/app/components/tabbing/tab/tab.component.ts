import { Component, computed, input, output } from "@angular/core";

import { TabData } from "../common/tabbing.types";

@Component({
  selector: "app-tab",
  imports: [],
  templateUrl: "./tab.component.html",
  styleUrl: "./tab.component.css",
})
export class TabComponent {
  tabData = input.required<TabData>();
  chordMode = input.required<boolean>();
  selectedColumn = input<number | null>(null);

  onColumnClick = output<number>();

  reversedTuning = computed(() => this.tabData().tuning.reverse());
  tabLineStyles = computed(() => {
    const lineLength = this.tabData().tab[0].length;
    const btnLength = "2ch";
    return { gridTemplateColumns: `repeat(${lineLength}, ${btnLength})` };
  });

  updateSelectedColumn(idx: number) {
    this.onColumnClick.emit(idx);
  }
}
