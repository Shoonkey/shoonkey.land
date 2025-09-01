import { Component, inject, signal } from "@angular/core";

import {
  FretPosition,
  SavedTabData,
  SavedTabMetadata,
  TabData,
} from "../../components/tabbing/common/tabbing.types";
import { FretboardComponent } from "../../components/tabbing/fretboard/fretboard.component";
import { TabStorageManagerService } from "../../services/tab-storage-manager/tab-storage-manager.service";
import { TabTuningComponent } from "../../components/tabbing/tab-tuning/tab-tuning.component";
import { TabSheetComponent } from "../../components/tabbing/tab-sheet/tab-sheet.component";
import { TabbingToolError, TabbingToolErrorCode } from "./tabbing-tool.error";
import { TabUtility } from "../../components/tabbing/common/tabbing.util";
import { TabSelectorComponent } from "../../components/tabbing/tab-selector-dialog/tab-selector-dialog.component";

@Component({
  selector: "app-tabbing-tool",
  imports: [
    FretboardComponent,
    TabTuningComponent,
    TabSheetComponent,
    TabSelectorComponent,
  ],
  templateUrl: "./tabbing-tool.component.html",
  styleUrl: "./tabbing-tool.component.css",
})
export class TabbingToolComponent {
  private tabStorageManager = inject(TabStorageManagerService);
  // private tabParser = inject(TabParserService);

  activeTabData = signal<TabData | SavedTabData | null>(null);
  hasTabChanged = signal<boolean>(false);
  editingColumn = signal<number | null>(null);
  error = signal<string | null>(null);
  tabSelector = signal<HTMLDialogElement | null>(null);

  defaults = TabUtility.defaults;

  changeActiveTab(tabData: TabData | SavedTabData) {
    const currentActiveTab = this.activeTabData();

    // if both the current and the upcoming tabs have IDs
    // and their IDs are equal, make no change
    if (
      currentActiveTab &&
      TabUtility.isSavedTab(currentActiveTab) &&
      TabUtility.isSavedTab(tabData) &&
      currentActiveTab.id === tabData.id
    )
      return;

    this.error.set(null);
    this.hasTabChanged.set(false);
    this.activeTabData.set(tabData);
  }

  openNewTab() {
    const newTab = TabUtility.getBlankTab();
    this.changeActiveTab(newTab);
  }

  openTabByMetadata(metadata: SavedTabMetadata) {
    const content = this.tabStorageManager.getTabContentByID(metadata.id);

    if (!content) {
      this.error.set(
        TabbingToolError.getErrorMessage(TabbingToolErrorCode.TabNotFound),
      );

      return;
    }

    this.changeActiveTab({
      ...metadata,
      content,
    });
  }

  updateCurrentTab(pos: FretPosition) {
    const col = this.editingColumn();
    const data = this.activeTabData();

    if (col === null || !data) return;

    this.error.set(null);

    this.hasTabChanged.update((currentChanged) => {
      if (data.content[pos.stringLine][col] === String(pos.fretNum))
        return currentChanged;

      data.content[pos.stringLine][col] = String(pos.fretNum);
      return true;
    });

    this.activeTabData.set(data);
  }

  updateEditingColumn(idx: number) {
    this.editingColumn.update((currIdx) => {
      // Clicking on an already-selected column means unselecting it
      if (currIdx === idx) return null;

      return idx;
    });
  }

  saveTab() {
    const tabData = this.activeTabData();
    const hasTabChanged = this.hasTabChanged();

    if (!tabData || !hasTabChanged) return;

    this.tabStorageManager.saveTab(tabData);
    this.hasTabChanged.set(false);
  }

  handleTabSelection(metadata: SavedTabMetadata) {
    this.openTabByMetadata(metadata);
    this.tabSelector()?.close();
  }

  startTabPlayback() {
    // TODO(future/playback): Implement advanced parsing for playback purposes
    // const parsedTab = this.tabParser.parseTab(savedTabData.tab);
  }
}
