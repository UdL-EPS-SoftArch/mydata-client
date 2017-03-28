import {Component, OnInit} from '@angular/core';
import {DatasetService} from '../dataset.service';
import {Dataset} from '../dataset';

@Component({
  selector: 'app-datasets-search',
  templateUrl: './datasets-search.component.html',
  styleUrls: ['./datasets-search.component.css']
})
export class DatasetsSearchComponent implements OnInit {
  public datasets: Dataset[] = [];
  public errorMessage: string;

  constructor(private datasetService: DatasetService) {
  }

  ngOnInit() {
    this.datasetService.getAllDatasets().subscribe(
      datasets => {
        this.datasets = datasets;
      },
      error => this.errorMessage = <any>error.message
    );
  }

  performSearch(searchTerm: string): void {
    console.log(`User entered: ${searchTerm}`);
    this.datasetService.getDatasetByDescriptionWords(searchTerm).subscribe(
      datasets => {
        this.datasets = datasets;
      },
      error => this.errorMessage = <any>error.message
    );
  }

}
