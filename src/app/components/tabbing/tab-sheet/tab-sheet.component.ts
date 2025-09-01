import { Component, computed, input, output } from "@angular/core";

import { TabData } from "../common/tabbing.types";

@Component({
  selector: "app-tab-sheet",
  imports: [],
  templateUrl: "./tab-sheet.component.html",
  styleUrl: "./tab-sheet.component.css",
})
export class TabSheetComponent {
  content = input.required<TabData["content"]>();
  hasTabChanged = input.required<boolean>();
  selectedColumn = input.required<number | null>();

  lineLength = computed(() => this.content()[0].length);

  onColumnUpdate = output<number>();
  onSaveRequest = output<void>();
}
