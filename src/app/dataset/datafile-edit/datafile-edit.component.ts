import { Component, OnInit } from '@angular/core';
import { DataFile } from '../datafile/datafile';
import { ActivatedRoute } from '@angular/router';
import { DataFileService } from '../datafile/datafile.service';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-datafile-edit',
  templateUrl: './datafile-edit.component.html',
  styleUrls: ['./datafile-edit.component.css']
})
export class DataFileEditComponent implements OnInit {
  public datafile: DataFile = new DataFile();
  public errorMessage: string;
  public dataFileForm: FormGroup;
  public titleCtrl: AbstractControl;
  public fileAttached = false;
  public filename: string;
  public content: string;

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private dataFileService: DataFileService,
              private router: Router) {
    this.dataFileForm = fb.group({
      'title': ['DataFile title', Validators.required],
      'description': ['DataFile description']
    });
    this.titleCtrl = this.dataFileForm.controls['title'];
  }

  ngOnInit() {
    this.route.params
      .map(params => params['id'])
      .subscribe((id) => {
        const uri = `/dataFiles/${id}`;
        this.dataFileService.getDataFile(uri).subscribe(
          datafile => this.datafile = datafile,
          error => this.errorMessage = <any>error.message,
        );
      });
  }

  onSubmit(): void {
    if (this.fileAttached) {
      this.datafile.filename = this.filename;
      this.datafile.content = this.content;
    }

    this.dataFileService.updateDataFile(this.datafile)
      .subscribe(
        datafile => { this.router.navigate([datafile.uri]); },
        error => {
          this.errorMessage = error.errors ? <any>error.errors[0].message : <any>error.message;
        });
  }

  addDataFile(event): void {
    const fileList: FileList = event.target.files;
    const file: File = fileList[0];
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onloadend = (e) => {
      this.fileAttached = true;
      this.content = reader.result;
      this.filename = file.name;
    };
  }
}
