import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiagnosticsRoutingModule } from './diagnostics-routing.module';
import { SharedModule } from '../shared/shared.module';
import { DiagnosticListComponent } from './diagnostic-list/diagnostic-list.component';

@NgModule({
  imports: [
    CommonModule,
    DiagnosticsRoutingModule,
    SharedModule
  ],
  declarations: [
    DiagnosticListComponent
  ],
  entryComponents: [
  ]
})
export class DiagnosticsModule { }
