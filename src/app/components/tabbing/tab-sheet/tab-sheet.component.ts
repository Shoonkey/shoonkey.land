import { Component, computed, input, output } from "@angular/core";

import { TabContent } from "../common/tabbing.types";

@Component({
  selector: "app-tab-sheet",
  imports: [],
  templateUrl: "./tab-sheet.component.html",
  styleUrl: "./tab-sheet.component.css",
})
export class TabSheetComponent {
  content = input.required<TabContent>();
  hasTabChanged = input.required<boolean>();
  selectedColumn = input.required<number | null>();

  lineLength = computed(() => this.content()[0].length);

  onColumnUpdate = output<number>();
  onSaveRequest = output<void>();
}
