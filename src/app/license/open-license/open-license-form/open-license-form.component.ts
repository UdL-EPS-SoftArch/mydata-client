import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { License } from '../license';
import { LicenseService } from '../license.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-license-form',
  templateUrl: './license-form.component.html',
  styleUrls: ['./license-form.component.css']
})
export class LicenseFormComponent implements OnInit {
  public license: License;
  public licenseForm: FormGroup;
  public titleCtrl: AbstractControl;
  public errorMessage: string;

  constructor(private fb: FormBuilder,
              private router: Router,
              private licenseService: LicenseService) {
    this.licenseForm = fb.group({
      'text': ['License text', Validators.required],
      'price': ['License price']
    });
    this.titleCtrl = this.licenseForm.controls['text'];
    this.license = new License();
  }

  ngOnInit() {}

  onSubmit(): void {
    this.licenseService.addLicense(this.license)
      .subscribe(
        license => { this.router.navigate(['licenses/' + license._links.self.href.split('/').pop()]); },
        error => {
          this.errorMessage = error.errors ? <any>error.errors[0].message : <any>error.message;
          alert(`Error: ${this.errorMessage}`);
        });
  }
}
