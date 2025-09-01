import { Component, input } from '@angular/core';

import { Tuning } from '../common/tabbing.types';

@Component({
  selector: 'app-tab-tuning',
  imports: [],
  templateUrl: './tab-tuning.component.html',
  styleUrl: './tab-tuning.component.css'
})
export class TabTuningComponent {
  tuning = input.required<Tuning>();
}
