import { AfterContentChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { EmployerService } from '../../../Services/employer.service';
import { ActivatedRoute, Route } from '@angular/router';

import { ApplicationResponse } from 'src/app/features/Home/home/models/application-response.model';

import { TableLazyLoadEvent } from 'primeng/table';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.css']
})

export class ApplicationsComponent implements  AfterContentChecked {
  vacancyId: string | null = null;
  jobapplications!: ApplicationResponse[];
  totalRecords!: number;
  constructor(private employerService: EmployerService, private router: ActivatedRoute, private changeDetector: ChangeDetectorRef) { }
  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  }

  loadCustomers(event: TableLazyLoadEvent) {
    this.router.paramMap.subscribe({
      next: (response) => {
        this.vacancyId = response.get('id');
      }
    });
    if(this.vacancyId && event.first != undefined && event.rows){
      this.employerService.paginationEndpoint({vacancyId: this.vacancyId, pageNumber: (event.first / event.rows) +1, pageSize: event.rows}).subscribe({
        next: (response) => {
          this.totalRecords = response.result.totalRecords;
          this.jobapplications=response.result.results;
  } 
});
      }
}
}
  
