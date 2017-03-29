import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClosedLicenseService } from '../closed-license.service';
import { ClosedLicense } from '../closed-license';

@Component({
  selector: 'app-closed-license-details',
  templateUrl: './closed-license-details.component.html',
  styleUrls: ['./closed-license-details.component.css']
})
export class ClosedLicenseDetailsComponent implements OnInit {
  public closedLicense: ClosedLicense = new ClosedLicense();
  public errorMessage: string;

  constructor(private route: ActivatedRoute,
              private closedLicenseService: ClosedLicenseService) { }

  ngOnInit() {
    this.route.params
      .map(params => params['id'])
      .subscribe((id) => {
        const uri = `/openLicenses/${id}`;
        this.closedLicenseService.getClosedLicense(uri).subscribe(
          closedLicense => { this.closedLicense = closedLicense; },
          error => this.errorMessage = <any>error.message
        );
      });
  }
}