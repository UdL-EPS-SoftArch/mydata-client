import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LicenseService } from '../license.service';
import { License } from '../license';

@Component({
  selector: 'app-license-details',
  templateUrl: './license-details.component.html',
  styleUrls: ['./license-details.component.css']
})
export class LicenseDetailsComponent implements OnInit {
  public license: License = new License();
  public errorMessage: string;

  constructor(private route: ActivatedRoute,
              private licenseService: LicenseService) { }

  ngOnInit() {
    this.route.params
      .map(params => params['id'])
      .subscribe((id) => {
        const uri = `/licenses/${id}`;
        this.licenseService.getLicense(uri).subscribe(
          license => { this.license = license; },
          error => this.errorMessage = <any>error.message
        );
      });
  }
}
