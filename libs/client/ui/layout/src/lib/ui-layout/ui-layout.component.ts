import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { UiHeaderComponent } from '../ui-header/ui-header.component';
import { UiMainComponent } from '../ui-main/ui-main.component';
import { UiFooterComponent } from '../ui-footer/ui-footer.component';

@Component({
  selector: 'trnx-client-ui-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    UiHeaderComponent,
    UiMainComponent,
    UiFooterComponent,
  ],
  providers: [],
  templateUrl: './ui-layout.component.html',
  styleUrls: ['./ui-layout.component.scss'],
})
export class UiLayoutComponent {}
