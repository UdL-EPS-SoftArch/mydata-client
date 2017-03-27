import { Component, OnInit } from '@angular/core';
import { OpenLicenseService } from '../open-license.service';
import { OpenLicense } from '../open-license';

@Component({
  selector: 'app-open-license-list',
  templateUrl: './open-license-list.component.html',
  styleUrls: ['./open-license-list.component.css']
})
export class OpenLicenseListComponent implements OnInit {
  public openLicenses: OpenLicense[] = [];
  public errorMessage: string;

  constructor(private openLicenseService: OpenLicenseService) { }

  onSearch(openLicense) {
    this.openLicenses = openLicense;
  }

  ngOnInit() {
    this.openLicenseService.getAllOpenLicenses().subscribe(
      openLicense => { this.openLicenses = openLicense; },
      error => this.errorMessage = <any>error.message
    );
  }
}
