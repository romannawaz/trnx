import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { UiContainerComponent } from '@trnx/client/ui/container';

import { MatButtonModule } from '@angular/material/button';

const Material = [MatButtonModule];

@Component({
  selector: 'trnx-ui-header',
  standalone: true,
  imports: [CommonModule, ...Material, UiContainerComponent, RouterModule],
  templateUrl: './ui-header.component.html',
  styleUrls: ['./ui-header.component.scss'],
})
export class UiHeaderComponent {}
