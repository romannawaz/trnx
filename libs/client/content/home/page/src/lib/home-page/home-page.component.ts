import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UiContainerComponent } from '@trnx/client/ui/container';

@Component({
  selector: 'trnx-home-page',
  standalone: true,
  imports: [CommonModule, UiContainerComponent],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent {}
