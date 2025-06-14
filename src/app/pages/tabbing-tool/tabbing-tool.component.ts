import { Component, inject, signal } from "@angular/core";

import { ParsedTab, Tuning } from "../../common/tabbing.types";
import { TabComponent } from "../../components/tabbing/tab/tab.component";
import { GuitarFretboardComponent } from "../../components/tabbing/guitar-fretboard/guitar-fretboard.component";
import { TabStorageManagerService } from "../../services/tab-storage-manager/tab-storage-manager.service";
import { TabParserService } from "../../services/tab-parser/tab-parser.service";

@Component({
  selector: "app-tabbing-tool",
  imports: [TabComponent, GuitarFretboardComponent],
  templateUrl: "./tabbing-tool.component.html",
  styleUrl: "./tabbing-tool.component.css",
})
export class TabbingToolComponent {
  private tabStorageManager = inject(TabStorageManagerService);
  private tabParser = inject(TabParserService);

  standardTuning: Tuning = "EADGBE".split("");
  savedTabIDs = this.tabStorageManager.getTabIDs();

  activeTab = signal<ParsedTab | null>(null);

  openTab(tabIdx: number) {
    const rawTab = this.tabStorageManager.getTabByID(tabIdx);

    if (!rawTab) {
      // TODO: show error about tab not being available
      return;
    }

    const parsedTab = this.tabParser.parseTab(rawTab);
    this.activeTab.set(parsedTab);
  }

  // TODO: Add manual reload button in the page HTML
  reloadLocalTabs() {
    this.savedTabIDs = this.tabStorageManager.getTabIDs();
  }
}
