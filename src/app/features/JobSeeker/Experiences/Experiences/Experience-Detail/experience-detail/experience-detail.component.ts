import { Component } from '@angular/core';
import { Experience } from '../../../models/experiences.model';
import { ExperienceService } from '../../../Services/experience.service';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-experience-detail',
  templateUrl: './experience-detail.component.html',
  styleUrls: ['./experience-detail.component.css']
})
export class ExperienceDetailComponent {
  experience: Experience = {} as Experience;
  error: string = '';

  experiences?: Experience[]
  constructor(private experienceService: ExperienceService, private router: Router, private toast: NgToastService) {

  }

  
  ngOnInit(): void {
    this.experienceService.getExperience().subscribe({
      next: (response) => {
        this.experiences = response
        console.log(response);
      }
    });

  }
  ExperienceDelete(id: string) {
    this.experienceService.deleteExperience(id).subscribe({
      next: (response) => {
this.experiences=this.experiences?.filter((qua)=>qua.id!=id);
this.toast.warning({detail:"",summary:'Experience Deleted'});
      }
    });
  }

  onEditInitHandler(id: string) {

    this.experience = this.experiences?.find((x) => x.id == id) || {} as Experience;

  }
  UpdateExperience() {
    if(this.experience.companyName == '' || this.experience.startYear == new Date() || this.experience.endYear == new Date() ||
    this.experience.designation == '' || this.experience.companyUrl == '' || this.experience.jobDescription == ''){
      this.error = 'Enter All the details'
  }
    this.experienceService.updateExperience(this.experience).subscribe({

      next: (response) => {
        console.log(response);
      },
      complete:()=>{
        this.toast.info({detail:"",summary:'Experience Updated'});

      }
    });


  }
}
