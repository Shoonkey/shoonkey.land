import { Component, computed, inject, input } from "@angular/core";

import { TabParserService } from "../../../services/tab-parser/tab-parser.service";

function reverseString(s: string): string {
  return s.split("").reverse().join("");
}

@Component({
  selector: "app-tab",
  imports: [],
  templateUrl: "./tab.component.html",
  styleUrl: "./tab.component.css",
})
export class TabComponent {
  private tabParser = inject(TabParserService);

  tuning = input<string>("EADGBe");
  tab = input<string>("");

  processedTuning = computed(() => reverseString(this.tuning()));
  processedTab = computed(() => this.tabParser.parseTab(this.tab()));

  saveTab(str: string) {}
}
