import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UiContainerComponent } from '@trnx/client/ui/container';

@Component({
  selector: 'trnx-ui-footer',
  standalone: true,
  imports: [CommonModule, UiContainerComponent],
  templateUrl: './ui-footer.component.html',
  styleUrls: ['./ui-footer.component.scss'],
})
export class UiFooterComponent {}
