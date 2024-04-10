import { Component } from '@angular/core';
import { Qualification } from '../../models/qualification.model';

import { QualificationService } from '../../Services/qualification.service';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-qualification-detail',
  templateUrl: './qualification-detail.component.html',
  styleUrls: ['./qualification-detail.component.css']
})
export class QualificationDetailComponent {

  qualification: Qualification = {} as Qualification;
  updatedqualification: Qualification = {} as Qualification;
  error: string = '';
  qualifications?: Qualification[]
  constructor(private qualificationService: QualificationService, private router: Router,private fb: FormBuilder, private toast: NgToastService) {

  }
  editQualificationForm = this.fb.group({
    qualificationName: ['', Validators.required],
    yearsOfCompletion: new FormControl(new Date().getFullYear(), [Validators.min(1900), Validators.max(2024)]),
    gradeOrScore: ['', Validators.required],
    university: ['', Validators.required],
  })
  ngOnInit(): void {
    this.qualificationService.getQualification().subscribe({
      next: (response) => {
        this.qualifications = response
       console.log(response)
      }
    });

  }
  QualificationDelete(id: string) {
    this.qualificationService.deleteQualification(id).subscribe({
      next: (response) => {
        window.location.reload();

this.toast.warning({detail:"",summary:'Qualification Deleted',duration:5000});

      }
    });
  }

  onEditInitHandler(id: string) {

    this.qualification = this.qualifications?.find((x) => x.id == id) || {} as Qualification;
    this.editQualificationForm.setValue({
      qualificationName: this.qualification.qualificationName,
      yearsOfCompletion: this.qualification.yearOfCompletion,
      gradeOrScore: this.qualification.gradeOrScore,
      university: this.qualification.university,
    });
  }
  UpdateQualification() {
    this.qualification = {
      id: this.qualification.id,
      qualificationName: this.editQualificationForm.get('qualificationName')?.value || this.qualification.qualificationName,
      yearOfCompletion: this.editQualificationForm.get('yearsOfCompletion')?.value || this.qualification.yearOfCompletion,
      gradeOrScore: this.editQualificationForm.get('gradeOrScore')?.value || this.qualification.gradeOrScore,
      university: this.editQualificationForm.get('university')?.value || this.qualification.university,
    }
    this.qualificationService.updateQualification(this.qualification).subscribe({
    next: () => {
      this.qualifications = this.qualifications?.filter((x) => x.id !== this.qualification.id) || [];
      this.qualifications?.push(this.qualification);
      },
      complete:()=>{
        this.toast.success({detail:"Success",summary:'Qualification Updated'});
      }
    });


  }
}
