import { Component, inject, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { JobService } from '../../core/services/job.service';
import { JobApplication } from '../../core/models/job-application.model';

@Component({
  selector: 'app-job-app-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatPaginatorModule,
    MatCardModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSnackBarModule
  
  ],
  templateUrl: './job-app-list.component.html',
  styleUrls: ['./job-app-list.component.scss']
})
export class JobAppListComponent implements AfterViewInit {
  private jobService = inject(JobService);
  private fb = inject(FormBuilder);

  form!: FormGroup;
  dataSource = new MatTableDataSource<JobApplication>();
  statuses = ['Applied', 'Interview', 'Offer', 'Rejected'];
  displayedColumns = ['companyName', 'position', 'status', 'dateApplied', 'actions'];

  showForm = false;
  private snackBar = inject(MatSnackBar);
  editMode = false;
  editingId: number | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor() {
    this.form = this.fb.group({
      companyName: [{ value: '', disabled: false }, Validators.required],
      position: [{ value: '', disabled: false }, Validators.required],
      status: ['Applied', Validators.required],
      dateApplied: [new Date().toISOString()]
    });

    this.loadApplications();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  toggleForm() {
    this.showForm = !this.showForm;
    this.resetForm(); 
    this.editMode = false; // reset edit mode in case user was editing
    this.editingId = null;
  }

  loadApplications() {
    this.jobService.getAll().subscribe((data) => {
      this.dataSource.data = data;
    });
  }

  onSubmit() {
    const jobData: JobApplication = {
      ...this.form.value,
      id: this.editingId ?? 0
    };
  
    if (this.editMode && this.editingId !== null) {
      this.jobService.updateStatusAndDate(this.editingId, jobData.status, jobData.dateApplied).subscribe({
        next: () => {
          this.snackBar.open('Job updated successfully', 'Close', { duration: 3000 });
          this.loadApplications();
          this.resetForm();
          this.editMode = false;
          this.showForm = false;
        },
        error: () => this.snackBar.open('Update failed.', 'Close', { duration: 3000 })
      });
    } else {
      // POST 
      this.jobService.create(jobData).subscribe({
        next: () => {
          this.snackBar.open('Job added successfully', 'Close', { duration: 3000 });
          this.loadApplications();
          this.resetForm();
          this.showForm = false;
        },
        error: () => this.snackBar.open('Create failed.', 'Close', { duration: 3000 })
      });
    }
  }
  


  onStatusChange(app: JobApplication, newStatus: string) {
    const updatedDate = new Date().toISOString(); // update timestamp when status changes
  
    this.jobService.updateStatusAndDate(app.id, newStatus, updatedDate).subscribe({
      next: () => {
        this.snackBar.open(`Status updated to "${newStatus}"`, 'Close', {
          duration: 2500,
          panelClass: 'snack-info'
        });
        this.loadApplications();
      },
      error: () => {
        this.snackBar.open('Failed to update status.', 'Close', {
          duration: 3000,
          panelClass: 'snack-error'
        });
      }
    });
  }

  resetForm() {
    this.form.reset({
      companyName: '',
      position: '',
      status: 'Applied',
      dateApplied: new Date().toISOString()
    });
    this.editingId = null;


    this.form.get('companyName')?.enable();
    this.form.get('position')?.enable();
  }
 
  onEdit(app: JobApplication) {
    this.form.patchValue({
      companyName: app.companyName,
      position: app.position,
      status: app.status,
      dateApplied: app.dateApplied
    });
  
    this.editingId = app.id;
    this.editMode = true;
    this.showForm = true; 

      this.form.get('companyName')?.disable();
      this.form.get('position')?.disable();
  }
}