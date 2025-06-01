import { Component, inject, model } from "@angular/core";

import { TabComponent } from "../../components/tabbing/tab/tab.component";
import { StorageManagerService } from "../../services/storage-manager/storage-manager.service";
import { TabParserService } from "../../services/tab-parser/tab-parser.service";

@Component({
  selector: "app-tabbing-tool",
  imports: [TabComponent],
  templateUrl: "./tabbing-tool.component.html",
  styleUrl: "./tabbing-tool.component.css",
})
export class TabbingToolComponent {
  private storageManager = inject(StorageManagerService);
  private tabParser = inject(TabParserService);

  activeTab?: string;
  text = model<string>("");

  saveTab(str: string) {
    console.log(this.tabParser.parseTab(str));
  }
}
