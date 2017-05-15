import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OpenLicenseService } from '../open-license.service';
import { OpenLicense } from '../open-license';
import { OpenLicenseOwnerService } from '../../../user/open-license-owner.service';
import { AuthenticationBasicService } from '../../../login-basic/authentication-basic.service';

@Component({
  selector: 'app-open-license-details',
  templateUrl: './open-license-details.component.html',
  styleUrls: ['./open-license-details.component.css']
})
export class OpenLicenseDetailsComponent implements OnInit {
  public openLicense: OpenLicense = new OpenLicense();
  public errorMessage: string;
  public isOwner: boolean;

  constructor(private route: ActivatedRoute,
              private openLicenseService: OpenLicenseService,
              private authenticationService: AuthenticationBasicService,
              private openLicenseOwnerService: OpenLicenseOwnerService) { }

  ngOnInit() {
    this.route.params
      .map(params => params['id'])
      .subscribe((id) => {
        const uri = `/openLicenses/${id}`;
        this.openLicenseService.getOpenLicense(uri).subscribe(
          openLicense => { this.openLicense = openLicense;
          if (this.openLicense._links != null) {
              this.openLicenseOwnerService.getOpenLicenseOwner(this.openLicense._links.owner.href).subscribe(
                owner => {
                  this.isOwner = this.authenticationService.getCurrentUser().username === owner.getUserName();
              });
            }
          },
          error => this.errorMessage = <any>error.message
        );
      });
  }
}
