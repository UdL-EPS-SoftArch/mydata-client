import { Component, OnInit } from '@angular/core';
import { SchemaService } from '../schema.service';
import { Field } from '../../field/field';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-field-list',
  templateUrl: '../../field/fields-list/fields-list.component.html',
  styleUrls: ['../../field/fields-list/fields-list.component.css']
})
export class SchemasFieldListComponent implements OnInit {
  public fields: Field[] = [];
  public errorMessage: string;

  constructor(private schemaService: SchemaService,
              private route: ActivatedRoute) { }

  onSearch(fields) {
    this.fields = fields;
  }

  ngOnInit() {
    this.route.params
      .map(params => params['id'])
      .subscribe((id) => {
        const uri = `/schemas/${id}`;
        this.schemaService.getFieldsOfSchema(uri).subscribe(
          fields => { this.fields = fields; },
          error => this.errorMessage = <any>error.message
        );
      });
  }
}
