import { Injectable } from "@angular/core";

import {
  SavedTabData,
  TabID,
} from "../../components/tabbing/common/tabbing.types";

enum StoredData {
  NextTabID = "next-tab-id",
  TabIDs = "tab-ids",
  TabPrefix = "tab/",
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

  getAllSavedTabs(): SavedTabData[] {
    const tabs: SavedTabData[] = [];

    for (const tabID of this.getTabIDs()) {
      const tab = this.getTabByID(tabID);

      if (!tab) continue;

      tabs.push(tab);
    }

    return tabs;
  }

  getTabIDs(): TabID[] {
    const commaSeparatedIDs = this.storage.getItem(StoredData.TabIDs);

    if (!commaSeparatedIDs) return [];

    return commaSeparatedIDs.split(",").map(parseInt);
  }

  getTabByID(tabID: TabID): SavedTabData | null {
    const key = StoredData.TabPrefix + tabID;
    const data = this.storage.getItem(key);

    if (!data) return null;

    return JSON.parse(data) as SavedTabData;
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

  saveNewTab(tabData: SavedTabData): TabID {
    const newID = this.getNextTabID();
    this.saveTab(newID, tabData);
    return newID;
  }

  saveTab(tabID: TabID, tabData: SavedTabData) {
    const key = StoredData.TabPrefix + tabID;
    this.storage.setItem(key, JSON.stringify(tabData));
  }
}
