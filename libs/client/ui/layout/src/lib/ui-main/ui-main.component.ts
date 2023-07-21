import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'trnx-ui-main',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './ui-main.component.html',
  styleUrls: ['./ui-main.component.scss'],
})
export class UiMainComponent {}
