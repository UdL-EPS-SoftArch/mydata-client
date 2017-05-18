import { Component, OnInit } from '@angular/core';
import { ClosedLicenseService } from '../closed-license.service';
import { ClosedLicense } from '../closed-license';
import {LicenseOwnerService} from '../../../user/license-owner.service';

@Component({
  selector: 'app-closed-license-list',
  templateUrl: './closed-license-list.component.html',
  styleUrls: ['./closed-license-list.component.css']
})
export class ClosedLicenseListComponent implements OnInit {
  public closedLicenses: ClosedLicense[] = [];
  public errorMessage: string;
  public licenseOwners: {} = {};

  constructor(private closedLicenseService: ClosedLicenseService,
  private licenseOwner: LicenseOwnerService) { }

  onSearch(closedLicenses) {
    this.closedLicenses = closedLicenses;
  }

  ngOnInit() {
    this.closedLicenseService.getAllClosedLicenses().subscribe(
      closedLicenses => { this.closedLicenses = closedLicenses;
        closedLicenses.forEach(closedLicense =>{
        this.licenseOwner.getLicenseOwner(closedLicense._links.owner.href).subscribe(
          owner =>{
            this.licenseOwner[closedLicense.uri] = owner.getUserName();
          });
        });
      },
      error => this.errorMessage = <any>error.message
    );
  }
}
