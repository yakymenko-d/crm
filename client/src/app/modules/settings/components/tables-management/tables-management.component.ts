import * as QRCode from 'qrcode';

import { Component, ElementRef, Inject, Input, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Observable, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { ToastService } from '@shared/services/toast.service';
import { QrCode, User } from '@shared/interfaces';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { selectMe } from '@store/selectors/users.selector';
import { DOCUMENT } from '@angular/common';
import { selectQrCodes } from '@store/selectors/settings.selector';
import { addNewQrCodes, deleteQrCode, getQrCodes } from '@store/actions/settings.action';
import { MaterialService } from '@shared/classes/material.service';

@Component({
  selector: 'tables-management',
  templateUrl: './tables-management.component.html',
  styleUrls: ['./tables-management.component.scss', '../../../../../app/app.component.scss'],
})
export class TablesManagementComponent {
  @Input() url: string;
  @ViewChild('input') inputRef: ElementRef;

  user$: Observable<User> = this.store.select(selectMe);
  qrCodes$: Observable<QrCode[]> = this.store.select(selectQrCodes)
    .pipe(
      tap(qrCodes => this.qrCodesQuantity = qrCodes.length)
    );

  form: FormGroup;
  hasChanges = false;
  qrCodes: QrCode[] = [];
  newCodes: QrCode[] = [];
  qrCodesQuantity: number = 0;
  private initialFormValues: any;

  constructor(
    private store: Store,
    private readonly toastService: ToastService,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit(): void {
    this.store.dispatch(getQrCodes());

    this.form = new FormGroup({
      tableCount: new FormControl(null, Validators.required),
    });

    this.initialFormValues = this.form.getRawValue();
    this.form.disable();

    this.qrCodes$
      .subscribe(
        (qrCodes: QrCode[]) => {
          this.qrCodes = qrCodes;
          this.form.patchValue({
            tableCount: qrCodes.length,
          });

          MaterialService.updateTextInputs();
          this.initialFormValues = this.form.getRawValue();

          this.form.enable();
        },
        (error) => MaterialService.toast(error.error.message),
      );

      this.form.valueChanges.subscribe((res) => {
        this.hasChanges = JSON.stringify(this.form.getRawValue()) !== JSON.stringify(this.initialFormValues);        
      });
  }

  generateQRCodes(): void {
    const count = this.form.get('tableCount')?.value;
    this.createCode(count, this.qrCodesQuantity);
    this.store.dispatch(addNewQrCodes({ qrCodes: this.newCodes }));
    this.hasChanges = false;
  }

  createCode(desireCount: number, currentCount: number): void {
    console.log(desireCount, currentCount);
    
    if(desireCount > currentCount) {
      for (let i = currentCount; i < desireCount; i++) {
        const url = `${this.url}&table=${i + 1}`;
        
        QRCode.toDataURL(url, (err, qr) => {
          if (err) console.error(err);
          
          this.newCodes.push({url, qr, title: `table ${i + 1}`, order: i + 1});
          console.log(this.newCodes);
        });
      }

    } else if (desireCount < currentCount) {
      this.newCodes.length = this.newCodes.length - (currentCount - desireCount);
    } else {
      return;
    }
  }

  downloadPDF(): void {
    this.qrCodes.forEach((dataURL, index) => {
      this.createDownloadFile(index);
    });   
  }

  createDownloadFile(index: number): void {
    const container = this.document.getElementById(`qr-code-${index + 1}`) as HTMLElement;
    
    html2canvas(container).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      
      pdf.addImage(imgData, 'PNG', 0, 0, 0, 0);
      pdf.save(`table-${index + 1}.pdf`);
    });
  }

  deleteQr(qrCode: QrCode): void {
    this.store.dispatch(deleteQrCode({ qrCode }));
  }
}
