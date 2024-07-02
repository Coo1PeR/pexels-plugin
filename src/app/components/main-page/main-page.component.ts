import {Component, inject} from '@angular/core';
import {SearchBarComponent} from "./search-bar/search-bar.component";
import {ResultsComponent} from "./results/results.component";
import {MatDialog} from "@angular/material/dialog";
import {ApiKeyDialogComponent} from "./api-key-dialog/api-key-dialog.component";

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [SearchBarComponent, ResultsComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent{
  dialog = inject(MatDialog);
  apiKey: string = ''

  constructor() {
    this.dialog.open(ApiKeyDialogComponent, {});
  }
}
