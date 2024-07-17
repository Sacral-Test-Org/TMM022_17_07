import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PartMasterComponent } from './part-master.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('PartMasterComponent', () => {
  let component: PartMasterComponent;
  let fixture: ComponentFixture<PartMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PartMasterComponent],
      imports: [HttpClientTestingModule, FormsModule],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle Part Description click', () => {
    component.saveButtonEnabled = true;
    component.partDescription = 'Test Description';
    component.handlePartDescriptionClick();
    expect(component.saveButtonEnabled).toBeFalse();
    expect(component.partDescription).toBe('');
    expect(document.activeElement).toBe(fixture.debugElement.query(By.css('#partDescription')).nativeElement);
  });

  it('should validate Part Description field', () => {
    component.unitId = '';
    component.validatePartDescriptionField();
    expect(component.errorMessage).toBe('Unit ID and Unit Name should not be null');
    expect(document.activeElement).toBe(fixture.debugElement.query(By.css('#unitId')).nativeElement);

    component.unitId = 'U001';
    component.groupId = '';
    component.validatePartDescriptionField();
    expect(component.errorMessage).toBe('Group ID and Group Name should not be null');
    expect(document.activeElement).toBe(fixture.debugElement.query(By.css('#groupId')).nativeElement);

    component.groupId = 'G001';
    component.lineId = '';
    component.validatePartDescriptionField();
    expect(component.errorMessage).toBe('Line ID and Line Name should not be null');
    expect(document.activeElement).toBe(fixture.debugElement.query(By.css('#lineId')).nativeElement);

    component.lineId = 'L001';
    component.partNumber = '';
    component.globalParameter = 0;
    component.validatePartDescriptionField();
    expect(component.errorMessage).toBe('Part No and Part Description should not be null');
    expect(document.activeElement).toBe(fixture.debugElement.query(By.css('#partNumber')).nativeElement);

    component.partNumber = 'P001';
    component.partDescription = 'Part Description';
    component.validatePartDescriptionField();
    expect(component.partStatus).toBe('A');
  });

  it('should validate Part Status field', () => {
    component.partStatus = '';
    component.validatePartStatusField();
    expect(component.errorMessage).toBe('PART_STATUS CANNOT BE NULL');
    expect(document.activeElement).toBe(fixture.debugElement.query(By.css('#partStatus')).nativeElement);
  });

  it('should handle Unit ID double click', () => {
    spyOn(component, 'displayLOV');
    component.globalParameter = 0;
    component.handleUnitIDDoubleClick();
    expect(component.displayLOV).toHaveBeenCalledWith('UNIT_LOV');
    expect(document.activeElement).toBe(fixture.debugElement.query(By.css('#groupId')).nativeElement);

    component.globalParameter = 1;
    component.handleUnitIDDoubleClick();
    expect(component.displayLOV).toHaveBeenCalledWith('EDIT_UNIT_LOV');
    expect(document.activeElement).toBe(fixture.debugElement.query(By.css('#groupId')).nativeElement);
  });

  it('should handle Unit ID click', () => {
    component.saveButtonEnabled = true;
    component.unitName = 'Unit Name';
    component.groupId = 'G001';
    component.groupName = 'Group Name';
    component.lineId = 'L001';
    component.lineDescription = 'Line Description';
    component.partId = 'P001';
    component.partNumber = 'Part Number';
    component.partDescription = 'Part Description';
    component.handleUnitIDClick();
    expect(component.saveButtonEnabled).toBeFalse();
    expect(component.unitName).toBe('');
    expect(component.groupId).toBe('');
    expect(component.groupName).toBe('');
    expect(component.lineId).toBe('');
    expect(component.lineDescription).toBe('');
    expect(component.partId).toBe('');
    expect(component.partNumber).toBe('');
    expect(component.partDescription).toBe('');
    expect(document.activeElement).toBe(fixture.debugElement.query(By.css('#unitId')).nativeElement);
  });

  it('should validate Unit ID field', () => {
    component.unitId = '';
    component.validateUnitIDField();
    expect(component.errorMessage).toBe('Unit ID and Unit Name should not be null');
    expect(document.activeElement).toBe(fixture.debugElement.query(By.css('#unitId')).nativeElement);

    component.unitId = 'U001';
    component.unitName = 'Unit Name';
    component.validateUnitIDField();
    expect(document.activeElement).toBe(fixture.debugElement.query(By.css('#groupId')).nativeElement);
  });

  it('should validate Unit ID', () => {
    spyOn(component, 'validateAgainstDatabase');
    component.globalParameter = 0;
    component.validateUnitID();
    expect(component.validateAgainstDatabase).toHaveBeenCalledWith('MES_UNIT_MASTER');

    component.globalParameter = 1;
    component.validateUnitID();
    expect(component.validateAgainstDatabase).toHaveBeenCalledWith('MES_UNIT_MASTER', 'HPM_PART_MASTER');
  });

  it('should handle Save button click', () => {
    spyOn(component, 'savePart');
    component.handleSaveButtonClick();
    expect(component.savePart).toHaveBeenCalled();
  });

  it('should handle Clear button click', () => {
    component.unitId = 'U001';
    component.partStatus = 'B';
    component.handleClearButtonClick();
    expect(component.unitId).toBe('');
    expect(component.partStatus).toBe('A');
  });

  it('should handle Edit button click', () => {
    component.saveButtonEnabled = true;
    component.handleEditButtonClick();
    expect(component.saveButtonEnabled).toBeFalse();
    expect(component.partStatus).toBe('A');
    expect(component.mode).toBe('Edit Mode');
  });

  it('should handle Exit button click', () => {
    spyOn(component, 'displayExitConfirmationDialog');
    component.handleExitButtonClick();
    expect(component.displayExitConfirmationDialog).toHaveBeenCalled();
  });

  it('should display confirmation dialog on Exit button click', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    component.handleExitButtonClick();
    expect(window.confirm).toHaveBeenCalledWith('Do you want to exit?');
  });

  it('should close application on Yes in confirmation dialog', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    spyOn(window, 'close');
    component.handleExitButtonClick();
    expect(window.close).toHaveBeenCalled();
  });

  it('should not close application on No in confirmation dialog', () => {
    spyOn(window, 'confirm').and.returnValue(false);
    spyOn(window, 'close');
    component.handleExitButtonClick();
    expect(window.close).not.toHaveBeenCalled();
  });
});