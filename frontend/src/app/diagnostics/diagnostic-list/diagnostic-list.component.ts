import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NGXLogger } from 'ngx-logger';
import { Title } from '@angular/platform-browser';
import { NotificationService } from '../../core/services/notification.service';
import { DiagnosticsDataService } from '../../core/services/diagnostics-data.service';
import * as _ from 'lodash';
import { NgForm } from '@angular/forms';
import { Diagnostic } from '../../core/models/diagnostic';

@Component({
  selector: 'app-diagnostic-list',
  templateUrl: './diagnostic-list.component.html',
  styleUrls: ['./diagnostic-list.component.css']
})
export class DiagnosticListComponent implements OnInit {
  @ViewChild('studentForm', { static: false })
  studentForm: NgForm;

  diagnosticData: Diagnostic;

  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['id', 'title', 'description', 'category'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true}) sort: MatSort;


  isEditMode = false;

  constructor(private diagnosticDataService: DiagnosticsDataService,
    private notificationService: NotificationService,
    private titleService: Title,
    private logger: NGXLogger) {

    this.diagnosticData = {} as Diagnostic;
  }

  ngOnInit(): void {

    this.titleService.setTitle('Connected Workshop - Diagnostics');
    this.logger.log('Dashboard loaded');

    setTimeout(() => {
      this.notificationService.openSnackBar('Diagnostics!');
    });

    // Initializing Datatable pagination
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    // Fetch All Diagnostics on Page load
    this.getAllItems()
  }

  getAllItems() {
    this.diagnosticDataService.getList().subscribe((response: any) => {
      this.dataSource.data = response.items;
    });
  }

  editItem(element) {
    this.diagnosticData = _.cloneDeep(element);
    this.isEditMode = true;
  }

  cancelEdit() {
    this.isEditMode = false;
    this.studentForm.resetForm();
  }

  deleteItem(id) {
    this.diagnosticDataService.deleteItem(id).subscribe((response: any) => {

      // Approach #1 to update datatable data on local itself without fetching new data from server
      this.dataSource.data = this.dataSource.data.filter((o: Diagnostic) => {
        return o.id !== id ? o : false;
      })

      console.log(this.dataSource.data);

      // Approach #2 to re-call getAllItems() to fetch updated data
      // this.getAllItems()
    });
  }

  addItem() {
    this.diagnosticDataService.createItem(this.diagnosticData).subscribe((response: any) => {
      this.dataSource.data.push({ ...response })
      this.dataSource.data = this.dataSource.data.map(o => {
        return o;
      })
    });
  }

  updateDiagnostic() {
    this.diagnosticDataService.updateItem(this.diagnosticData.id, this.diagnosticData).subscribe((response: any) => {

      // Approach #1 to update datatable data on local itself without fetching new data from server
      this.dataSource.data = this.dataSource.data.map((o: Diagnostic) => {
        if (o.id === response.id) {
          o = response;
        }
        return o;
      })

      // Approach #2 to re-call getAllItems() to fetch updated data
      // this.getAllItems()

      this.cancelEdit()

    });
  }


  onSubmit() {
    if (this.studentForm.form.valid) {
      if (this.isEditMode)
        this.updateDiagnostic()
      else
        this.addItem();
    } else {
      console.log('Enter valid data!');
    }
  }
}
