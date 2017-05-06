import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatasetService } from '../dataset.service';
import { Dataset } from '../dataset';
import { AuthenticationBasicService } from '../../login-basic/authentication-basic.service';
import { DatasetOwnerService } from '../../user/dataset-owner.service';

@Component({
  selector: 'app-dataset-details',
  templateUrl: './dataset-details.component.html',
  styleUrls: ['./dataset-details.component.css']
})
export class DatasetDetailsComponent implements OnInit {
  public dataset: Dataset = new Dataset();
  public errorMessage: string;
  public isOwner: boolean;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private datasetService: DatasetService,
              private authenticationService: AuthenticationBasicService,
              private datasetOwnerService: DatasetOwnerService) { }

  ngOnInit() {
    this.route.params
      .map(params => params['id'])
      .subscribe((id) => {
        const uri = `/datasets/${id}`;
        this.datasetService.getDataset(uri).subscribe(
          dataset => {
            this.dataset = dataset;
            if (this.dataset._links != null) {
              this.datasetOwnerService.getDatasetOwner(this.dataset._links.owner.href).subscribe(
                owner => {
                  this.isOwner = this.authenticationService.getCurrentUser().username === owner.getUserName();
              });
            }
          },
          error => this.errorMessage = <any>error.message,
        );
      });
  }

  onDelete(dataset) {
    this.datasetService.deleteDataset(dataset).subscribe(
      response => { this.router.navigate(['/datasets']); },
      error => this.errorMessage = <any>error.message,
    );
  }
}
