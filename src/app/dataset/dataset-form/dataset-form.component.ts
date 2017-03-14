import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Dataset } from '../dataset';
import { DatasetService } from '../dataset.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dataset-form',
  templateUrl: './dataset-form.component.html',
  styleUrls: ['./dataset-form.component.css']
})
export class DatasetFormComponent implements OnInit {
  public dataset: Dataset;
  public datasetForm: FormGroup;
  public titleCtrl: AbstractControl;
  public errorMessage: string;

  constructor(private fb: FormBuilder,
              private router: Router,
              private datasetService: DatasetService) {
    this.datasetForm = fb.group({
      'title': ['Dataset title', Validators.required],
      'description': ['Dataset description']
    });
    this.titleCtrl = this.datasetForm.controls['title'];
    this.dataset = new Dataset();
  }

  ngOnInit() {}

  onSubmit(): void {
    this.datasetService.addDataset(this.dataset)
      .subscribe(
        dataset => { this.router.navigate(['datasets/' + dataset._links.self.href.split('/').pop()]); },
        error => {
          this.errorMessage = error.errors ? <any>error.errors[0].message : <any>error.message;
          alert(`Error: ${this.errorMessage}`);
        });
  }
}
