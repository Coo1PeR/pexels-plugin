import {Component, inject} from '@angular/core';
import {MatFormField, MatLabel, MatPrefix, MatSuffix} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {MatDivider} from "@angular/material/divider";
import {Store} from "@ngxs/store";
import {SearchVideos} from "../../../core/stores/state/video.actions";

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [
    MatFormField,
    MatInput,
    MatLabel,
    FormsModule,
    MatIcon,
    MatIconButton,
    MatSuffix,
    MatPrefix,
    MatDivider,
  ],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent {
  value = '';
  private store = inject(Store)

  onSearch() {
    if (this.value.trim()) {
      this.store.dispatch(new SearchVideos(this.value));
    }
  }
}
