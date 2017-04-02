import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SchemaService } from '../schema.service';
import { Schema } from '../schema';

@Component({
  selector: 'app-schema-details',
  templateUrl: './schema-details.component.html',
  styleUrls: ['./schema-details.component.css']
})
export class SchemaDetailsComponent implements OnInit {
  public schema: Schema = new Schema();
  public errorMessage: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private schemaService: SchemaService) { }

  ngOnInit() {
    this.route.params
      .map(params => params['id'])
      .subscribe((id) => {
        const uri = `/schemas/${id}`;
        this.schemaService.getSchema(uri).subscribe(
          schema => { this.schema = schema; },
          error => this.errorMessage = <any>error.message
        );
      });
  }

  onDelete(schema) {
    this.schemaService.deleteSchema(schema).subscribe(
      response => { this.router.navigate(['/schemas']); },
      error => this.errorMessage = <any>error.message,
    );
  }
}
