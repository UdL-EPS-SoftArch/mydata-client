import {Component, Input} from "@angular/core";
import {DatasetService} from "../dataset.service";
import {Dataset} from "../dataset";


@Component({
  selector: 'app-dataset-search',
  templateUrl: './dataset-search.component.html',
  styleUrls: ['./dataset-search.component.css']
})

export class DatasetsSearchComponent{
  @Input()
  datasets: Dataset[];

  public errorMessage: string;
  constructor(private datasetService: DatasetService) {
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

