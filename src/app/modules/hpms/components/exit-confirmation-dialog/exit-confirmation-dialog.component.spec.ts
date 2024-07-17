import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ExitConfirmationDialogComponent } from './exit-confirmation-dialog.component';
import { By } from '@angular/platform-browser';

describe('ExitConfirmationDialogComponent', () => {
  let component: ExitConfirmationDialogComponent;
  let fixture: ComponentFixture<ExitConfirmationDialogComponent>;
  let dialogRef: MatDialogRef<ExitConfirmationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExitConfirmationDialogComponent],
      providers: [
        { provide: MatDialogRef, useValue: { close: jasmine.createSpy('close') } },
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExitConfirmationDialogComponent);
    component = fixture.componentInstance;
    dialogRef = TestBed.inject(MatDialogRef);
    fixture.detectChanges();
  });

  it('should display the correct message', () => {
    const messageElement = fixture.debugElement.query(By.css('.message')).nativeElement;
    expect(messageElement.textContent).toContain('Do you want to exit?');
  });

  it('should emit true on Yes click', () => {
    spyOn(component.confirmation, 'emit');
    const yesButton = fixture.debugElement.query(By.css('.yes-button')).nativeElement;
    yesButton.click();
    expect(component.confirmation.emit).toHaveBeenCalledWith(true);
  });

  it('should emit false on No click', () => {
    spyOn(component.confirmation, 'emit');
    const noButton = fixture.debugElement.query(By.css('.no-button')).nativeElement;
    noButton.click();
    expect(component.confirmation.emit).toHaveBeenCalledWith(false);
  });
});