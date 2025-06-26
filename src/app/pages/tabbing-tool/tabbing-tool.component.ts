import { Component, inject, signal } from "@angular/core";

import {
  FretPosition,
  Instrument,
  TabData,
  Tuning,
} from "../../components/tabbing/common/tabbing.types";
import { TabComponent } from "../../components/tabbing/tab/tab.component";
import { FretboardComponent } from "../../components/tabbing/fretboard/fretboard.component";
import { TabStorageManagerService } from "../../services/tab-storage-manager/tab-storage-manager.service";

interface TabDefaults {
  instrument: Instrument;
  tuning: Tuning;
  fretAmount: number;
}

@Component({
  selector: "app-tabbing-tool",
  imports: [TabComponent, FretboardComponent],
  templateUrl: "./tabbing-tool.component.html",
  styleUrl: "./tabbing-tool.component.css",
})
export class TabbingToolComponent {
  private tabStorageManager = inject(TabStorageManagerService);
  // private tabParser = inject(TabParserService);

  savedTabIDs = this.tabStorageManager.getTabIDs();

  activeTabData = signal<TabData | null>(null);
  chordMode = signal<boolean>(false);
  editingColumn = signal<number | null>(null);
  error = signal<string | null>(null);

  defaults: TabDefaults = {
    instrument: "guitar",
    tuning: this.getStandardTuning("guitar"),
    fretAmount: 22,
  };

  constructor() {
    this.startNewTab();
  }

  openTab(tabId: number) {
    const savedTabData = this.tabStorageManager.getTabByID(tabId);

    if (!savedTabData) {
      // TODO: show error about tab not being available
      return;
    }

    // TODO: Implement advanced parsing for playback purposes
    // const parsedTab = this.tabParser.parseTab(savedTabData.tab);

    this.activeTabData.set(savedTabData);
  }

  updateTab(pos: FretPosition) {
    const col = this.editingColumn();

    this.activeTabData.update((data) => {
      if (!data || col === null) return null;

      data.tab[pos.stringLine][col] = String(pos.fretNum);

      return data;
    });
  }

  updateEditingColumn(idx: number) {
    this.editingColumn.set(idx);
  }

  getPlaceholderTabContent(lineCount: number) {
    const tabContent = [];

    for (let i = 0; i < lineCount; i++) {
      const line = "-----".split("");
      tabContent.push(line);
    }

    return tabContent;
  }

  startNewTab() {
    const { instrument, tuning } = this.defaults;
    const tab = this.getPlaceholderTabContent(tuning.length);

    const newTab: TabData = {
      instrument,
      tuning,
      tab,
    };

    this.activeTabData.set(newTab);
  }

  getStandardTuning(instrument: Instrument): Tuning {
    switch (instrument) {
      case "guitar":
        return "EADGBE".split("") as Tuning;
      case "uke":
        return "GCEA".split("") as Tuning;
    }
  }

  // TODO: Add manual reload button in the page HTML
  reloadLocalTabs() {
    this.savedTabIDs = this.tabStorageManager.getTabIDs();
  }
}
