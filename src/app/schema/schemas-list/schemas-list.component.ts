import {Component, OnInit} from '@angular/core';
import {SchemaService} from '../schema.service';
import {Schema} from '../schema';
import {OwnerService} from '../../user/owner.service';

@Component({
  selector: 'app-schemas-list',
  templateUrl: './schemas-list.component.html',
  styleUrls: ['./schemas-list.component.css']
})
export class SchemasListComponent implements OnInit {
  public schemas: Schema[] = [];
  public schemaOwners: {} = {};
  public errorMessage: string;

  constructor(private schemaService: SchemaService,
  private ownerService: OwnerService) {
 }

  onSearch(schemas) {
    this.schemas = schemas;
  }

  ngOnInit() {
    this.schemaService.getAllSchemas().subscribe(
      schemas => { this.schemas = schemas;
        schemas.forEach(schema => {
          this.ownerService.getOwner(schema._links.owner.href).subscribe(
            owner => {
              this.schemaOwners[schema.uri] = owner.getUserName();
            });
        });
      },
      error => this.errorMessage = <any>error.message
    );
  }
}
