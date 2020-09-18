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
import { Student } from '../../core/models/student';

@Component({
  selector: 'app-diagnostic-list',
  templateUrl: './diagnostic-list.component.html',
  styleUrls: ['./diagnostic-list.component.css']
})
export class DiagnosticListComponent implements OnInit {
  @ViewChild('studentForm', { static: false })
  studentForm: NgForm;

  studentData: Student;

  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['id', 'name', 'age', 'address'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true}) sort: MatSort;


  isEditMode = false;

  constructor(private diagnosticsDataService: DiagnosticsDataService) {
    this.studentData = {} as Student;
  }

  ngOnInit(): void {

    // Initializing Datatable pagination
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    // Fetch All Students on Page load
    this.getAllStudents()
  }

  getAllStudents() {
    this.diagnosticsDataService.getList().subscribe((response: any) => {
      this.dataSource.data = response;
    });
  }

  editItem(element) {
    this.studentData = _.cloneDeep(element);
    this.isEditMode = true;
  }

  cancelEdit() {
    this.isEditMode = false;
    this.studentForm.resetForm();
  }

  deleteItem(id) {
    this.diagnosticsDataService.deleteItem(id).subscribe((response: any) => {

      // Approach #1 to update datatable data on local itself without fetching new data from server
      this.dataSource.data = this.dataSource.data.filter((o: Student) => {
        return o.id !== id ? o : false;
      })

      console.log(this.dataSource.data);

      // Approach #2 to re-call getAllStudents() to fetch updated data
      // this.getAllStudents()
    });
  }

  addStudent() {
    this.diagnosticsDataService.createItem(this.studentData).subscribe((response: any) => {
      this.dataSource.data.push({ ...response })
      this.dataSource.data = this.dataSource.data.map(o => {
        return o;
      })
    });
  }

  updateStudent() {
    this.diagnosticsDataService.updateItem(this.studentData.id, this.studentData).subscribe((response: any) => {

      // Approach #1 to update datatable data on local itself without fetching new data from server
      this.dataSource.data = this.dataSource.data.map((o: Student) => {
        if (o.id === response.id) {
          o = response;
        }
        return o;
      })

      // Approach #2 to re-call getAllStudents() to fetch updated data
      // this.getAllStudents()

      this.cancelEdit()

    });
  }


  onSubmit() {
    if (this.studentForm.form.valid) {
      if (this.isEditMode)
        this.updateStudent()
      else
        this.addStudent();
    } else {
      console.log('Enter valid data!');
    }
  }
}
