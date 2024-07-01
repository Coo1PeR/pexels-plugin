import { Component } from '@angular/core';
import {SearchBarComponent} from "./search-bar/search-bar.component";
import {ResultsComponent} from "./results/results.component";

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [SearchBarComponent, ResultsComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent {

}
