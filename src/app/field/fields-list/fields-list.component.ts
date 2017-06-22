import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FieldService} from '../field.service';
import {Field} from '../field';
import {Schema} from '../../schema/schema';

@Component({
  selector: 'app-fields-list',
  templateUrl: './fields-list.component.html',
  styleUrls: ['./fields-list.component.css']
})
export class FieldListComponent implements OnInit {
  @Input()
  schema: Schema;

  public fields: Field[] = [];
  public errorMessage: string;

  constructor(private fieldService: FieldService) { }

  onSearch(fields) {
    this.fields = fields;
  }

  ngOnInit() {
    this.fieldService.getAllFieldsOrderedByTitle().subscribe(
      fields => { this.fields = fields; },
      error => this.errorMessage = <any>error.message
    );
  }
}
