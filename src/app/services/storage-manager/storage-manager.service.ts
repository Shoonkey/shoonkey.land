import { Injectable } from "@angular/core";

enum StoredData {
  NextTabID = "next-tab-id",
  TabIDs = "tab-ids",
  TabPrefix = "tab/",
}

@Injectable({
  providedIn: "root",
})
export class StorageManagerService {
  private storage = localStorage;

  getNextTabID(): number {
    const defaultNextID = 1;

    const rawData = this.storage.getItem(StoredData.NextTabID) || "";
    const parsedID = parseInt(rawData, 10);

    return isNaN(parsedID) ? defaultNextID : parsedID;
  }

  getTabIDs(): string[] {
    const commaSeparatedIDs = this.storage.getItem(StoredData.TabIDs) || "";
    return commaSeparatedIDs.split(",").filter((value) => value !== "");
  }

  getTabByID(tabID: string): string[] | null {
    const key = StoredData.TabPrefix + tabID;
    const data = this.storage.getItem(key);

    return data ? data.split("\n") : null;
  }

  saveNewTab(tab: string[]): number {
    const newID = this.getNextTabID();
    this.saveTab(newID, tab);
    return newID;
  }

  saveTab(tabID: number, tab: string[]) {
    const key = StoredData.TabPrefix + tabID;
    this.storage.setItem(key, tab.join("\n"));
  }
}
