import {Component, inject} from '@angular/core';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {Store} from "@ngxs/store";
import {ApiKeyActions} from "../../../core/stores/state/api-key.actions";
import {Dialog} from "@angular/cdk/dialog";

@Component({
  selector: 'app-api-key-dialog',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatFormField,
    FormsModule,
    MatInput,
    MatButton,
    MatDialogActions,
    MatDialogClose,
    MatLabel
  ],
  templateUrl: './api-key-dialog.component.html',
  styleUrl: './api-key-dialog.component.scss'
})
export class ApiKeyDialogComponent {
  readonly dialogRef = inject(MatDialogRef<ApiKeyDialogComponent>);
  apiKey!: string;
  private store = inject(Store)
  private dialog = inject(Dialog);

  // onNoClick(): void {
  //   this.dialogRef.close();
  // }

  setApiKey() {
    this.store.dispatch(new ApiKeyActions.Set(this.apiKey));
    this.dialog.closeAll();
  }
}
