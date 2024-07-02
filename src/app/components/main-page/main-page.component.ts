import {Component, inject, OnInit} from '@angular/core';
import {SearchBarComponent} from "./search-bar/search-bar.component";
import {ResultsComponent} from "./results/results.component";
import {MatDialog} from "@angular/material/dialog";
import {ApiKeyDialogComponent} from "./api-key-dialog/api-key-dialog.component";
import {ApiKeyService} from "../../core/services/api-key.service";

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [SearchBarComponent, ResultsComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent implements OnInit {
  private dialog = inject(MatDialog);
  private apiKeyService = inject(ApiKeyService);
  
  ngOnInit() {
    this.apiKeyService.checkAndLoadApiKey()
      .subscribe(apiKeyExists => {
        if (!apiKeyExists) {
          this.dialog.open(ApiKeyDialogComponent, {});
        }
      });
  }
}
