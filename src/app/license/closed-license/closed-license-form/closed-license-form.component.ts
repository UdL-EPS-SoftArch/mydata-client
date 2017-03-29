import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ClosedLicense } from '../closed-license';
import { ClosedLicenseService } from '../closed-license.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-open-license-form',
  templateUrl: './open-license-form.component.html',
  styleUrls: ['./open-license-form.component.css']
})
export class ClosedLicenseFormComponent implements OnInit {
  public openLicense: ClosedLicense;
  public openLicenseForm: FormGroup;
  public textCtrl: AbstractControl;
  public errorMessage: string;

  constructor(private fb: FormBuilder,
              private router: Router,
              private licenseService: ClosedLicenseService) {
    this.closedLicenseForm = fb.group({
      'text': ['License text', Validators.required]
      'price': ['License price']
    });
    this.textCtrl = this.openLicenseForm.controls['text'];
    this.closedLicense = new ClosedLicense();
  }

  ngOnInit() {}

  onSubmit(): void {
    this.licenseService.addClosedLicense(this.closedLicense)
      .subscribe(
        closedLicense => { this.router.navigate([closedLicense.uri]); },
        error => {
          this.errorMessage = error.errors ? <any>error.errors[0].message : <any>error.message;
        });
  }
}
