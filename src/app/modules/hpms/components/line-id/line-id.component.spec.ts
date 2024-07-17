import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LineIDComponent } from './line-id.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('LineIDComponent', () => {
  let component: LineIDComponent;
  let fixture: ComponentFixture<LineIDComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LineIDComponent],
      imports: [HttpClientTestingModule, FormsModule],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LineIDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle double-click correctly based on global parameter', () => {
    spyOn(component, 'showLOV');
    component.globalParameter = 0;
    component.handleDoubleClick();
    expect(component.showLOV).toHaveBeenCalledWith(false);

    component.globalParameter = 1;
    component.handleDoubleClick();
    expect(component.showLOV).toHaveBeenCalledWith(true);
  });

  it('should handle click correctly', () => {
    component.saveButtonEnabled = true;
    component.lineID = '123';
    component.lineDesc = 'Test Line';
    component.partID = '456';
    component.partNo = '789';
    component.partDesc = 'Test Part';

    component.handleClick();

    expect(component.saveButtonEnabled).toBeFalse();
    expect(component.lineID).toBe('');
    expect(component.lineDesc).toBe('');
    expect(component.partID).toBe('');
    expect(component.partNo).toBe('');
    expect(component.partDesc).toBe('');
  });

  it('should validate Line ID correctly', () => {
    spyOn(component, 'showErrorMessage');
    component.unitID = '';
    component.unitName = 'Unit Name';
    component.groupID = 'Group ID';
    component.groupName = 'Group Name';
    component.lineID = 'Line ID';
    component.lineDesc = 'Line Desc';

    component.validateLineID();
    expect(component.showErrorMessage).toHaveBeenCalledWith('Unit ID is required');
    expect(component.focusField).toBe('unitID');

    component.unitID = 'Unit ID';
    component.unitName = '';
    component.validateLineID();
    expect(component.showErrorMessage).toHaveBeenCalledWith('Unit Name is required');
    expect(component.focusField).toBe('unitName');

    component.unitName = 'Unit Name';
    component.groupID = '';
    component.validateLineID();
    expect(component.showErrorMessage).toHaveBeenCalledWith('Group ID is required');
    expect(component.focusField).toBe('groupID');

    component.groupID = 'Group ID';
    component.groupName = '';
    component.validateLineID();
    expect(component.showErrorMessage).toHaveBeenCalledWith('Group Name is required');
    expect(component.focusField).toBe('groupName');

    component.groupName = 'Group Name';
    component.lineID = '';
    component.validateLineID();
    expect(component.showErrorMessage).toHaveBeenCalledWith('Line ID is required');
    expect(component.focusField).toBe('lineID');

    component.lineID = 'Line ID';
    component.lineDesc = '';
    component.validateLineID();
    expect(component.showErrorMessage).toHaveBeenCalledWith('Line Description is required');
    expect(component.focusField).toBe('lineDesc');

    component.lineDesc = 'Line Desc';
    component.validateLineID();
    expect(component.showErrorMessage).not.toHaveBeenCalled();
  });
});