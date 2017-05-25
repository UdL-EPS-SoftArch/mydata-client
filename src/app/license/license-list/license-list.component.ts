import { Component, OnInit } from '@angular/core';
import { OpenLicenseService } from '../open-license/open-license.service';
import { ClosedLicenseService } from '../closed-license/closed-license.service';
import { OpenLicense } from '../open-license/open-license';
import { ClosedLicense } from '../closed-license/closed-license';
import { OwnerService } from '../../user/owner.service';

/**
 * Created by ElTrioMaquinero on 5/25/17.
 */

@Component({
  selector: 'app-license-list',
  templateUrl: './license-list.component.html'
})
export class LicenseListComponent implements OnInit {
  public openLicenses: OpenLicense[] = [];
  public closedLicenses: ClosedLicense[] = [];
  public errorMessage: string;
  public licenseOwners: {} = {};

  constructor(private openLicenseService: OpenLicenseService,
              private closedLicenseService: ClosedLicenseService,
              private ownerService: OwnerService) { }

  onSearch(openLicense) {
    this.openLicenses = openLicense;
  }

  ngOnInit() {
    this.openLicenseService.getAllOpenLicenses().subscribe(
      openLicense => { this.openLicenses = openLicense;
        openLicense.forEach( openLicenses => {
          this.ownerService.getOwner(openLicenses._links.owner.href).subscribe(
            owner => {
              this.licenseOwners[openLicenses.uri] = owner.getUserName();
            });
        });
      },
      error => this.errorMessage = <any>error.message
    );
  }
}
