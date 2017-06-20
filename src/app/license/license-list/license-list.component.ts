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
  public itemsPerPage = 20;

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
    this.getOpenLicenses (0, this.itemsPerPage);
    this.getClosedLicenses (0, this.itemsPerPage);
  }

  public getOpenLicenses (page: number, size: number) {
    this.openLicenseService.getAllOpenLicensesOrderedByTitlePaginated(page, size).subscribe(
      pageWrapper => {
        this.licenses = [];
        this.openLicenses = pageWrapper.elements;
        this.bigTotalItems = pageWrapper.pageInfo.totalElements;
        this.itemsPerPage = pageWrapper.pageInfo.size;
        this.openLicenses.forEach(openLicenses => {
            this.ownerService.getOwner(openLicenses._links.owner.href).subscribe(
              owner => {
                this.licenseOwners[openLicenses.uri] = owner.getUserName();
              });
          }
        );
      },
      error => this.errorMessage = <any>error.message
    );
  }

  public getClosedLicenses (page: number, size: number) {
    this.closedLicenseService.getAllClosedLicensesOrderedByTitlePaginated(page, size).subscribe(
      pageWrapper => {
        this.closedLicenses = pageWrapper.elements;
        if (pageWrapper.pageInfo.totalElements > this.bigTotalItems) {
          this.bigTotalItems = pageWrapper.pageInfo.totalElements;
        }
        if (pageWrapper.pageInfo.size > this.itemsPerPage) {
          this.itemsPerPage = pageWrapper.pageInfo.size;
        }
        this.closedLicenses.forEach(closedLicenses => {
            this.ownerService.getOwner(closedLicenses._links.owner.href).subscribe(
              owner => {
                this.licenseOwners[closedLicenses.uri] = owner.getUserName();
              });
          }
        );
      },
      error => this.errorMessage = <any>error.message
    );
  }

  onChange(sizeValue) {
    this.itemsPerPage = sizeValue;
    this.getOpenLicenses(0, sizeValue);
    this.getClosedLicenses(0, sizeValue);
    this.setPage(this.currentPage);
  }

  public setPage(pageNo: number): void {
    this.currentPage = pageNo;
  }

  public pageChanged(event: any): void {
    this.setPage(event.page - 1);
    this.getOpenLicenses(event.page - 1, this.itemsPerPage);
    this.getClosedLicenses(event.page - 1, this.itemsPerPage);
    console.log('Page changed to: ' + event.page);
    console.log('Number items per page: ' + event.itemsPerPage);
  }
}
