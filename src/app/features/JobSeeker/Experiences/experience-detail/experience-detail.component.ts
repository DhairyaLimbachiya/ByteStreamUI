import { Component } from '@angular/core';
import { Experience } from '../models/experiences.model';
import { ExperienceService } from '../Services/experience.service';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-experience-detail',
  templateUrl: './experience-detail.component.html',
  styleUrls: ['./experience-detail.component.css']
})
export class ExperienceDetailComponent {
  experience: Experience = {} as Experience;


  experiences?: Experience[]
  constructor(private experienceService: ExperienceService, private router: Router, private toast: NgToastService,private fb: FormBuilder) {

  }
  editExperienceForm = this.fb.group({
    designation: ['', Validators.required],
    companyName: ['', Validators.required],
    companyUrl: ['', Validators.required],
    jobDescription: ['', Validators.required],
  });
  
  ngOnInit(): void {
    this.experienceService.getExperience().subscribe({
      next: (response) => {
        this.experiences = response
      },
   
      
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
    this.editExperienceForm.setValue({
      designation: this.experience.designation,
      companyName: this.experience.companyName,
      companyUrl: this.experience.companyUrl,
      jobDescription: this.experience.jobDescription
    });
  }
  UpdateExperience() {
    this.experience = {
      id: this.experience.id,
      companyName: this.editExperienceForm.get('companyName')?.value || this.experience.companyName,
      startYear: this.experience.startYear,
      endYear: this.experience.endYear,
      designation: this.editExperienceForm.get('designation')?.value || this.experience.designation,
      companyUrl: this.editExperienceForm.get('companyUrl')?.value || this.experience.companyUrl,
      jobDescription: this.editExperienceForm.get('jobDescription')?.value || this.experience.jobDescription,
    }
    this.experienceService.updateExperience(this.experience).subscribe({

      next: (response) => {
        this.experiences = this.experiences?.filter((x) => x.id !== this.experience.id) || [];
        this.experiences?.push(this.experience);
      },
      complete:()=>{
        this.toast.success({detail:"Success",summary:'Experience Updated'});
       
      }
    });


  }
}
