import { Component, OnInit } from '@angular/core';
import { OpenLicenseService } from '../open-license.service';
import { Dataset } from '../../../dataset/dataset';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-datasets-list',
    templateUrl: '../../../dataset/datasets-list/datasets-list.component.html',
    styleUrls: ['../../../dataset/datasets-list/datasets-list.component.css']
})
export class OpenLicenseDatasetListComponent implements OnInit {
    public datasets: Dataset[] = [];
    public errorMessage: string;

    constructor(private closedLicenseService: OpenLicenseService,
        private route: ActivatedRoute) { }

    onSearch(datasets) {
        this.datasets = datasets;
    }

    ngOnInit() {
        this.route.params
            .map(params => params['id'])
            .subscribe((id) => {
                const uri = `/openLicenses/${id}`;
                this.closedLicenseService.getDatasetsOfOpenLicense(uri).subscribe(
                    datasets => { this.datasets = datasets; },
                    error => this.errorMessage = <any>error.message
                );
            });
    }
}
