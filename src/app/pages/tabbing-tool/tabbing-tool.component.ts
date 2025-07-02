import { Component, inject, signal } from "@angular/core";

import {
  FretPosition,
  Instrument,
  TabData,
  TabID,
  Tuning,
} from "../../components/tabbing/common/tabbing.types";
import { TabComponent } from "../../components/tabbing/tab/tab.component";
import { FretboardComponent } from "../../components/tabbing/fretboard/fretboard.component";
import { TabStorageManagerService } from "../../services/tab-storage-manager/tab-storage-manager.service";
import { ButtonComponent } from "../../components/button/button.component";
import { TabbingToolError, TabbingToolErrorCode } from "./tabbing-tool.error";

interface TabDefaults {
  instrument: Instrument;
  tuning: Tuning;
  fretAmount: number;
}

@Component({
  selector: "app-tabbing-tool",
  imports: [TabComponent, FretboardComponent, ButtonComponent],
  templateUrl: "./tabbing-tool.component.html",
  styleUrl: "./tabbing-tool.component.css",
})
export class TabbingToolComponent {
  private tabStorageManager = inject(TabStorageManagerService);
  // private tabParser = inject(TabParserService);

  savedTabIDs = signal<TabID[]>(this.tabStorageManager.getTabIDs());
  activeTabData = signal<TabData | null>(null);
  hasTabChanged = signal<boolean>(false);
  chordMode = signal<boolean>(false);
  editingColumn = signal<number | null>(null);
  error = signal<string | null>(null);

  defaults: TabDefaults = {
    instrument: "guitar",
    tuning: this.getStandardTuning("guitar"),
    fretAmount: 22,
  };

  changeActiveTab(tabData: TabData) {
    if (!!tabData.id && this.activeTabData()?.id === tabData.id) return;

    this.error.set(null);
    this.hasTabChanged.set(false);
    this.activeTabData.set(tabData);
  }

  openNewTab() {
    const newTab = this.getBlankTab();
    this.changeActiveTab(newTab);
  }

  openTabById(tabId: number) {
    const savedTabData = this.tabStorageManager.getTabByID(tabId);

    if (!savedTabData) {
      this.error.set(
        TabbingToolError.getErrorMessage(TabbingToolErrorCode.TabNotFound),
      );

      return;
    }

    this.changeActiveTab(savedTabData);
  }

  updateCurrentTab(pos: FretPosition) {
    const col = this.editingColumn();
    const data = this.activeTabData();

    if (!col || !data) return;

    data.tab[pos.stringLine][col] = String(pos.fretNum);

    this.hasTabChanged.set(true);
    this.error.set(null);
    this.activeTabData.set(data);
  }

  updateEditingColumn(idx: number) {
    this.editingColumn.update((currIdx) => {
      // Clicking on an already-selected column means unselecting it
      if (currIdx === idx) return null;

      return idx;
    });
  }

  getBlankTabContent(lineCount: number) {
    const tabContent = [];

    for (let i = 0; i < lineCount; i++) {
      const line = "-----".split("");
      tabContent.push(line);
    }

    return tabContent;
  }

  getBlankTab() {
    const { instrument, tuning } = this.defaults;
    const tab = this.getBlankTabContent(tuning.length);

    const newTab: TabData = {
      instrument,
      tuning,
      tab,
    };

    return newTab;
  }

  saveTab() {
    const tabData = this.activeTabData();
    const hasTabChanged = this.hasTabChanged();

    if (!tabData || !hasTabChanged) return;

    this.tabStorageManager.saveTab(tabData);
  }

  getStandardTuning(instrument: Instrument): Tuning {
    switch (instrument) {
      case "guitar":
        return "EADGBE".split("") as Tuning;
      case "uke":
        return "GCEA".split("") as Tuning;
    }
  }

  startTabPlayback() {
    // TODO(future/playback): Implement advanced parsing for playback purposes
    // const parsedTab = this.tabParser.parseTab(savedTabData.tab);
  }

  // TODO: Add manual reload button in the page HTML
  reloadLocalTabs() {
    this.savedTabIDs.set(this.tabStorageManager.getTabIDs());
  }
}
