import { Injectable } from "@angular/core";

import { TabData, TabID } from "../../components/tabbing/common/tabbing.types";

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

  pickNewTabID(): TabID {
    const defaultNextID = 1;

    const rawData = this.storage.getItem(StoredData.NextTabID) || "";
    const parsedID = parseInt(rawData, 10);

    const newTabID = isNaN(parsedID) ? defaultNextID : parsedID;

    this.storage.setItem(StoredData.NextTabID, (newTabID + 1).toString());

    return newTabID;
  }

  getAllSavedTabs(): TabData[] {
    const tabs: TabData[] = [];

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

  getTabByID(tabID: TabID): TabData | null {
    const key = StoredData.TabPrefix + tabID;
    const data = this.storage.getItem(key);

    if (!data) return null;

    return JSON.parse(data) as TabData;
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

  saveTab(tabData: TabData) {
    const tabID: TabID = tabData.id || this.pickNewTabID();
    const key = StoredData.TabPrefix + tabID;
    this.storage.setItem(key, JSON.stringify(tabData));
  }
}
