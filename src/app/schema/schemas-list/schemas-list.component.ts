import {Component, OnInit} from '@angular/core';
import {SchemaService} from '../schema.service';
import {Schema} from '../schema';

@Component({
  selector: 'app-schemas-list',
  templateUrl: './schemas-list.component.html',
  styleUrls: ['./schemas-list.component.css']
})
export class SchemasListComponent implements OnInit {
  public schemas: Schema[] = [];
  public errorMessage: string;

  constructor(private schemaService: SchemaService) {
  }

  onSearch(schemas) {
    this.schemas = schemas;
  }

  onDelete(schema) {
    this.schemaService.deleteSchema(schema).subscribe();
    location.reload();
  }

  ngOnInit() {
    this.schemaService.getAllSchemas().subscribe(
      schemas => {
        this.schemas = schemas;
      },
      error => this.errorMessage = <any>error.message
    );
  }
}
