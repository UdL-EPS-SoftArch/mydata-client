import { Component, OnInit } from '@angular/core';
import { DatasetService } from '../dataset.service';
import { Dataset } from '../dataset';

@Component({
  selector: 'app-datasets-list',
  templateUrl: './datasets-list.component.html',
  styleUrls: ['./datasets-list.component.css']
})
export class DatasetsListComponent implements OnInit {
  public datasets: Dataset[] = [];
  public errorMessage: string;

  constructor(private datasetService: DatasetService) { }

  ngOnInit() {
    this.datasetService.getAllDatasets().subscribe(
      datasets => { this.datasets = datasets; },
      error => this.errorMessage = <any>error.message
    );
  }
}