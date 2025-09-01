import {
  Component,
  ElementRef,
  inject,
  OnInit,
  output,
  signal,
  viewChild,
} from "@angular/core";

import { TabStorageManagerService } from "../../../services/tab-storage-manager/tab-storage-manager.service";
import { IconComponent } from "../../icon/icon.component";
import { SavedTabMetadata } from "../common/tabbing.types";

@Component({
  selector: "app-tab-selector",
  imports: [IconComponent],
  templateUrl: "./tab-selector-dialog.component.html",
  styleUrl: "./tab-selector-dialog.component.css",
})
export class TabSelectorComponent implements OnInit {
  private tabStorageManager = inject(TabStorageManagerService);

  dialogRef =
    viewChild.required<ElementRef<HTMLDialogElement>>("tabSelectorDialog");

  savedMetadata = signal<SavedTabMetadata[]>(
    this.tabStorageManager.getMetadata() || [],
  );

  onReady = output<HTMLDialogElement>();
  onTabSelection = output<SavedTabMetadata>();

  ngOnInit() {
    this.onReady.emit(this.dialogRef().nativeElement);
  }

  handleTabSelection(idx: number) {
    const selectedTabMetadata = this.savedMetadata()[idx];
    this.onTabSelection.emit(selectedTabMetadata);
  }

  // TODO: Add manual reload button in the dialog
  reloadLocalTabs() {
    this.savedMetadata.set(this.tabStorageManager.getMetadata() || []);
  }
}
