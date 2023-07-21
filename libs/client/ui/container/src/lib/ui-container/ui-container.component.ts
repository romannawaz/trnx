import { Component, HostBinding, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'trnx-ui-container',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ui-container.component.html',
  styleUrls: ['./ui-container.component.scss'],
})
export class UiContainerComponent {
  @Input()
  mode: 'flex' | 'flex-row' = 'flex';

  @HostBinding('class.is-flex') get isFlex(): boolean {
    return this.mode === 'flex';
  }

  @HostBinding('class.is-flex-row') get isFlexRow(): boolean {
    return this.mode === 'flex-row';
  }
}
