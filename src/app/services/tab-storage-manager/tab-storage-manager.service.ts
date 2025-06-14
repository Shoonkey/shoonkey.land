import { Injectable } from "@angular/core";

import { RawTab, Tuning } from "../../common/tabbing.types";

enum StoredData {
  NextTabID = "next-tab-id",
  TabIDs = "tab-ids",
  TabPrefix = "tab/",
}

type TabID = number;

// TODO: Add `key` and `tuning` to the data being saved
export interface SavedTab {
  id: TabID;
  // key?: string;
  // tuning: Tuning;
  data: RawTab;
}

@Injectable({
  providedIn: "root",
})
export class TabStorageManagerService {
  private storage = localStorage;

  getNextTabID(): TabID {
    const defaultNextID = 1;

    const rawData = this.storage.getItem(StoredData.NextTabID) || "";
    const parsedID = parseInt(rawData, 10);

    return isNaN(parsedID) ? defaultNextID : parsedID;
  }

  getAllSavedTabs(): SavedTab[] {
    const tabs: SavedTab[] = [];

    for (const tabID of this.getTabIDs()) {
      const tabData = this.getTabByID(tabID);

      if (!tabData) this.removeTab(tabID);
      else tabs.push({ id: tabID, data: tabData });
    }

    return tabs;
  }

  getTabIDs(): TabID[] {
    const commaSeparatedIDs = this.storage.getItem(StoredData.TabIDs);

    if (!commaSeparatedIDs) return [];

    return commaSeparatedIDs.split(",").map(parseInt);
  }

  getTabByID(tabID: TabID): RawTab | null {
    const key = StoredData.TabPrefix + tabID;
    const data = this.storage.getItem(key);

    return data ?? null;
  }

  removeTabID(tabID: TabID) {
    const tabIDs = this.getTabIDs();
    const currentTabIndex = tabIDs.findIndex((id) => id === tabID);

    tabIDs.splice(currentTabIndex, 1);
    this.storage.setItem(StoredData.TabIDs, tabIDs.join(","));
  }

  removeTab(tabID: TabID) {
    this.removeTabID(tabID);

    const key = StoredData.TabPrefix + tabID;
    this.storage.removeItem(key);
  }

  saveNewTab(rawTab: RawTab): number {
    const newID = this.getNextTabID();
    this.saveTab(newID, rawTab);
    return newID;
  }

  saveTab(tabID: TabID, rawTab: RawTab) {
    const key = StoredData.TabPrefix + tabID;
    this.storage.setItem(key, rawTab);
  }
}
