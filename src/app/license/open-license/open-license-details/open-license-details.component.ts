import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OpenLicenseService } from '../open-license.service';
import { OpenLicense } from '../open-license';

@Component({
  selector: 'app-open-license-details',
  templateUrl: './open-license-details.component.html',
  styleUrls: ['./open-license-details.component.css']
})
export class OpenLicenseDetailsComponent implements OnInit {
  public openLicense: OpenLicense = new OpenLicense();
  public errorMessage: string;

  constructor(private route: ActivatedRoute,
              private openLicenseService: OpenLicenseService) { }

  ngOnInit() {
    this.route.params
      .map(params => params['id'])
      .subscribe((id) => {
        const uri = `/openLicenses/${id}`;
        this.openLicenseService.getOpenLicense(uri).subscribe(
          openLicense => { this.openLicense = openLicense; },
          error => this.errorMessage = <any>error.message
        );
      });
  }
}
