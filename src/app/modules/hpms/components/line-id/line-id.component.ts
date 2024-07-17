import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HpmsService } from '../../services/hpms.service';
import { NGXLogger } from 'ngx-logger';

@Component({
  selector: 'app-line-id',
  templateUrl: './line-id.component.html',
  styleUrls: ['./line-id.component.css']
})
export class LineIDComponent implements OnInit {
  lineIDForm: FormGroup;
  globalParameter: number = 0; // This should be set based on your application logic

  constructor(
    private fb: FormBuilder,
    private hpmsService: HpmsService,
    private logger: NGXLogger
  ) {
    this.lineIDForm = this.fb.group({
      unitID: ['', Validators.required],
      unitName: ['', Validators.required],
      groupID: ['', Validators.required],
      groupName: ['', Validators.required],
      lineID: ['', Validators.required],
      lineDesc: ['', Validators.required],
      partID: [''],
      partNo: [''],
      partDesc: [''],
      partStatus: ['']
    });
  }

  ngOnInit(): void {}

  handleDoubleClick(event: Event): void {
    if (this.globalParameter === 0) {
      this.hpmsService.getLineIDLOV(this.lineIDForm.value.unitID, this.lineIDForm.value.groupID).subscribe(
        (data) => {
          // Display LOV and handle selection
          this.logger.info('LOV data fetched successfully', data);
          // Assuming LOV selection logic here
          this.lineIDForm.patchValue({ lineID: data.selectedLineID, lineDesc: data.selectedLineDesc });
          this.moveToPartNumberField();
        },
        (error) => {
          this.logger.error('Error fetching LOV data', error);
        }
      );
    } else if (this.globalParameter === 1) {
      this.hpmsService.getEditableLineIDLOV(this.lineIDForm.value.unitID, this.lineIDForm.value.groupID).subscribe(
        (data) => {
          // Display editable LOV and handle selection
          this.logger.info('Editable LOV data fetched successfully', data);
          // Assuming LOV selection logic here
          this.lineIDForm.patchValue({ lineID: data.selectedLineID, lineDesc: data.selectedLineDesc });
          this.moveToPartNumberField();
        },
        (error) => {
          this.logger.error('Error fetching editable LOV data', error);
        }
      );
    }
  }

  handleClick(event: Event): void {
    this.disableSaveButton();
    this.clearRelatedFields();
    this.moveToLineIDField();
  }

  validateLineID(): void {
    if (this.areRequiredFieldsEmpty()) {
      this.displayErrorMessage('Required fields are empty');
      this.moveToFirstEmptyField();
      return;
    }

    if (this.globalParameter === 0) {
      this.hpmsService.validateLineID(this.lineIDForm.value).subscribe(
        (isValid) => {
          if (!isValid) {
            this.displayErrorMessage('Line ID and Line Description do not exist in HPM_LINE_MASTER');
          }
        },
        (error) => {
          this.logger.error('Error validating Line ID', error);
        }
      );
    } else if (this.globalParameter === 1) {
      this.hpmsService.validateLineIDWithPart(this.lineIDForm.value).subscribe(
        (isValid) => {
          if (!isValid) {
            this.displayErrorMessage('Line ID and Line Description do not exist in HPM_LINE_MASTER and HPM_PART_MASTER');
          }
        },
        (error) => {
          this.logger.error('Error validating Line ID with Part', error);
        }
      );
    }
  }

  private disableSaveButton(): void {
    // Logic to disable the Save button
  }

  private clearRelatedFields(): void {
    this.lineIDForm.patchValue({
      lineID: '',
      lineDesc: '',
      partID: '',
      partNo: '',
      partDesc: ''
    });
  }

  private moveToLineIDField(): void {
    // Logic to move focus to Line ID field
  }

  private moveToPartNumberField(): void {
    // Logic to move focus to Part Number field
  }

  private areRequiredFieldsEmpty(): boolean {
    return !this.lineIDForm.value.unitID || !this.lineIDForm.value.unitName ||
           !this.lineIDForm.value.groupID || !this.lineIDForm.value.groupName ||
           !this.lineIDForm.value.lineID || !this.lineIDForm.value.lineDesc;
  }

  private displayErrorMessage(message: string): void {
    // Logic to display error message
  }

  private moveToFirstEmptyField(): void {
    if (!this.lineIDForm.value.unitID || !this.lineIDForm.value.unitName) {
      this.moveToUnitIDField();
    } else if (!this.lineIDForm.value.groupID || !this.lineIDForm.value.groupName) {
      this.moveToGroupIDField();
    } else if (!this.lineIDForm.value.lineID || !this.lineIDForm.value.lineDesc) {
      this.moveToLineIDField();
    }
  }

  private moveToUnitIDField(): void {
    // Logic to move focus to Unit ID field
  }

  private moveToGroupIDField(): void {
    // Logic to move focus to Group ID field
  }
}
