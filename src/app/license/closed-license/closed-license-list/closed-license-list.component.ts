import { Component, OnInit } from '@angular/core';
import { ClosedLicenseService } from '../closed-license.service';
import { ClosedLicense } from '../closed-license';

@Component({
  selector: 'app-closed-license-list',
  templateUrl: './closed-license-list.component.html',
  styleUrls: ['./closed-license-list.component.css']
})
export class ClosedLicenseListComponent implements OnInit {
  public closedLicenses: ClosedLicense[] = [];
  public errorMessage: string;

  constructor(private openLicenseService: ClosedLicenseService) { }

  onSearch(closedLicenses) {
    this.closedLicenses = closedLicenses;
  }

  ngOnInit() {
    this.closedLicenseService.getAllClosedLicenses().subscribe(
      closedLicenses => { this.closedLicenses = closedLicenses; },
      error => this.errorMessage = <any>error.message
    );
  }
}
