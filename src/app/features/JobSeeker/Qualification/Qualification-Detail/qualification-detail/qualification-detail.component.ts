import { Component } from '@angular/core';
import { Qualification } from '../../models/qualification.model';

import { QualificationService } from '../../Services/qualification.service';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

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
  constructor(private qualificationService: QualificationService, private router: Router, private toast: NgToastService) {

  }
  ngOnInit(): void {
    this.qualificationService.getQualification().subscribe({
      next: (response) => {
        this.qualifications = response
      }
    });

  }
  QualificationDelete(id: string) {
    this.qualificationService.deleteQualification(id).subscribe({
      next: (response) => {
this.qualifications=this.qualifications?.filter((qua)=>qua.id!=id);
this.toast.warning({detail:"",summary:'Qualification Deleted',duration:5000});

      }
    });
  }

  onEditInitHandler(id: string) {

    this.qualification = this.qualifications?.find((x) => x.id == id) || {} as Qualification;
  }
  UpdateQualification() {
    if(this.qualification.qualificationName == '' || this.qualification.university == '' || this.qualification.yearOfCompletion == '' || this.qualification.gradeOrScore == ''){
      this.error = 'Enter All the details'
  }
    this.qualificationService.updateQualification(this.qualification).subscribe({
    next: () => {
      },
      complete:()=>{
        this.toast.info({detail:"",summary:'Qualification Updated'});
      }
    });


  }
}
