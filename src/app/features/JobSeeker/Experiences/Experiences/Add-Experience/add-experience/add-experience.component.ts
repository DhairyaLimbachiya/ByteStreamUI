import { Component } from '@angular/core';
import { Experience } from '../../../models/experiences.model';
import { ExperienceService } from '../../../Services/experience.service';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { FormBuilder, Validators } from '@angular/forms';
import { AddExperience } from '../../../models/add-experience.model';

@Component({
  selector: 'app-add-experience',
  templateUrl: './add-experience.component.html',
  styleUrls: ['./add-experience.component.css']
})
export class AddExperienceComponent {
 model:AddExperience;
  constructor( private experienceService :ExperienceService ,private router :Router, private toast: NgToastService,private fb: FormBuilder) { 
    this.model = {
      companyName: '',
      startYear: new Date(),
      endYear: new Date(),
      designation: '',
      companyUrl: '',
      jobDescription: '',
    }
  }

  
  addExperienceForm = this.fb.group({
    designation: ['', Validators.required],
    companyName: ['', Validators.required],
    companyUrl: ['', Validators.required],
    jobDescription: ['', Validators.required],
  });

  onFormSubmit():void{
    this.model = {

      companyName: this.addExperienceForm.get('companyName')?.value || '',
   startYear: this.model.startYear,
   endYear: this.model.endYear,
      designation: this.addExperienceForm.get('designation')?.value || '',
      companyUrl: this.addExperienceForm.get('companyUrl')?.value || '',
      jobDescription: this.addExperienceForm.get('jobDescription')?.value || '',
    }

    this.experienceService.addExperience(this.model)
  .subscribe({
    next:(response)=>{
      this.router.navigateByUrl('experience');
      this.toast.success({detail:"",summary:'Experience Added Succesfully', position: 'topRight'}); 

    }
  });
  }
  }
  