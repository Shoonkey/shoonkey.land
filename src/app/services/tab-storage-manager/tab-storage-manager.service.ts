import { Injectable } from "@angular/core";

import {
  SavedTabData,
  TabContent,
  TabID,
  SavedTabMetadata,
  TabData,
} from "../../components/tabbing/common/tabbing.types";
import { TabUtility } from "../../components/tabbing/common/tabbing.util";

enum StoredData {
  TabMetadata = "tab-metadata",
  TabPrefix = "tab/",
}

@Injectable({
  providedIn: "root",
})
export class TabStorageManagerService {
  private storage = localStorage;

  pickNewTabID(): TabID {
    const defaultFirstID = 1;
    const metadata = this.getMetadata();

    if (!metadata) return defaultFirstID;

    const lastSavedTabID = metadata[metadata.length - 1].id;
    return lastSavedTabID + 1;
  }

  getMetadata(): SavedTabMetadata[] | null {
    const metadata = this.storage.getItem(StoredData.TabMetadata);

    if (!metadata) return null;

    try {
      return JSON.parse(metadata) as SavedTabMetadata[];
    } catch (e) {
      console.error("Unable to parse tabs' metadata");
      return null;
    }
  }

  getTabContentByID(tabID: TabID): TabContent | null {
    const key = StoredData.TabPrefix + tabID;
    const data = this.storage.getItem(key);

    if (!data) return null;

    return JSON.parse(data) as TabContent;
  }

  removeTabMetadata(tabID: TabID) {
    const tabsMetadata = this.getMetadata();

    if (!tabsMetadata) return;

    const targetTabIndex = tabsMetadata.findIndex((data) => data.id === tabID);

    tabsMetadata.splice(targetTabIndex, 1);
    this.storage.setItem(StoredData.TabMetadata, JSON.stringify(tabsMetadata));
  }

  removeTab(tabID: TabID) {
    this.removeTabMetadata(tabID);

    const key = StoredData.TabPrefix + tabID;
    this.storage.removeItem(key);
  }

  addMedatada(metadata: SavedTabMetadata) {
    const m = this.getMetadata() || [];
    m.push(metadata);
    this.storage.setItem(StoredData.TabMetadata, JSON.stringify(m));
  }

  saveTab(tabData: TabData | SavedTabData) {
    let id: TabID = TabUtility.isSavedTab(tabData)
      ? tabData.id
      : this.pickNewTabID();

    const { key, tuning, instrument, content } = tabData;

    this.addMedatada({ id, key, tuning, instrument });

    const tabKey = StoredData.TabPrefix + id;
    this.storage.setItem(tabKey, JSON.stringify(content));
  }
}
