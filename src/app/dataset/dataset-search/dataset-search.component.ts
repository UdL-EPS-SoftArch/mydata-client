import {Component, Input, EventEmitter, Output} from "@angular/core";
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
  @Output()
  onSearchited:EventEmitter<any> = new EventEmitter();

  public errorMessage: string;
  constructor(private datasetService: DatasetService) {
  }

  performSearch(searchTerm: string): void {
    this.datasetService.getDatasetByDescriptionWords(searchTerm).subscribe(
      datasets => {
        //Envia cap al output emiter
        this.onSearchited.emit(datasets);
      },
      error => this.errorMessage = <any>error.message
    );
  }
}

