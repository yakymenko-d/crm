import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  MaterialInstance,
  MaterialService,
} from '../../../modules/shared/classes/material.service';

import { Position } from '../../../modules/shared/interfaces';
import { PositionsService } from '../../../modules/shared/services/positions.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-positions-form',
  templateUrl: './positions-form.component.html',
  styleUrls: [
    './positions-form.component.scss',
    '../../../../app/app.component.scss',
  ],
})
export class PositionsFormComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  @Input('categoryId') categoryId: string;
  @ViewChild('modal') modalRef: ElementRef;

  positions: Position[] = [];
  loading = false;
  positionId = null;
  modal: MaterialInstance;
  form: FormGroup;

  constructor(
    private positionsService: PositionsService,
    private translateService: TranslateService,
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      cost: new FormControl(1, [Validators.required, Validators.min(1)]),
    });

    this.loading = true;
    this.positionsService.fetch(this.categoryId).subscribe((positions) => {
      this.positions = positions;
      this.loading = false;
    });
  }

  ngOnDestroy() {
    this.modal.destroy();
  }

  ngAfterViewInit() {
    this.modal = MaterialService.initModal(this.modalRef);
  }

  onSelectPosition(position: Position) {
    this.positionId = position._id;
    this.form.patchValue({
      name: position.name,
      cost: position.cost,
    });
    this.modal.open();
    MaterialService.updateTextInputs();
  }

  onAddPosition() {
    this.positionId = null;
    this.form.reset({ name: null, cost: 1 });
    this.modal.open();
    MaterialService.updateTextInputs();
  }

  onDeletePosition(event: Event, position: Position) {
    event.stopPropagation();
    const decision = window.confirm(
      `${this.translateService.instant('CATEGORIES.delete-position')} "${position.name}"?`,
    );

    if (decision) {
      this.positionsService.delete(position).subscribe(
        (response) => {
          const idx = this.positions.findIndex((p) => p._id === position._id);
          this.positions.splice(idx, 1);
          MaterialService.toast(response.message);
        },
        (error) => MaterialService.toast(error.error.message),
      );
    }
  }

  onCancel() {
    this.modal.close();
  }

  onSubmit() {
    this.form.disable();

    const newPosition: Position = {
      name: this.form.value.name,
      cost: this.form.value.cost,
      category: this.categoryId,
    };

    const completed = () => {
      this.modal.close();
      this.form.reset({ name: '', cost: 1 });
      this.form.enable();
    };

    if (this.positionId) {
      newPosition._id = this.positionId;
      this.positionsService.update(newPosition).subscribe(
        (position) => {
          const idx = this.positions.findIndex((p) => p._id === position._id);
          this.positions[idx] = position;
          MaterialService.toast(
            this.translateService.instant('CATEGORIES.changes-saved'),
          );
        },
        (error) => MaterialService.toast(error.error.message),
        completed,
      );
    } else {
      this.positionsService.create(newPosition).subscribe(
        (position) => {
          MaterialService.toast(
            this.translateService.instant('CATEGORIES.position-created'),
          );
          this.positions.push(position);
        },
        (error) => MaterialService.toast(error.error.message),
        completed,
      );
    }
  }
}
