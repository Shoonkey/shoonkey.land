import { Component, computed, input, output } from "@angular/core";

import { TabData } from "../common/tabbing.types";
import { ButtonComponent } from "../../button/button.component";

@Component({
  selector: "app-tab",
  imports: [ButtonComponent],
  templateUrl: "./tab.component.html",
  styleUrl: "./tab.component.css",
})
export class TabComponent {
  tabData = input.required<TabData>();
  chordMode = input.required<boolean>();
  hasTabChanged = input.required<boolean>();

  selectedColumn = input<number | null>(null);

  onColumnClick = output<number>();
  onSaveRequest = output<void>();

  reversedTuning = computed(() => this.tabData().tuning.reverse());
  tabLineStyles = computed(() => {
    const lineLength = this.tabData().tab[0].length;
    const btnLength = "2ch";
    return { gridTemplateColumns: `repeat(${lineLength}, ${btnLength})` };
  });

  updateSelectedColumn(idx: number) {
    this.onColumnClick.emit(idx);
  }

  requestTabSave() {
    this.onSaveRequest.emit();
  }
}
