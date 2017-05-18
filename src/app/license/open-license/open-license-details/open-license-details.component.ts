import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OpenLicenseService } from '../open-license.service';
import { OpenLicense } from '../open-license';
import {LicenseOwnerService} from '../../../user/license-owner.service';
import { AuthenticationBasicService } from '../../../login-basic/authentication-basic.service';

@Component({
  selector: 'app-open-license-details',
  templateUrl: './open-license-details.component.html',
  styleUrls: ['./open-license-details.component.css']
})
export class OpenLicenseDetailsComponent implements OnInit {
  public openLicense: OpenLicense = new OpenLicense();
  public errorMessage: string;
  public ownerName: string;
  public isOwner: boolean;

  constructor(private route: ActivatedRoute,
              private openLicenseService: OpenLicenseService,
              private licenseOwner: LicenseOwnerService,
              private authenticationService: AuthenticationBasicService) { }

  ngOnInit() {
    this.route.params
      .map(params => params['id'])
      .subscribe((id) => {
        const uri = `/openLicenses/${id}`;
        this.openLicenseService.getOpenLicense(uri).subscribe(
          openLicense => { this.openLicense = openLicense;
          this.licenseOwner.getLicenseOwner(this.openLicense._links.owner.href).subscribe(
            owner => {
              this.ownerName = owner.getUserName();
              this.isOwner = this.authenticationService.getCurrentUser().username === owner.getUserName();
            });
          },
          error => this.errorMessage = <any>error.message
        );
      });
  }
}
