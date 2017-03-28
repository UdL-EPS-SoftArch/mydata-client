import {Component, OnInit} from '@angular/core';
import {SchemaService} from '../schema.service';
import {Schema} from '../schema';

@Component({
  selector: 'app-schemas-search',
  templateUrl: 'schemas-search.component.html',
  styleUrls: ['schemas-search.component.css']
})
export class SchemaSearchComponent implements OnInit {
  public schemas: Schema[] = [];
  public errorMessage: string;

  constructor(private schemaService: SchemaService) {
  }

  ngOnInit() {
    this.schemaService.getAllSchemas().subscribe(
      schemas => {
        this.schemas = schemas;
      },
      error => this.errorMessage = <any>error.message
    );
  }

  onSearch(schemas) {
    this.schemas = schemas;
  }

  performSearch(searchTerm: string): void {
    console.log(`User entered: ${searchTerm}`);
    this.schemaService.getSchemaByDescriptionWords(searchTerm).subscribe(
      schemas => {
        this.schemas = schemas;
      },
      error => this.errorMessage = <any>error.message
    );
  }

}
