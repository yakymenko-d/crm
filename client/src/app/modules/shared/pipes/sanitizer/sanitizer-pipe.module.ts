import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SafeHtmlPipe } from './sanitizer.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [SafeHtmlPipe],
  exports: [SafeHtmlPipe],
  // providers: [
  //     SafeHtmlPipe,
  // ]
})
export class SanitizerPipeModule {}
