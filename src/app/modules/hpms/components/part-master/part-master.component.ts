// src/app/modules/hpms/components/part-master/part-master.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HpmsService } from '../../services/hpms.service';
import { MatDialog } from '@angular/material/dialog';
import { ExitConfirmationDialogComponent } from '../exit-confirmation-dialog/exit-confirmation-dialog.component';

@Component({
  selector: 'app-part-master',
  templateUrl: './part-master.component.html',
  styleUrls: ['./part-master.component.css']
})
export class PartMasterComponent implements OnInit {
  partMasterForm: FormGroup;
  globalParameter: number = 0; // This should be set based on your application logic

  constructor(
    private fb: FormBuilder,
    private hpmsService: HpmsService,
    private dialog: MatDialog
  ) {
    this.partMasterForm = this.fb.group({
      sysdate: [{ value: '', disabled: true }],
      screenname: [{ value: '', disabled: true }],
      mode: [{ value: '', disabled: true }],
      unit_id: ['', Validators.required],
      unit_name: [{ value: '', disabled: true }],
      group_id: ['', Validators.required],
      group_name: [{ value: '', disabled: true }],
      line_id: ['', Validators.required],
      line_desc: [{ value: '', disabled: true }],
      part_id: [{ value: '', disabled: true }],
      partno: ['', Validators.required],
      part_desc: ['', Validators.required],
      part_status: ['A', Validators.required]
    });
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.partMasterForm.patchValue({
      sysdate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      screenname: 'TMM022',
      mode: this.globalParameter === 0 ? 'Create Mode' : 'Edit Mode'
    });
    this.partMasterForm.get('unit_id')?.enable();
    this.partMasterForm.get('group_id')?.enable();
    this.partMasterForm.get('partno')?.enable();
    this.partMasterForm.get('part_status')?.enable();
    this.partMasterForm.get('part_desc')?.enable();
    this.partMasterForm.get('line_id')?.enable();
  }

  handlePartDescriptionClick(event: Event): void {
    if (this.partMasterForm.get('part_desc')?.value) {
      this.partMasterForm.get('part_desc')?.reset();
    }
    this.partMasterForm.get('part_desc')?.focus();
  }

  validatePartDescriptionField(): void {
    if (!this.partMasterForm.get('unit_id')?.value || !this.partMasterForm.get('unit_name')?.value) {
      alert('Unit ID and Unit Name should not be null');
      this.partMasterForm.get('unit_id')?.focus();
      return;
    }
    if (!this.partMasterForm.get('group_id')?.value || !this.partMasterForm.get('group_name')?.value) {
      alert('Group ID and Group Name should not be null');
      this.partMasterForm.get('group_id')?.focus();
      return;
    }
    if (!this.partMasterForm.get('line_id')?.value || !this.partMasterForm.get('line_desc')?.value) {
      alert('Line ID and Line Description should not be null');
      this.partMasterForm.get('line_id')?.focus();
      return;
    }
    if (this.globalParameter === 0) {
      if (!this.partMasterForm.get('partno')?.value) {
        alert('Part No and Part Description should not be null');
        this.partMasterForm.get('partno')?.focus();
        return;
      }
    } else {
      if (!this.partMasterForm.get('part_id')?.value) {
        alert('Kindly Choose data from LOV before changing Description');
        this.partMasterForm.get('partno')?.focus();
        return;
      }
      if (!this.partMasterForm.get('partno')?.value || !this.partMasterForm.get('part_desc')?.value) {
        alert('Part No and Part Description should not be null');
        this.partMasterForm.get('partno')?.focus();
        return;
      }
    }
    this.partMasterForm.get('part_status')?.setValue('A');
  }

  onGroupIdDoubleClick(event: Event): void {
    if (this.globalParameter === 0) {
      this.hpmsService.getGroupLOV().subscribe();
    } else {
      this.hpmsService.getEditGroupLOV().subscribe();
    }
    this.partMasterForm.get('line_id')?.focus();
  }

  onGroupIdClick(event: Event): void {
    this.partMasterForm.get('group_id')?.reset();
    this.partMasterForm.get('group_name')?.reset();
    this.partMasterForm.get('line_id')?.reset();
    this.partMasterForm.get('line_desc')?.reset();
    this.partMasterForm.get('part_id')?.reset();
    this.partMasterForm.get('partno')?.reset();
    this.partMasterForm.get('part_desc')?.reset();
    this.partMasterForm.get('group_id')?.focus();
  }

  onNextItemKeyPress(event: Event): void {
    if (!this.partMasterForm.get('unit_id')?.value || !this.partMasterForm.get('unit_name')?.value) {
      alert('Unit ID and Unit Name should not be null');
      this.partMasterForm.get('unit_id')?.focus();
      return;
    }
    if (!this.partMasterForm.get('group_id')?.value || !this.partMasterForm.get('group_name')?.value) {
      alert('Group ID and Group Name should not be null');
      this.partMasterForm.get('group_id')?.focus();
      return;
    }
    this.partMasterForm.get('line_id')?.focus();
  }

  validateGroupId(): void {
    const groupId = this.partMasterForm.get('group_id')?.value;
    const groupName = this.partMasterForm.get('group_name')?.value;
    const unitId = this.partMasterForm.get('unit_id')?.value;

    if (this.globalParameter === 0) {
      this.hpmsService.validateGroupId(groupId, groupName, unitId).subscribe();
    } else {
      this.hpmsService.validateGroupIdInPartMaster(groupId, groupName, unitId).subscribe();
    }
  }

  handleUnitIDDoubleClick(event: Event): void {
    if (this.globalParameter === 0) {
      this.hpmsService.getUnitLOV().subscribe();
    } else {
      this.hpmsService.getEditUnitLOV().subscribe();
    }
    this.partMasterForm.get('group_id')?.focus();
  }

  handleUnitIDClick(event: Event): void {
    this.partMasterForm.get('unit_name')?.reset();
    this.partMasterForm.get('group_id')?.reset();
    this.partMasterForm.get('group_name')?.reset();
    this.partMasterForm.get('line_id')?.reset();
    this.partMasterForm.get('line_desc')?.reset();
    this.partMasterForm.get('part_id')?.reset();
    this.partMasterForm.get('partno')?.reset();
    this.partMasterForm.get('part_desc')?.reset();
    this.partMasterForm.get('unit_id')?.focus();
  }

  validateUnitIDField(): void {
    if (!this.partMasterForm.get('unit_id')?.value || !this.partMasterForm.get('unit_name')?.value) {
      alert('Unit ID and Unit Name should not be null');
      this.partMasterForm.get('unit_id')?.focus();
      return;
    }
    this.partMasterForm.get('group_id')?.focus();
  }

  validateUnitID(): void {
    const unitId = this.partMasterForm.get('unit_id')?.value;
    const unitName = this.partMasterForm.get('unit_name')?.value;

    if (this.globalParameter === 0) {
      this.hpmsService.validateUnitIDInDB(unitId, unitName).subscribe();
    } else {
      this.hpmsService.validateUnitIDInPartMaster(unitId, unitName).subscribe();
    }
  }

  handleLineIDDoubleClick(event: Event): void {
    if (this.globalParameter === 0) {
      this.hpmsService.getLineLOV().subscribe();
    } else {
      this.hpmsService.getEditLineLOV().subscribe();
    }
    this.partMasterForm.get('partno')?.focus();
  }

  handleLineIDClick(event: Event): void {
    this.partMasterForm.get('line_id')?.reset();
    this.partMasterForm.get('line_desc')?.reset();
    this.partMasterForm.get('part_id')?.reset();
    this.partMasterForm.get('partno')?.reset();
    this.partMasterForm.get('part_desc')?.reset();
    this.partMasterForm.get('line_id')?.focus();
  }

  validateLineID(): void {
    if (!this.partMasterForm.get('unit_id')?.value || !this.partMasterForm.get('unit_name')?.value) {
      alert('Unit ID and Unit Name should not be null');
      this.partMasterForm.get('unit_id')?.focus();
      return;
    }
    if (!this.partMasterForm.get('group_id')?.value || !this.partMasterForm.get('group_name')?.value) {
      alert('Group ID and Group Name should not be null');
      this.partMasterForm.get('group_id')?.focus();
      return;
    }
    if (!this.partMasterForm.get('line_id')?.value || !this.partMasterForm.get('line_desc')?.value) {
      alert('Line ID and Line Description should not be null');
      this.partMasterForm.get('line_id')?.focus();
      return;
    }
    this.partMasterForm.get('partno')?.focus();
  }

  handleSave(): void {
    if (this.validateForm()) {
      this.hpmsService.savePart(this.partMasterForm.value).subscribe(
        () => {
          alert('Records saved successfully');
          this.clearForm();
        },
        (error) => {
          alert('Error saving records: ' + error.message);
        }
      );
    }
  }

  handleClear(): void {
    this.clearForm();
  }

  handleEdit(): void {
    this.partMasterForm.reset();
    this.initializeForm();
    this.partMasterForm.get('part_status')?.setValue('A');
    this.partMasterForm.get('mode')?.setValue('Edit Mode');
  }

  handleExit(): void {
    const dialogRef = this.dialog.open(ExitConfirmationDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Close the application or navigate away
      }
    });
  }

  clearForm(): void {
    this.partMasterForm.reset();
    this.initializeForm();
    this.partMasterForm.get('unit_id')?.enable();
    this.partMasterForm.get('part_status')?.setValue('A');
  }

  validateForm(): boolean {
    if (!this.partMasterForm.get('part_id')?.value) {
      alert('Kindly Choose data from LOV before changing Description');
      this.partMasterForm.get('partno')?.focus();
      return false;
    }
    if (!this.partMasterForm.get('unit_name')?.value) {
      alert('Unit ID and Unit Name should not be null');
      this.partMasterForm.get('unit_id')?.focus();
      return false;
    }
    if (!this.partMasterForm.get('group_name')?.value) {
      alert('Group ID and Group Name should not be null');
      this.partMasterForm.get('group_id')?.focus();
      return false;
    }
    if (!this.partMasterForm.get('line_desc')?.value) {
      alert('Line ID and Line Description should not be null');
      this.partMasterForm.get('line_id')?.focus();
      return false;
    }
    if (!this.partMasterForm.get('partno')?.value) {
      alert('Part No and Part Description should not be null');
      this.partMasterForm.get('partno')?.focus();
      return false;
    }
    if (!this.partMasterForm.get('part_desc')?.value) {
      alert('Part No and Part Description should not be null');
      this.partMasterForm.get('part_desc')?.focus();
      return false;
    }
    if (!this.partMasterForm.get('part_status')?.value) {
      alert('Part Status should not be null');
      this.partMasterForm.get('part_status')?.focus();
      return false;
    }
    return true;
  }

  savePart(): void {
    if (this.validateForm()) {
      this.hpmsService.savePart(this.partMasterForm.value).subscribe(
        () => {
          alert('Records saved successfully');
          this.clearForm();
        },
        (error) => {
          alert('Error saving records: ' + error.message);
        }
      );
    }
  }

  updatePart(): void {
    if (this.validateForm()) {
      this.hpmsService.updatePart(this.partMasterForm.value).subscribe(
        () => {
          alert('Records updated successfully');
          this.clearForm();
        },
        (error) => {
          alert('Error updating records: ' + error.message);
        }
      );
    }
  }
}
