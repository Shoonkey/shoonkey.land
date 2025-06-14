import { TestBed } from "@angular/core/testing";

import { TabStorageManagerService } from "./tab-storage-manager.service";

describe("TabStorageManagerService", () => {
  let service: TabStorageManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TabStorageManagerService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
