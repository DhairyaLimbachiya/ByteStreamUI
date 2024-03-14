import { Component } from '@angular/core';
import { Qualification } from '../../models/qualification.model';
import { Router } from '@angular/router';
import { QualificationService } from '../../Services/qualification.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { AddQualification } from '../../models/add-qualification.model';
@Component({
  selector: 'app-add-qualification',
  templateUrl: './add-qualification.component.html',
  styleUrls: ['./add-qualification.component.css']
})
export class AddQualificationComponent {
  addqualification : AddQualification;
  constructor( private qualificationService :QualificationService ,private router :Router,private fb:FormBuilder, private toast: NgToastService) { 
    this.addqualification = {
      qualificationName: '',
      university: '',
      yearOfCompletion: 0,
      gradeOrScore: ''
    }
  }

  addQualificationForm = this.fb.group({
    qualificationName: ['', Validators.required],
    yearOfCompletion: new FormControl(2024, [ Validators.min(1900), Validators.max(2024)]),
    gradeOrScore: ['', Validators.required],
    university: ['', Validators.required],
  })
  onFormSubmit():void{
    this.addqualification = {
      qualificationName: this.addQualificationForm.get('qualificationName')?.value || '',
      yearOfCompletion: this.addQualificationForm.get('yearsOfCompletion')?.value ||0,
      gradeOrScore: this.addQualificationForm.get('gradeOrScore')?.value || '',
      university: this.addQualificationForm.get('university')?.value || '',
    }
    
    this.qualificationService.addQualification(this.addqualification)
  .subscribe({
    next:(response)=>{
      this.toast.success({detail:"",summary:'Qualification Added Succesfully', position: 'topRight'}); 
    this.router.navigateByUrl('qualification');
    }
  });
  }
  

  }
  