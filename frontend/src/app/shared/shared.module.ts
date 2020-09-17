import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatGridListModule,
  MatCardModule,
  MatMenuModule,
  MatInputModule,
  MatSelectModule,
  MatRadioModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatIconRegistry,
  MatTooltipModule,
  MatExpansionModule,
  MatSnackBarModule,
  MatProgressSpinnerModule,
  MatCheckboxModule,
  MatDialogModule
} from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ComponentPageHeaderComponent } from './components/component-page-header/component-page-header.component';
import { RouterModule } from '@angular/router';
import { ConfirmDialogComponent } from './components/dialogs/confirm-dialog/confirm-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatTooltipModule,
    MatExpansionModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatDialogModule,
    RouterModule
  ],
  declarations: [ComponentPageHeaderComponent, ConfirmDialogComponent],
  exports: [CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatTooltipModule,
    MatExpansionModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatDialogModule,
    ComponentPageHeaderComponent
  ],
  entryComponents: [ConfirmDialogComponent]
})
export class SharedModule {
  constructor(matIconRegistry: MatIconRegistry, domSanitizer: DomSanitizer) {
    matIconRegistry.addSvgIcon('menu-open', domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/menu-open.svg'));
  }
}
