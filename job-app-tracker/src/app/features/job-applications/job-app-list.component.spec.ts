import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobAppListComponent } from './job-app-list.component';

describe('JobAppListComponent', () => {
  let component: JobAppListComponent;
  let fixture: ComponentFixture<JobAppListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobAppListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobAppListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
