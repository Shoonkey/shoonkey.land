import { Component, computed, inject, input } from "@angular/core";

import { ParsedTab, Tuning } from "../../../common/tabbing.types";
import { TabParserService } from "../../../services/tab-parser/tab-parser.service";

@Component({
  selector: "app-tab",
  imports: [],
  templateUrl: "./tab.component.html",
  styleUrl: "./tab.component.css",
})
export class TabComponent {
  private tabParser = inject(TabParserService);

  tuning = input.required<Tuning>();
  tab = input.required<ParsedTab>();

  saveTab(str: string) {}
}
