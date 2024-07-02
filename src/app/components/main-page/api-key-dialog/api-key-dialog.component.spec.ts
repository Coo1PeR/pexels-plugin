import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiKeyDialogComponent } from './api-key-dialog.component';

describe('ApiKeyDialogComponent', () => {
  let component: ApiKeyDialogComponent;
  let fixture: ComponentFixture<ApiKeyDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApiKeyDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApiKeyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
