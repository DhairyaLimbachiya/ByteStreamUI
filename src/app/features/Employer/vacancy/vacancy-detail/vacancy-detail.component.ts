import { Component, OnInit, mergeApplicationConfig } from '@angular/core';
import { Observable } from 'rxjs';
import { Vacancy } from '../models/vacancy.model';
import { VacancyService } from '../services/vacancy.service';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-vacancy-detail',
  templateUrl: './vacancy-detail.component.html',
  styleUrls: ['./vacancy-detail.component.css']
})

export class VacancyDetailComponent implements OnInit {
  vacancy: Vacancy = {} as Vacancy;


  vacancies?: Vacancy[];
  constructor(private vacancyService: VacancyService, private router: Router, private toast: NgToastService) {

  }
  ngOnInit(): void {
    this.vacancyService.getAllCompanyVacancy().subscribe({
      next: (response) => {
        this.vacancies = response
      }
    });

  }
  VacancyDelete(id: string) {
    this.vacancyService.deletevacancy(id).subscribe({
      next: (response) => {
        this.vacancies = this.vacancies?.filter((vac) => vac.id != id);
        this.toast.warning({ detail: "", summary: 'Vacancy Deleted Succesfully', position: 'topRight' });
      }
    });
  }


  onEditInitHandler(id: string) {

    this.vacancyService.getvacancyById(id).subscribe({
      next: (data) => {
        this.vacancy = this.vacancies?.find((x) => x.id == id) || {} as Vacancy;
      }
    });
  }
  UpdateVacancy() {
    this.vacancyService.updateVacancy(this.vacancy).subscribe({

      next: (response) => {
        console.log(response);
        this.router.navigateByUrl('vacancy');
      },
      complete: () => {
        this.toast.success({ detail: "", summary: 'Vacancy Edited Succesfully', position: 'topRight' });

      }
    });


  }
}
