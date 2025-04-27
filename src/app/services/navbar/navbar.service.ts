import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: "root"
})
export class NavbarService {
  isOpen = signal<boolean>(true);

  setNavbarOpen(open: boolean) {
    this.isOpen.set(open);
  }
}
