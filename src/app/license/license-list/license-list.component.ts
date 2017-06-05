import {Component, OnInit} from '@angular/core';
import {OpenLicenseService} from '../open-license/open-license.service';
import {ClosedLicenseService} from '../closed-license/closed-license.service';
import {OpenLicense} from '../open-license/open-license';
import {ClosedLicense} from '../closed-license/closed-license';
import {OwnerService} from '../../user/owner.service';

/**
 * Created by ElTrioMaquinero on 5/25/17.
 */

@Component({
  selector: 'app-license-list',
  templateUrl: './license-list.component.html'
})
export class LicenseListComponent implements OnInit {
  public licenses: any[] = [];
  public openLicenses: OpenLicense[] = [];
  public closedLicenses: ClosedLicense[] = [];
  public errorMessage: string;
  public licenseOwners: {} = {};
  public currentPage = 1;
  public maxSize = 5;
  public bigTotalItems: number;
  public itemsPerPage = 2;

  constructor(private openLicenseService: OpenLicenseService,
              private closedLicenseService: ClosedLicenseService,
              private ownerService: OwnerService) {
  }

  onSearch(openLicense) {
    this.licenses = openLicense;
  }

  checkType(type) {
    return type instanceof OpenLicense;
  }

  ngOnInit() {
    this.openLicenseService.getAllOpenLicensesOrderedByTitlePaginated(0, this.itemsPerPage).subscribe(
      pageWrapper => {
        this.openLicenses = pageWrapper.elements;
        this.bigTotalItems = pageWrapper.pageInfo.totalElements;
        this.itemsPerPage = pageWrapper.pageInfo.size;
        this.openLicenses.forEach(openLicenses => {
            this.ownerService.getOwner(openLicenses._links.owner.href).subscribe(
              owner => {
                this.licenseOwners[openLicenses.uri] = owner.getUserName();
              });
            this.licenses.push(openLicenses);
          }
        );
      },
      error => this.errorMessage = <any>error.message
    );

    this.closedLicenseService.getAllClosedLicensesOrderedByTitlePaginated(0, this.itemsPerPage).subscribe(
      pageWrapper => {
        this.closedLicenses = pageWrapper.elements;
        this.bigTotalItems = pageWrapper.pageInfo.totalElements;
        this.itemsPerPage = pageWrapper.pageInfo.size;
        this.closedLicenses.forEach(closedLicenses => {
            this.ownerService.getOwner(closedLicenses._links.owner.href).subscribe(
              owner => {
                this.licenseOwners[closedLicenses.uri] = owner.getUserName();
              });
            this.licenses.push(closedLicenses);
          }
        );
      },
      error => this.errorMessage = <any>error.message
    );
  }
}
